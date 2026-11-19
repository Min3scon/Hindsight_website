'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');

const fsutil = require('../src/core/fsutil');
const box = require('../src/core/box');
const { pack, scanFolders } = require('../src/core/pack');
const { unpack, resolveTargets } = require('../src/core/unpack');

function tmp(prefix = 'md-') {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}
function write(p, data, mtime) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, data);
  if (mtime) fs.utimesSync(p, mtime, mtime);
}
function sha(p) {
  return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
}
function listFiles(root) {
  const out = [];
  const rec = (d, rel) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const r = rel ? `${rel}/${e.name}` : e.name;
      if (e.isDirectory()) rec(path.join(d, e.name), r);
      else out.push(r);
    }
  };
  rec(root, '');
  return out.sort();
}

function fakePlatform(home, extra = {}) {
  const known = {};
  for (const [k, n] of Object.entries({ desktop: 'Desktop', documents: 'Documents', pictures: 'Pictures', downloads: 'Downloads' })) {
    const p = path.join(home, n);
    fs.mkdirSync(p, { recursive: true });
    known[k] = p;
  }
  return {
    name: 'fake',
    computerName: () => extra.computerName || 'OLDPC',
    userName: () => 'sam',
    homeDir: () => home,
    knownFolders: async () => known,
    oneDriveRoots: () => [],
    exportApps: async () => ({ winget: false, wingetCount: 0, installed: [] }),
    installApp: async (pkg) => ({ ok: !/fail/.test(pkg.id), code: 0, output: '' }),
    exportWifi: async (dir) => {
      fs.writeFileSync(path.join(dir, 'Wi-Fi-Home.xml'), '<WLANProfile><name>Home</name><keyMaterial>x</keyMaterial></WLANProfile>');
      return { profiles: [{ name: 'Home', file: path.join(dir, 'Wi-Fi-Home.xml'), hasKey: true }] };
    },
    importWifi: async () => ({ ok: true }),
    browserProfileRoots: async () => ({ localAppData: path.join(home, 'nope'), appData: path.join(home, 'nope') }),
    wallpaperFile: async () => extra.wallpaper || null,
    setWallpaper: async () => ({ ok: true }),
    freeSpace: async () => (extra.free === undefined ? null : extra.free),
    removableRoots: async () => [],
    cloudOnlyFiles: async () => extra.cloudOnly || new Set(),
    known,
  };
}

function makeOldPc() {
  const home = tmp('md-old-');
  const p = fakePlatform(home);
  const T = new Date('2024-05-01T10:00:00Z');
  write(path.join(p.known.documents, 'Taxes', '2023 return.pdf'), 'pdf-bytes', T);
  write(path.join(p.known.documents, 'notes.txt'), 'hello', T);
  write(path.join(p.known.documents, 'Ünïcødé — ファイル.txt'), 'unicode', T);
  write(path.join(p.known.documents, 'empty.txt'), '', T);
  write(path.join(p.known.documents, 'desktop.ini'), 'junk');
  write(path.join(p.known.documents, '~$notes.docx'), 'lock');
  write(path.join(p.known.pictures, 'big.bin'), crypto.randomBytes(3 * 1024 * 1024 + 17), T);
  write(path.join(p.known.desktop, 'todo.txt'), 'buy milk', T);
  // a link pointing outside must never be followed
  const outside = tmp('md-outside-');
  write(path.join(outside, 'secret.txt'), 'nope');
  fs.symlinkSync(outside, path.join(p.known.documents, 'My Music'), 'dir');
  return { home, p };
}

function foldersOf(p, keys = ['documents', 'pictures', 'desktop']) {
  const labels = { documents: 'Documents', pictures: 'Pictures', desktop: 'Desktop', downloads: 'Downloads' };
  return keys.map((k) => ({ key: k, label: labels[k], path: p.known[k] }));
}

// ---------------------------------------------------------------------------------------------

test('fsutil helpers', () => {
  assert.equal(fsutil.conflictName(path.join('a', 'photo.jpg'), 'OLDPC'), path.join('a', 'photo (from OLDPC).jpg'));
  assert.equal(fsutil.conflictName(path.join('a', 'photo.jpg'), 'OLDPC', 3), path.join('a', 'photo (from OLDPC 3).jpg'));
  assert.equal(fsutil.conflictName(path.join('a', 'Makefile'), 'X'), path.join('a', 'Makefile (from X)'));
  assert.equal(fsutil.safeJoin('/r', '../x'), null);
  assert.equal(fsutil.safeJoin('/r', 'a/../../x'), null);
  assert.equal(fsutil.safeJoin('/r', 'C:/x'), null);
  assert.equal(fsutil.safeJoin('/r', 'a\\..\\x'), null);
  assert.equal(fsutil.safeJoin('/r', ''), null);
  assert.equal(fsutil.safeJoin('/r', 'a/b.txt'), path.join('/r', 'a', 'b.txt'));
  assert.equal(fsutil.safeSegment('DESK:TOP/1. '), 'DESKTOP1');
  assert.equal(fsutil.safeSegment(''), 'PC');
  assert.equal(fsutil.formatBytes(0), '0 B');
  assert.equal(fsutil.formatBytes(1536), '1.5 KB');
  assert.equal(fsutil.formatBytes(5 * 1024 ** 3), '5.0 GB');
  assert.ok(fsutil.isInside('/a/b/c', '/a/b'));
  assert.ok(fsutil.isInside('/a/b', '/a/b'));
  assert.ok(!fsutil.isInside('/a/bc', '/a/b'));
  assert.ok(fsutil.shouldSkipFile('Thumbs.db'));
  assert.ok(fsutil.shouldSkipFile('~$Report.docx'));
  assert.ok(!fsutil.shouldSkipFile('report.docx'));
});

test('walk skips links, junk files and excluded subtrees', async () => {
  const { p } = makeOldPc();
  const seen = [];
  for await (const f of fsutil.walk(p.known.documents, { exclude: [path.join(p.known.documents, 'Taxes')] })) seen.push(f.rel);
  assert.deepEqual(seen.sort(), ['empty.txt', 'notes.txt', 'Ünïcødé — ファイル.txt'].sort());
});

test('scanFolders counts files and bytes', async () => {
  const { p } = makeOldPc();
  const r = await scanFolders(foldersOf(p));
  const docs = r.find((x) => x.key === 'documents');
  assert.equal(docs.files, 4);
  assert.equal(docs.bytes, 'pdf-bytes'.length + 'hello'.length + 'unicode'.length);
});

test('pack then unpack round-trips every file byte-for-byte, with mtimes', async () => {
  const { p } = makeOldPc();
  const dest = tmp('md-usb-');
  const events = [];
  const res = await pack({ dest, folders: foldersOf(p), include: { wifi: true }, platform: p, onProgress: (e) => events.push(e), now: new Date('2026-11-19T12:00:00Z') });
  assert.equal(res.files, 6);
  assert.equal(path.basename(res.boxPath), 'MovingDay-OLDPC-2026-11-19');
  assert.ok(events.some((e) => e.phase === 'copy'));
  assert.equal(events.at(-1).phase, 'done');
  const last = events.filter((e) => e.phase === 'done').at(-1);
  assert.ok(last);

  const m = await box.readBox(res.boxPath);
  assert.equal(m.folders.documents.files, 4);
  assert.equal(m.wifi.withKeys, 1);
  assert.match(fs.readFileSync(path.join(res.boxPath, 'READ ME.txt'), 'utf8'), /Wi-Fi passwords/);
  const journal = await box.readJournal(res.boxPath);
  assert.equal(journal.size, 6);
  assert.ok(!listFiles(res.boxPath).some((f) => f.includes('secret') || f.includes('desktop.ini') || f.endsWith('.mdpart')));

  const newHome = tmp('md-new-');
  const np = fakePlatform(newHome, { computerName: 'NEWPC' });
  const u = await unpack({ box: res.boxPath, platform: np, include: { files: true, wifi: true } });
  assert.equal(u.restored, 6);
  assert.equal(u.failed.length, 0);
  assert.equal(u.wifi.added, 1);
  for (const rel of ['Taxes/2023 return.pdf', 'notes.txt', 'Ünïcødé — ファイル.txt', 'empty.txt']) {
    const a = path.join(p.known.documents, ...rel.split('/'));
    const b = path.join(np.known.documents, ...rel.split('/'));
    assert.equal(sha(a), sha(b), rel);
    assert.equal(Math.floor(fs.statSync(b).mtimeMs), Math.floor(fs.statSync(a).mtimeMs), `mtime ${rel}`);
  }
  assert.equal(sha(path.join(p.known.pictures, 'big.bin')), sha(path.join(np.known.pictures, 'big.bin')));
});

test('unpack never overwrites: same file is skipped, different file is saved as a copy', async () => {
  const { p } = makeOldPc();
  const dest = tmp('md-usb-');
  const { boxPath } = await pack({ dest, folders: foldersOf(p), include: {}, platform: p });

  const newHome = tmp('md-new-');
  const np = fakePlatform(newHome);
  write(path.join(np.known.documents, 'notes.txt'), 'hello'); // identical content
  write(path.join(np.known.desktop, 'todo.txt'), 'DIFFERENT — must survive');
  write(path.join(np.known.desktop, 'todo (from OLDPC).txt'), 'also taken');

  const u = await unpack({ box: boxPath, platform: np, include: { files: true } });
  assert.equal(u.alreadyThere, 1);
  assert.equal(u.renamed.length, 1);
  assert.equal(fs.readFileSync(path.join(np.known.desktop, 'todo.txt'), 'utf8'), 'DIFFERENT — must survive');
  assert.equal(fs.readFileSync(path.join(np.known.desktop, 'todo (from OLDPC).txt'), 'utf8'), 'also taken');
  assert.equal(fs.readFileSync(path.join(np.known.desktop, 'todo (from OLDPC 2).txt'), 'utf8'), 'buy milk');

  // Unpacking twice changes nothing and creates no further copies.
  const before = listFiles(newHome);
  const u2 = await unpack({ box: boxPath, platform: np, include: { files: true } });
  assert.equal(u2.restored, 0);
  assert.equal(u2.renamed.length, 0);
  assert.equal(u2.alreadyThere, 6);
  assert.deepEqual(listFiles(newHome), before);
});

test('a damaged file in the box is reported and never lands on the new PC', async () => {
  const { p } = makeOldPc();
  const { boxPath } = await pack({ dest: tmp('md-usb-'), folders: foldersOf(p, ['desktop']), include: {}, platform: p });
  fs.writeFileSync(path.join(boxPath, 'files', 'desktop', 'todo.txt'), 'tampered');
  const np = fakePlatform(tmp('md-new-'));
  const u = await unpack({ box: boxPath, platform: np, include: { files: true } });
  assert.equal(u.failed.length, 1);
  assert.match(u.failed[0].reason, /checksum/);
  assert.ok(!fs.existsSync(path.join(np.known.desktop, 'todo.txt')));
  assert.ok(!listFiles(np.known.desktop).some((f) => f.endsWith('.mdpart')));
});

test('unsafe paths in a box journal are refused', async () => {
  const { p } = makeOldPc();
  const { boxPath } = await pack({ dest: tmp('md-usb-'), folders: foldersOf(p, ['desktop']), include: {}, platform: p });
  fs.appendFileSync(path.join(boxPath, box.JOURNAL), JSON.stringify({ k: 'desktop', p: '../../escape.txt', s: 1, m: 0, h: 'x' }) + '\n');
  const newHome = tmp('md-new-');
  const np = fakePlatform(newHome);
  const u = await unpack({ box: boxPath, platform: np, include: { files: true } });
  assert.equal(u.restored, 1);
  assert.equal(u.failed.length, 1);
  assert.equal(u.failed[0].reason, 'unsafe path in box');
  assert.ok(!fs.existsSync(path.join(newHome, 'escape.txt')));
  assert.ok(!fs.existsSync(path.join(path.dirname(newHome), 'escape.txt')));
});

test('re-packing resumes: unchanged files are not copied again, removed files drop out', async () => {
  const { p } = makeOldPc();
  const dest = tmp('md-usb-');
  const now = new Date('2026-11-19T12:00:00Z');
  const first = await pack({ dest, folders: foldersOf(p), include: {}, platform: p, now });
  const bigInBox = path.join(first.boxPath, 'files', 'pictures', 'big.bin');
  const inode = fs.statSync(bigInBox).ino;

  write(path.join(p.known.desktop, 'todo.txt'), 'buy milk and eggs', new Date('2025-01-01T00:00:00Z'));
  write(path.join(p.known.desktop, 'new.txt'), 'new file');
  fs.rmSync(path.join(p.known.documents, 'notes.txt'));

  const copied = new Set();
  const second = await pack({ dest, folders: foldersOf(p), include: {}, platform: p, now, onProgress: (e) => e.phase === 'copy' && e.current && copied.add(e.current) });
  assert.equal(second.boxPath, first.boxPath);
  assert.ok(copied.has('todo.txt') && copied.has('new.txt'));
  assert.ok(!copied.has('big.bin'), 'unchanged big file must not be copied again');
  assert.equal(fs.statSync(bigInBox).ino, inode);
  const j = await box.readJournal(second.boxPath);
  assert.equal(j.size, 6);
  assert.ok(!j.has(box.entryId('documents', 'notes.txt')));
  assert.equal(j.get(box.entryId('desktop', 'todo.txt')).s, 'buy milk and eggs'.length);
});

test('cancelling leaves an unfinished box that cannot be unpacked, and re-running finishes it', async () => {
  const { p } = makeOldPc();
  const dest = tmp('md-usb-');
  const ac = new AbortController();
  await assert.rejects(
    pack({ dest, folders: foldersOf(p), include: {}, platform: p, signal: ac.signal, onProgress: (e) => e.phase === 'copy' && e.current && ac.abort() }),
    (err) => err.name === 'AbortError',
  );
  const boxPath = path.join(dest, fs.readdirSync(dest)[0]);
  await assert.rejects(box.readBox(boxPath), (e) => e.code === 'NOT_A_BOX');
  assert.ok(!listFiles(boxPath).some((f) => f.endsWith('.mdpart')));
  const r = await pack({ dest, folders: foldersOf(p), include: {}, platform: p });
  assert.equal(r.files, 6);
  await box.readBox(boxPath);
});

test('not enough space is caught before copying', async () => {
  const { home } = makeOldPc();
  const p = fakePlatform(home, { free: 1000 });
  await assert.rejects(pack({ dest: tmp('md-usb-'), folders: foldersOf(p), include: {}, platform: p }), (e) => e.code === 'ENOSPC_PRECHECK');
});

test('a box saved inside a folder being packed does not pack itself', async () => {
  const { p } = makeOldPc();
  const r = await pack({ dest: p.known.documents, folders: foldersOf(p), include: {}, platform: p });
  assert.equal(r.files, 6);
  const r2 = await pack({ dest: p.known.documents, folders: foldersOf(p), include: {}, platform: p });
  assert.equal(r2.files, 6);
  assert.ok(!listFiles(r2.boxPath).some((f) => f.includes('MovingDay-')));
});

test('nested selected folders are packed once', async () => {
  const { p } = makeOldPc();
  const nested = { key: 'custom-1', label: 'Taxes', path: path.join(p.known.documents, 'Taxes') };
  const r = await pack({ dest: tmp('md-usb-'), folders: [...foldersOf(p, ['documents']), nested], include: {}, platform: p });
  assert.equal(r.files, 4);
  const m = await box.readBox(r.boxPath);
  assert.equal(m.folders.documents.files, 3);
  assert.equal(m.folders['custom-1'].files, 1);
});

test('cloud-only OneDrive files are skipped and listed', async () => {
  const { home } = makeOldPc();
  const base = fakePlatform(home);
  const cloud = path.join(base.known.documents, 'notes.txt');
  const p = { ...fakePlatform(home, { cloudOnly: new Set([cloud]) }), oneDriveRoots: () => [home] };
  const r = await pack({ dest: tmp('md-usb-'), folders: foldersOf(p, ['documents']), include: {}, platform: p });
  assert.equal(r.files, 3);
  assert.ok(r.skipped.some((s) => s.path === cloud && /OneDrive/.test(s.reason)));
});

test('custom folders go back to the same place if possible, otherwise under Documents', async () => {
  const newHome = tmp('md-new-');
  const np = fakePlatform(newHome);
  const existingParent = tmp('md-parent-');
  const m = {
    folders: {
      documents: { label: 'Documents', source: 'x' },
      'custom-1': { label: 'Projects', source: path.join(existingParent, 'Projects') },
      'custom-2': { label: 'Games', source: path.join('/definitely/missing', 'Games') },
      savedgames: { label: 'Saved Games', source: 'y' },
    },
  };
  const t = await resolveTargets(m, np);
  assert.equal(t.documents, np.known.documents);
  assert.equal(t['custom-1'], path.join(existingParent, 'Projects'));
  assert.equal(t['custom-2'], path.join(np.known.documents, 'Games'));
  assert.equal(t.savedgames, path.join(newHome, 'Saved Games'));
});

test('wallpaper, apps and findBoxes', async () => {
  const { home } = makeOldPc();
  const wp = path.join(home, 'TranscodedWallpaper');
  write(wp, Buffer.from([0xff, 0xd8, 0xff, 0xe0, 1, 2, 3]));
  const p = fakePlatform(home, { wallpaper: wp });
  const dest = tmp('md-usb-');
  const r = await pack({ dest, folders: foldersOf(p, ['desktop']), include: { wallpaper: true }, platform: p });
  assert.equal(r.wallpaper, 'wallpaper/wallpaper.jpg');

  const found = await box.findBoxes([dest, path.join(dest, 'missing')]);
  assert.equal(found.length, 1);
  assert.equal(found[0].computerName, 'OLDPC');

  const np = fakePlatform(tmp('md-new-'));
  const u = await unpack({ box: r.boxPath, platform: np, include: { files: false, wallpaper: true, apps: [{ id: 'Mozilla.Firefox' }, { id: 'will.fail' }] } });
  assert.ok(u.wallpaper && fs.existsSync(u.wallpaper));
  assert.match(path.basename(u.wallpaper), /Wallpaper from OLDPC\.jpg/);
  assert.deepEqual(u.apps.installed, ['Mozilla.Firefox']);
  assert.deepEqual(u.apps.failed, ['will.fail']);
  assert.equal(u.restored, 0);
});

test('readBox rejects folders that are not boxes or are from the future', async () => {
  const d = tmp('md-x-');
  await assert.rejects(box.readBox(d), (e) => e.code === 'NOT_A_BOX');
  fs.writeFileSync(path.join(d, box.MANIFEST), '{');
  await assert.rejects(box.readBox(d), (e) => e.code === 'BAD_BOX');
  fs.writeFileSync(path.join(d, box.MANIFEST), JSON.stringify({ format: box.FORMAT, version: 99 }));
  await assert.rejects(box.readBox(d), (e) => e.code === 'NEWER_BOX');
});
