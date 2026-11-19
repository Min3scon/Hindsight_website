'use strict';
// Pack: old PC → moving box.

const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const box = require('./box');
const { walk, copyWithHash, isInside, isSoftError, reasonFor, exists, abortError, safeSegment } = require('./fsutil');

const APP_VERSION = require('../../package.json').version;

/** Folders that sit inside another selected folder are excluded from the outer walk. */
function nestedExcludes(folder, folders) {
  return folders
    .filter((o) => o !== folder && o.path && isInside(o.path, folder.path) && !isInside(folder.path, o.path))
    .map((o) => o.path);
}

/** Count files and bytes per folder (used by the "choose" screen). */
async function scanFolders(folders, { exclude = [], cloudOnly = new Set(), signal } = {}) {
  const out = [];
  for (const f of folders) {
    let files = 0;
    let bytes = 0;
    const ex = [...exclude, ...nestedExcludes(f, folders)];
    for await (const file of walk(f.path, { exclude: ex, cloudOnly, signal })) {
      files++;
      bytes += file.size;
    }
    out.push({ key: f.key, label: f.label, path: f.path, files, bytes });
  }
  return out;
}

function imageExt(buf) {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return '.jpg';
  if (buf.length >= 8 && buf.slice(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return '.png';
  if (buf.length >= 2 && buf[0] === 0x42 && buf[1] === 0x4d) return '.bmp';
  if (buf.length >= 12 && buf.slice(0, 4).toString() === 'RIFF' && buf.slice(8, 12).toString() === 'WEBP') return '.webp';
  return '.jpg';
}

/**
 * pack({ dest, folders, include, platform, onProgress, signal, now })
 * Returns a summary for the "done" screen.
 */
async function pack(opts) {
  const { dest, platform, signal } = opts;
  const include = opts.include || {};
  const folders = (opts.folders || []).filter((f) => f && f.key && f.path);
  const onProgress = opts.onProgress || (() => {});
  const now = opts.now || new Date();
  if (!dest) throw new Error('Choose where to save the moving box first.');

  const computerName = platform.computerName();
  const boxPath = path.join(dest, box.boxFolderName(computerName, now));
  await fsp.mkdir(boxPath, { recursive: true });
  // A box without a manifest is "in progress"; remove any old manifest before touching files.
  await fsp.rm(path.join(boxPath, box.MANIFEST), { force: true });

  const skipped = [];
  const onSkip = (p, reason) => skipped.push({ path: p, reason });
  const progress = { phase: 'scan', filesDone: 0, filesTotal: 0, bytesDone: 0, bytesTotal: 0, current: '', message: 'Looking at your files…' };
  const emit = (extra) => onProgress({ ...progress, ...extra });
  emit();

  // ---- 1. Plan -----------------------------------------------------------------------------
  const oneDrive = (platform.oneDriveRoots && platform.oneDriveRoots()) || [];
  const plan = [];
  const folderStats = {};
  for (const f of folders) {
    if (signal && signal.aborted) throw abortError();
    let cloudOnly = new Set();
    if (platform.cloudOnlyFiles && oneDrive.some((r) => isInside(f.path, r) || isInside(r, f.path))) {
      cloudOnly = (await platform.cloudOnlyFiles(f.path)) || new Set();
    }
    const exclude = [boxPath, ...nestedExcludes(f, folders)];
    folderStats[f.key] = { label: f.label, source: f.path, files: 0, bytes: 0 };
    for await (const file of walk(f.path, { exclude, cloudOnly, onSkip, signal })) {
      plan.push({ key: f.key, ...file });
      progress.filesTotal++;
      progress.bytesTotal += file.size;
      if (progress.filesTotal % 500 === 0) emit({ current: file.rel });
    }
  }

  // ---- 2. Space check ----------------------------------------------------------------------
  const journal = await box.readJournal(boxPath);
  let needed = 0;
  for (const f of plan) {
    const j = journal.get(box.entryId(f.key, f.rel));
    if (!(j && j.s === f.size && j.m === f.mtimeMs)) needed += f.size;
  }
  const free = platform.freeSpace ? await platform.freeSpace(dest) : null;
  if (Number.isFinite(free) && free < needed + 16 * 1024 * 1024) {
    const e = new Error('Not enough free space on that drive for these folders. Pick a bigger drive or fewer folders.');
    e.code = 'ENOSPC_PRECHECK';
    e.needed = needed;
    e.free = free;
    throw e;
  }

  // ---- 3. Extras (fast) --------------------------------------------------------------------
  const result = { boxPath, files: 0, bytes: 0, skipped, apps: null, wifi: null, bookmarks: [], wallpaper: null };
  if (include.apps) {
    emit({ phase: 'extras', message: 'Listing your apps…' });
    try {
      const dir = path.join(boxPath, 'apps');
      await fsp.mkdir(dir, { recursive: true });
      const r = await platform.exportApps(dir);
      const apps = require('./apps');
      let wingetPkgs = [];
      try {
        wingetPkgs = apps.parseWingetExport(JSON.parse(await fsp.readFile(path.join(dir, 'winget.json'), 'utf8')));
      } catch {
        /* no winget export */
      }
      const installed = apps.normaliseInstalled(r.installed || []);
      await fsp.writeFile(path.join(dir, 'Apps to reinstall.txt'), apps.appsChecklistText(installed, wingetPkgs));
      result.apps = { winget: Boolean(r.winget), wingetCount: wingetPkgs.length, installedCount: installed.length };
    } catch (err) {
      skipped.push({ path: 'Apps list', reason: reasonFor(err) });
    }
  }
  if (include.wifi) {
    emit({ phase: 'extras', message: 'Saving Wi-Fi networks…' });
    try {
      const dir = path.join(boxPath, 'wifi');
      await fsp.mkdir(dir, { recursive: true });
      const r = await platform.exportWifi(dir);
      const profiles = (r && r.profiles) || [];
      result.wifi = { count: profiles.length, withKeys: profiles.filter((p) => p.hasKey).length };
    } catch (err) {
      skipped.push({ path: 'Wi-Fi networks', reason: reasonFor(err) });
    }
  }
  if (include.bookmarks) {
    emit({ phase: 'extras', message: 'Saving browser bookmarks…' });
    try {
      const bm = require('./bookmarks');
      const profiles = await bm.discoverProfiles(await platform.browserProfileRoots());
      if (profiles.length) {
        const out = path.join(boxPath, 'bookmarks');
        await fsp.mkdir(out, { recursive: true });
        result.bookmarks = await bm.exportAll(profiles, out);
      }
    } catch (err) {
      skipped.push({ path: 'Browser bookmarks', reason: reasonFor(err) });
    }
  }
  if (include.wallpaper) {
    try {
      const wp = await platform.wallpaperFile();
      if (wp) {
        const head = Buffer.alloc(16);
        const fh = await fsp.open(wp, 'r');
        try {
          await fh.read(head, 0, 16, 0);
        } finally {
          await fh.close();
        }
        const rel = `wallpaper/wallpaper${imageExt(head)}`;
        await copyWithHash(wp, path.join(boxPath, ...rel.split('/')), { overwrite: true });
        result.wallpaper = rel;
      }
    } catch (err) {
      skipped.push({ path: 'Wallpaper', reason: reasonFor(err) });
    }
  }

  // ---- 4. Copy files ---------------------------------------------------------------------
  progress.phase = 'copy';
  progress.message = 'Packing your files…';
  emit();
  const kept = [];
  const journalFile = path.join(boxPath, box.JOURNAL);
  const jh = await fsp.open(journalFile, 'a');
  try {
    for (const f of plan) {
      if (signal && signal.aborted) throw abortError();
      const target = box.boxFilePath(boxPath, f.key, f.rel);
      const prev = journal.get(box.entryId(f.key, f.rel));
      if (prev && prev.s === f.size && prev.m === f.mtimeMs) {
        let ok = false;
        try {
          ok = (await fsp.stat(target)).size === f.size;
        } catch {
          ok = false;
        }
        if (ok) {
          kept.push(prev);
          tally(f);
          continue;
        }
      }
      progress.current = f.rel;
      emit();
      let added = 0;
      try {
        const r = await copyWithHash(f.abs, target, {
          overwrite: true, // only ever inside our own box
          mtimeMs: f.mtimeMs,
          signal,
          onBytes: (n) => {
            added += n;
            progress.bytesDone += n;
          },
        });
        const entry = { k: f.key, p: f.rel, s: r.size, m: f.mtimeMs, h: r.sha256 };
        await jh.write(JSON.stringify(entry) + '\n');
        kept.push(entry);
        progress.bytesDone -= added; // tally() adds the final size
        tally(f, r.size);
      } catch (err) {
        if (err.name === 'AbortError' || err.code === 'ABORT_ERR') throw abortError();
        if (!isSoftError(err)) throw err; // ENOSPC, EIO… stop and tell the user
        skipped.push({ path: f.abs, reason: reasonFor(err) });
        progress.filesDone++;
        progress.bytesDone += f.size - added; // count it as handled
      }
    }
  } finally {
    await jh.close();
  }

  function tally(f, size = f.size) {
    progress.filesDone++;
    progress.bytesDone += size;
    folderStats[f.key].files++;
    folderStats[f.key].bytes += size;
    result.files++;
    result.bytes += size;
  }

  // ---- 5. Finish: compact journal, write manifest + readme --------------------------------
  emit({ phase: 'finish', message: 'Finishing up…', current: '' });
  await box.writeJournal(boxPath, kept);
  const manifest = {
    format: box.FORMAT,
    version: box.VERSION,
    app: APP_VERSION,
    createdAt: now.toISOString(),
    completedAt: new Date().toISOString(),
    computerName,
    userName: platform.userName(),
    folders: folderStats,
    skipped: skipped.slice(0, 5000),
    skippedCount: skipped.length,
    apps: result.apps,
    wifi: result.wifi,
    bookmarks: result.bookmarks,
    wallpaper: result.wallpaper,
  };
  await fsp.writeFile(path.join(boxPath, 'READ ME.txt'), box.readMeText(manifest));
  await box.writeManifest(boxPath, manifest);
  emit({ phase: 'done', message: 'Done', current: '' });
  return result;
}

module.exports = { pack, scanFolders, nestedExcludes, imageExt, safeSegment, exists };
