'use strict';
// File-system helpers shared by pack and unpack.
// Safety first: never follow links, never overwrite unless the caller explicitly allows it,
// always write to a temporary name and rename when complete.

const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const crypto = require('crypto');
const { pipeline } = require('stream/promises');
const { Transform } = require('stream');

const TEMP_SUFFIX = '.mdpart';

// Lower-case names that are never worth moving.
const SKIP_FILES = new Set(['desktop.ini', 'thumbs.db', 'ehthumbs.db', 'ehthumbs_vista.db', '.ds_store']);
const SKIP_DIRS = new Set(['$recycle.bin', 'system volume information']);

const isWin = process.platform === 'win32';
const norm = (p) => (isWin ? path.resolve(p).toLowerCase() : path.resolve(p));

/** True when `child` is `parent` or lives somewhere below it. */
function isInside(child, parent) {
  const rel = path.relative(norm(parent), norm(child));
  return rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel));
}

function shouldSkipFile(name) {
  const lower = name.toLowerCase();
  return SKIP_FILES.has(lower) || lower.startsWith('~$') || lower.endsWith(TEMP_SUFFIX);
}

function shouldSkipDir(name) {
  return SKIP_DIRS.has(name.toLowerCase());
}

const SOFT_ERRORS = new Set(['EBUSY', 'EPERM', 'EACCES', 'ENOENT', 'ELOOP', 'ENAMETOOLONG', 'UNKNOWN', 'EINVAL']);

/** Errors that mean "skip this one file and carry on" rather than "stop everything". */
function isSoftError(err) {
  return Boolean(err && SOFT_ERRORS.has(err.code));
}

function reasonFor(err) {
  switch (err && err.code) {
    case 'EBUSY': return 'in use by another program';
    case 'EPERM':
    case 'EACCES': return 'access denied';
    case 'ENOENT': return 'disappeared while copying';
    case 'ENAMETOOLONG': return 'path too long';
    case 'HASH_MISMATCH': return 'damaged in the box (checksum mismatch)';
    default: return (err && (err.code || err.message)) || 'unknown error';
  }
}

/**
 * Walk a folder without following symlinks or junctions.
 * Yields { abs, rel, size, mtimeMs } with `rel` using forward slashes.
 * opts.exclude: absolute paths whose subtrees are skipped (e.g. the box itself, nested selected folders)
 * opts.cloudOnly: Set of absolute paths to skip (OneDrive placeholders)
 * opts.onSkip(abs, reason)
 */
async function* walk(root, opts = {}) {
  const exclude = (opts.exclude || []).filter(Boolean);
  const cloudOnly = opts.cloudOnly || new Set();
  const cloudNorm = new Set([...cloudOnly].map(norm));
  const onSkip = opts.onSkip || (() => {});
  const stack = [''];
  while (stack.length) {
    if (opts.signal && opts.signal.aborted) throw abortError();
    const relDir = stack.pop();
    const absDir = relDir ? path.join(root, ...relDir.split('/')) : root;
    let entries;
    try {
      entries = await fsp.readdir(absDir, { withFileTypes: true });
    } catch (err) {
      if (relDir === '' && err.code === 'ENOENT') return;
      onSkip(absDir, reasonFor(err));
      continue;
    }
    entries.sort((a, b) => (a.name < b.name ? 1 : a.name > b.name ? -1 : 0)); // stack pops in name order
    for (const d of entries) {
      const abs = path.join(absDir, d.name);
      const rel = relDir ? `${relDir}/${d.name}` : d.name;
      if (d.isSymbolicLink()) continue; // junctions show up as links on Windows
      if (d.isDirectory()) {
        if (shouldSkipDir(d.name)) continue;
        if (exclude.some((ex) => isInside(abs, ex))) continue;
        stack.push(rel);
        continue;
      }
      if (!d.isFile()) continue;
      if (shouldSkipFile(d.name)) continue;
      if (cloudNorm.size && cloudNorm.has(norm(abs))) {
        onSkip(abs, 'only in OneDrive (not downloaded)');
        continue;
      }
      let st;
      try {
        st = await fsp.lstat(abs);
      } catch (err) {
        onSkip(abs, reasonFor(err));
        continue;
      }
      if (!st.isFile()) continue;
      yield { abs, rel, size: st.size, mtimeMs: Math.floor(st.mtimeMs) };
    }
  }
}

function abortError() {
  const e = new Error('Cancelled');
  e.name = 'AbortError';
  e.code = 'ABORT_ERR';
  return e;
}

async function exists(p) {
  try {
    await fsp.lstat(p);
    return true;
  } catch {
    return false;
  }
}

async function hashFile(p, signal) {
  const h = crypto.createHash('sha256');
  await pipeline(fs.createReadStream(p), new Transform({
    transform(chunk, _enc, cb) { h.update(chunk); cb(); },
  }), { signal });
  return h.digest('hex');
}

/**
 * Copy src → dst through a temporary file, hashing as it goes.
 * opts.overwrite: replace an existing dst (only ever used for files inside our own box)
 * opts.expectedHash: refuse to finish (and remove the temp file) if the content hash differs
 * opts.mtimeMs: set the destination modification time
 * opts.onBytes(n): progress callback
 * Returns { sha256, size }.
 */
async function copyWithHash(src, dst, opts = {}) {
  await fsp.mkdir(path.dirname(dst), { recursive: true });
  const tmp = dst + TEMP_SUFFIX;
  const h = crypto.createHash('sha256');
  let size = 0;
  const meter = new Transform({
    transform(chunk, _enc, cb) {
      h.update(chunk);
      size += chunk.length;
      if (opts.onBytes) opts.onBytes(chunk.length);
      cb(null, chunk);
    },
  });
  try {
    await pipeline(fs.createReadStream(src), meter, fs.createWriteStream(tmp, { flags: 'w' }), { signal: opts.signal });
    const sha256 = h.digest('hex');
    if (opts.expectedHash && opts.expectedHash !== sha256) {
      const e = new Error(`Checksum mismatch for ${src}`);
      e.code = 'HASH_MISMATCH';
      throw e;
    }
    if (opts.mtimeMs) {
      const t = new Date(opts.mtimeMs);
      await fsp.utimes(tmp, t, t);
    }
    if (!opts.overwrite && (await exists(dst))) {
      const e = new Error(`Refusing to overwrite ${dst}`);
      e.code = 'EEXIST';
      throw e;
    }
    await fsp.rename(tmp, dst);
    return { sha256, size };
  } catch (err) {
    await fsp.rm(tmp, { force: true }).catch(() => {});
    throw err;
  }
}

/** "photo.jpg" → "photo (from OLDPC).jpg", then "photo (from OLDPC 2).jpg", … */
function conflictName(target, label, n = 1) {
  const dir = path.dirname(target);
  const ext = path.extname(target);
  const base = path.basename(target, ext);
  const tag = n === 1 ? `(from ${label})` : `(from ${label} ${n})`;
  if (!base) return path.join(dir, `${ext} ${tag}`); // dotfiles such as ".gitconfig"
  return path.join(dir, `${base} ${tag}${ext}`);
}

/** Make a string safe as a single Windows path segment. */
function safeSegment(s, fallback = 'PC') {
  const cleaned = String(s || '')
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, '')
    .replace(/[. ]+$/g, '')
    .trim();
  return cleaned || fallback;
}

function formatBytes(n) {
  if (!Number.isFinite(n) || n < 0) return '—';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  let v = n;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return i === 0 ? `${v} B` : `${v.toFixed(1)} ${units[i]}`;
}

/** Resolve "a/b/c" under root, refusing anything that escapes root. */
function safeJoin(root, rel) {
  const parts = String(rel).split('/');
  if (!rel || parts.some((p) => p === '' || p === '.' || p === '..' || /[\\:]/.test(p) || /^[a-zA-Z]:/.test(p))) {
    return null;
  }
  const out = path.join(root, ...parts);
  return isInside(out, root) ? out : null;
}

module.exports = {
  TEMP_SUFFIX,
  isInside,
  shouldSkipFile,
  shouldSkipDir,
  isSoftError,
  reasonFor,
  walk,
  exists,
  hashFile,
  copyWithHash,
  conflictName,
  safeSegment,
  formatBytes,
  safeJoin,
  abortError,
};
