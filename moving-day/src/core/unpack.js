'use strict';
// Unpack: moving box → new PC.
// Golden rule: nothing that already exists on this PC is ever overwritten or deleted.

const fs = require('fs');
const fsp = fs.promises;
const os = require('os');
const path = require('path');
const box = require('./box');
const { copyWithHash, hashFile, conflictName, safeJoin, safeSegment, exists, isSoftError, reasonFor, abortError } = require('./fsutil');

const KNOWN_LABELS = {
  desktop: 'Desktop',
  documents: 'Documents',
  pictures: 'Pictures',
  music: 'Music',
  videos: 'Videos',
  downloads: 'Downloads',
  savedgames: 'Saved Games',
};

/** Where each folder key should land on this PC. */
async function resolveTargets(manifest, platform, overrides = {}) {
  const known = (await platform.knownFolders()) || {};
  const home = (platform.homeDir && platform.homeDir()) || os.homedir();
  const documents = known.documents || path.join(home, 'Documents');
  const targets = {};
  for (const [key, info] of Object.entries(manifest.folders || {})) {
    if (overrides[key]) {
      targets[key] = overrides[key];
    } else if (known[key]) {
      targets[key] = known[key];
    } else if (KNOWN_LABELS[key]) {
      targets[key] = path.join(home, KNOWN_LABELS[key]);
    } else {
      // custom folder: same place if that location exists here, otherwise under Documents
      const src = info.source || '';
      const name = safeSegment(src.split(/[\\/]/).filter(Boolean).pop() || info.label || key, key);
      const parent = src ? path.dirname(src) : '';
      const winStyle = /^[a-zA-Z]:[\\/]/.test(src) || src.startsWith('\\\\');
      const sameOS = Boolean(src) && path.isAbsolute(src) && winStyle === (process.platform === 'win32');
      targets[key] = sameOS && parent && (await exists(parent)) ? src : path.join(documents, name);
    }
  }
  return targets;
}

/**
 * Restore one file without ever overwriting.
 * → { status: 'restored' | 'already' | 'renamed', to }
 */
async function placeFile(src, target, entry, label, signal) {
  for (let n = 0; n <= 1000; n++) {
    const candidate = n === 0 ? target : conflictName(target, label, n);
    let st = null;
    try {
      st = await fsp.lstat(candidate);
    } catch {
      st = null;
    }
    if (!st) {
      try {
        await copyWithHash(src, candidate, { expectedHash: entry.h, mtimeMs: entry.m, signal });
        return { status: n === 0 ? 'restored' : 'renamed', to: candidate };
      } catch (err) {
        if (err.code === 'EEXIST') continue; // appeared meanwhile — try the next name
        throw err;
      }
    }
    if (st.isFile() && st.size === entry.s && (await hashFile(candidate, signal)) === entry.h) {
      return { status: 'already', to: candidate };
    }
  }
  const e = new Error('Too many copies with the same name');
  e.code = 'TOO_MANY';
  throw e;
}

/**
 * unpack({ box, folders, targets, include, platform, onProgress, signal })
 */
async function unpack(opts) {
  const { platform, signal } = opts;
  const boxPath = opts.box;
  const include = opts.include || {};
  const onProgress = opts.onProgress || (() => {});
  const manifest = await box.readBox(boxPath);
  const label = safeSegment(manifest.computerName, 'old PC');
  const wanted = opts.folders === 'all' || opts.folders == null ? null : new Set(opts.folders);
  const targets = await resolveTargets(manifest, platform, opts.targets || {});

  const result = {
    restored: 0,
    alreadyThere: 0,
    renamed: [],
    failed: [],
    bytes: 0,
    apps: { installed: [], failed: [] },
    wifi: { added: 0, failed: 0 },
    bookmarksDir: null,
    wallpaper: null,
    targets,
  };
  const progress = { phase: 'files', filesDone: 0, filesTotal: 0, bytesDone: 0, bytesTotal: 0, current: '', message: 'Unpacking your files…' };
  const emit = (extra) => onProgress({ ...progress, ...extra });

  // ---- Files -------------------------------------------------------------------------------
  if (include.files !== false) {
    const journal = await box.readJournal(boxPath);
    const todo = [];
    for (const e of journal.values()) {
      if (wanted && !wanted.has(e.k)) continue;
      if (!targets[e.k]) continue;
      todo.push(e);
    }
    progress.filesTotal = todo.length;
    progress.bytesTotal = todo.reduce((a, e) => a + (e.s || 0), 0);
    emit();

    // Space check: only files that are not already present need room.
    if (platform.freeSpace) {
      let needed = 0;
      for (const e of todo) {
        const t = safeJoin(targets[e.k], e.p);
        if (t && !(await exists(t))) needed += e.s || 0;
      }
      const probe = await nearestExisting(targets.documents || Object.values(targets)[0] || os.homedir());
      const free = await platform.freeSpace(probe);
      if (Number.isFinite(free) && free < needed + 64 * 1024 * 1024) {
        const err = new Error('Not enough free space on this PC for everything in the box. Free up some space or unpack fewer folders.');
        err.code = 'ENOSPC_PRECHECK';
        err.needed = needed;
        err.free = free;
        throw err;
      }
    }

    for (const e of todo) {
      if (signal && signal.aborted) throw abortError();
      const target = safeJoin(targets[e.k], e.p);
      progress.current = e.p;
      emit();
      if (!target) {
        result.failed.push({ path: e.p, reason: 'unsafe path in box' });
        progress.filesDone++;
        progress.bytesDone += e.s || 0;
        continue;
      }
      try {
        const r = await placeFile(box.boxFilePath(boxPath, e.k, e.p), target, e, label, signal);
        if (r.status === 'restored') result.restored++;
        else if (r.status === 'already') result.alreadyThere++;
        else result.renamed.push({ from: target, to: r.to });
        if (r.status !== 'already') result.bytes += e.s || 0;
      } catch (err) {
        if (err.name === 'AbortError' || err.code === 'ABORT_ERR') throw abortError();
        if (!isSoftError(err) && err.code !== 'HASH_MISMATCH' && err.code !== 'TOO_MANY') throw err;
        result.failed.push({ path: target, reason: reasonFor(err) });
      }
      progress.filesDone++;
      progress.bytesDone += e.s || 0;
    }
  }

  // ---- Wi-Fi -------------------------------------------------------------------------------
  if (include.wifi) {
    emit({ phase: 'wifi', message: 'Adding Wi-Fi networks…', current: '' });
    const dir = path.join(boxPath, 'wifi');
    let files = [];
    try {
      files = (await fsp.readdir(dir)).filter((f) => f.toLowerCase().endsWith('.xml'));
    } catch {
      files = [];
    }
    for (const f of files) {
      if (signal && signal.aborted) throw abortError();
      try {
        const r = await platform.importWifi(path.join(dir, f));
        if (r && r.ok) result.wifi.added++;
        else result.wifi.failed++;
      } catch {
        result.wifi.failed++;
      }
    }
  }

  // ---- Bookmarks: copy the ready-to-import HTML files somewhere easy to find ------------------
  if (include.bookmarks) {
    const src = path.join(boxPath, 'bookmarks');
    let files = [];
    try {
      files = (await fsp.readdir(src)).filter((f) => f.toLowerCase().endsWith('.html'));
    } catch {
      files = [];
    }
    if (files.length) {
      const docs = targets.documents || (await platform.knownFolders()).documents || path.join(os.homedir(), 'Documents');
      const outDir = path.join(docs, `Bookmarks from ${label}`);
      for (const f of files) {
        try {
          const h = await hashFile(path.join(src, f));
          const st = await fsp.stat(path.join(src, f));
          await placeFile(path.join(src, f), path.join(outDir, f), { h, s: st.size, m: st.mtimeMs }, label, signal);
        } catch {
          /* keep going */
        }
      }
      result.bookmarksDir = outDir;
    }
  }

  // ---- Wallpaper ---------------------------------------------------------------------------
  if (include.wallpaper && manifest.wallpaper) {
    try {
      const src = path.join(boxPath, ...manifest.wallpaper.split('/'));
      const pics = targets.pictures || (await platform.knownFolders()).pictures || path.join(os.homedir(), 'Pictures');
      const st = await fsp.stat(src);
      const h = await hashFile(src);
      const placed = await placeFile(src, path.join(pics, `Wallpaper from ${label}${path.extname(src)}`), { h, s: st.size, m: st.mtimeMs }, label, signal);
      const r = await platform.setWallpaper(placed.to);
      result.wallpaper = r && r.ok ? placed.to : null;
    } catch {
      result.wallpaper = null;
    }
  }

  // ---- Apps (slowest, last) ---------------------------------------------------------------------
  const apps = Array.isArray(include.apps) ? include.apps : [];
  if (apps.length) {
    let i = 0;
    for (const pkg of apps) {
      if (signal && signal.aborted) throw abortError();
      i++;
      emit({ phase: 'apps', message: `Installing apps (${i} of ${apps.length})…`, current: pkg.id, filesDone: i - 1, filesTotal: apps.length });
      try {
        const r = await platform.installApp(pkg, () => {});
        (r && r.ok ? result.apps.installed : result.apps.failed).push(pkg.id);
      } catch {
        result.apps.failed.push(pkg.id);
      }
    }
  }

  emit({ phase: 'done', message: 'Done', current: '' });
  return result;
}

async function nearestExisting(p) {
  let cur = path.resolve(p);
  for (;;) {
    if (await exists(cur)) return cur;
    const up = path.dirname(cur);
    if (up === cur) return cur;
    cur = up;
  }
}

/** Packages the box can reinstall: [{ id, source }]. */
async function boxApps(boxPath) {
  try {
    const apps = require('./apps');
    return apps.parseWingetExport(JSON.parse(await fsp.readFile(path.join(boxPath, 'apps', 'winget.json'), 'utf8')));
  } catch {
    return [];
  }
}

module.exports = { unpack, resolveTargets, placeFile, boxApps, KNOWN_LABELS };
