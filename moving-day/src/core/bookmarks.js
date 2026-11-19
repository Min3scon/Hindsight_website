'use strict';

/**
 * Browser bookmarks: find browser profiles on the old PC, read their bookmarks (Chromium JSON or
 * Firefox jsonlz4 backups) and turn them into Netscape bookmark HTML files that every mainstream
 * browser can import.
 *
 * Everything here is synchronous (callers may still `await` it) and never touches the source
 * files except to read them. Only exportAll() writes, and only inside the outDir it is given.
 */

const path = require('path');

// ---------------------------------------------------------------------------------------------
// Browser locations
// ---------------------------------------------------------------------------------------------

/** Chromium-family browsers keep a "User Data" folder with one sub-folder per profile. */
const CHROMIUM_BROWSERS = [
  { browser: 'Chrome', rel: ['Google', 'Chrome', 'User Data'] },
  { browser: 'Edge', rel: ['Microsoft', 'Edge', 'User Data'] },
  { browser: 'Brave', rel: ['BraveSoftware', 'Brave-Browser', 'User Data'] },
  { browser: 'Vivaldi', rel: ['Vivaldi', 'User Data'] },
  { browser: 'Chromium', rel: ['Chromium', 'User Data'] },
];

/** Opera keeps its (single) profile directly in a roaming folder. */
const OPERA_BROWSERS = [
  { browser: 'Opera', rel: ['Opera Software', 'Opera Stable'] },
  { browser: 'Opera GX', rel: ['Opera Software', 'Opera GX Stable'] },
];

/**
 * Bookmark files inside a Chromium profile folder. "AccountBookmarks" holds bookmarks that recent
 * Chrome versions save to the signed-in Google account without full sync turned on.
 */
const CHROMIUM_BOOKMARK_FILES = [
  { file: 'Bookmarks', suffix: '' },
  { file: 'AccountBookmarks', suffix: ' (account)' },
];

/** Profile-like folders in "User Data" that never hold the user's own bookmarks. */
const SKIP_CHROMIUM_DIRS = new Set(['system profile', 'guest profile']);

const FIREFOX_ROOTS = [
  { guid: 'menu________', root: 'bookmarksMenuFolder', title: 'Bookmarks menu', keepEmpty: true },
  { guid: 'toolbar_____', root: 'toolbarFolder', title: 'Bookmarks toolbar', keepEmpty: true },
  { guid: 'unfiled_____', root: 'unfiledBookmarksFolder', title: 'Other bookmarks', keepEmpty: true },
  { guid: 'mobile______', root: 'mobileFolder', title: 'Mobile bookmarks', keepEmpty: false },
];
const FIREFOX_TAGS_GUID = 'tags________';

const FF_CONTAINER = 'text/x-moz-place-container';
const FF_PLACE = 'text/x-moz-place';

/** Source files bigger than this are not bookmarks files we want to load into memory. */
const MAX_SOURCE_BYTES = 128 * 1024 * 1024;
/** Upper bound for a decoded mozLz4 payload (guards against absurd sizes in corrupt headers). */
const MAX_DECODED_BYTES = 256 * 1024 * 1024;

const MOZLZ4_MAGIC = Buffer.from('mozLz40\0', 'latin1');
const CHROMIUM_EPOCH_OFFSET_S = 11644473600n; // seconds between 1601-01-01 and 1970-01-01

const ALLOWED_SCHEMES = new Set(['http', 'https', 'ftp', 'file', 'chrome', 'edge', 'about']);

// ---------------------------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------------------------

/** path.win32 for Windows-looking paths (backslash or drive letter), path.posix otherwise. */
function pathFor(...candidates) {
  const win = candidates.some((c) => typeof c === 'string' && (c.includes('\\') || /^[A-Za-z]:/.test(c)));
  return win ? path.win32 : path.posix;
}

function statOrNull(fs, p) {
  try {
    return fs.statSync(p);
  } catch {
    return null;
  }
}

function isFile(fs, p) {
  const st = statOrNull(fs, p);
  return !!st && st.isFile();
}

function isDir(fs, p) {
  const st = statOrNull(fs, p);
  return !!st && st.isDirectory();
}

function listDir(fs, p) {
  try {
    const names = fs.readdirSync(p);
    return Array.isArray(names) ? names.map(String) : [];
  } catch {
    return [];
  }
}

function stripBom(s) {
  return s.charCodeAt(0) === 0xfeff ? s.slice(1) : s;
}

function toBuffer(input) {
  if (Buffer.isBuffer(input)) return input;
  if (input instanceof Uint8Array) return Buffer.from(input.buffer, input.byteOffset, input.byteLength);
  return null;
}

function toText(input) {
  if (typeof input === 'string') return stripBom(input);
  const buf = toBuffer(input);
  if (!buf) throw new TypeError('Expected a Buffer or string');
  return stripBom(buf.toString('utf8'));
}

function readText(fs, p) {
  try {
    return toText(fs.readFileSync(p));
  } catch {
    return null;
  }
}

function readJson(fs, p) {
  const text = readText(fs, p);
  if (text == null) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function isObject(v) {
  return !!v && typeof v === 'object' && !Array.isArray(v);
}

// ---------------------------------------------------------------------------------------------
// Discovery
// ---------------------------------------------------------------------------------------------

/** Default first, then "Profile N" by number, then anything else alphabetically. */
function compareChromiumDirs(a, b) {
  const rank = (n) => {
    if (n === 'Default') return [0, 0, n];
    const m = /^Profile (\d+)$/.exec(n);
    if (m) return [1, Number(m[1]), n];
    return [2, 0, n.toLowerCase()];
  };
  const [ra, na, sa] = rank(a);
  const [rb, nb, sb] = rank(b);
  if (ra !== rb) return ra - rb;
  if (na !== nb) return na - nb;
  return sa < sb ? -1 : sa > sb ? 1 : 0;
}

function chromiumProfiles(fs, p, browser, userData) {
  const out = [];
  if (!isDir(fs, userData)) return out;
  const state = readJson(fs, p.join(userData, 'Local State'));
  const cache = isObject(state) && isObject(state.profile) && isObject(state.profile.info_cache) ? state.profile.info_cache : {};
  const dirs = listDir(fs, userData)
    .filter((d) => !SKIP_CHROMIUM_DIRS.has(d.toLowerCase()))
    .sort(compareChromiumDirs);
  for (const dir of dirs) {
    const profileDir = p.join(userData, dir);
    if (!isDir(fs, profileDir)) continue;
    const info = cache[dir];
    const name = isObject(info) && typeof info.name === 'string' && info.name.trim() ? info.name.trim() : dir;
    for (const { file, suffix } of CHROMIUM_BOOKMARK_FILES) {
      const full = p.join(profileDir, file);
      if (isFile(fs, full)) out.push({ browser, profile: name + suffix, kind: 'chromium', file: full });
    }
  }
  return out;
}

function operaProfile(fs, p, browser, base) {
  // Older Opera keeps "Bookmarks" directly in the folder; newer builds may use a "Default"
  // sub-folder. If both exist, the most recently written one wins.
  let best = null;
  for (const full of [p.join(base, 'Bookmarks'), p.join(base, 'Default', 'Bookmarks')]) {
    const st = statOrNull(fs, full);
    if (!st || !st.isFile()) continue;
    const mtime = Number(st.mtimeMs) || 0;
    if (!best || mtime > best.mtime) best = { full, mtime };
  }
  return best ? [{ browser, profile: 'Default', kind: 'chromium', file: best.full }] : [];
}

/** profiles.ini → Map(lower-case profile folder name → display name). */
function parseProfilesIni(text) {
  const names = new Map();
  if (typeof text !== 'string') return names;
  let current = null;
  const flush = () => {
    if (current && current.name && current.path) {
      const folder = current.path.split(/[\\/]+/).filter(Boolean).pop();
      if (folder) names.set(folder.toLowerCase(), current.name);
    }
  };
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith(';') || line.startsWith('#')) continue;
    const section = /^\[(.+)\]$/.exec(line);
    if (section) {
      flush();
      current = /^Profile\d+$/i.test(section[1].trim()) ? {} : null;
      continue;
    }
    if (!current) continue;
    const eq = line.indexOf('=');
    if (eq < 0) continue;
    const key = line.slice(0, eq).trim().toLowerCase();
    const value = line.slice(eq + 1).trim();
    if (key === 'name') current.name = value;
    else if (key === 'path') current.path = value;
  }
  flush();
  return names;
}

function isoDay(ms) {
  try {
    return new Date(ms).toISOString().slice(0, 10);
  } catch {
    return '';
  }
}

/** Newest `*.jsonlz4` in a bookmarkbackups folder: by the date in the file name, then by mtime. */
function newestBackup(fs, p, dir) {
  let best = null;
  for (const name of listDir(fs, dir)) {
    if (!/\.jsonlz4$/i.test(name)) continue;
    const full = p.join(dir, name);
    const st = statOrNull(fs, full);
    if (!st || !st.isFile()) continue;
    const mtime = Number(st.mtimeMs) || 0;
    const m = /^bookmarks-(\d{4}-\d{2}-\d{2})/i.exec(name);
    const day = m ? m[1] : isoDay(mtime);
    const cand = { full, day, mtime, name };
    if (
      !best ||
      cand.day > best.day ||
      (cand.day === best.day && (cand.mtime > best.mtime || (cand.mtime === best.mtime && cand.name > best.name)))
    ) {
      best = cand;
    }
  }
  return best ? best.full : null;
}

function firefoxProfiles(fs, p, browser, ffRoot) {
  const out = [];
  const profilesDir = p.join(ffRoot, 'Profiles');
  if (!isDir(fs, profilesDir)) return out;
  const names = parseProfilesIni(readText(fs, p.join(ffRoot, 'profiles.ini')));
  const dirs = listDir(fs, profilesDir).sort((a, b) => (a.toLowerCase() < b.toLowerCase() ? -1 : a.toLowerCase() > b.toLowerCase() ? 1 : 0));
  for (const dir of dirs) {
    const profileDir = p.join(profilesDir, dir);
    if (!isDir(fs, profileDir)) continue;
    const file = newestBackup(fs, p, p.join(profileDir, 'bookmarkbackups'));
    if (!file) continue;
    out.push({ browser, profile: names.get(dir.toLowerCase()) || dir, kind: 'firefox', file });
  }
  return out;
}

/** Firefox installed from the Microsoft Store keeps its roaming data inside its package folder. */
function storeFirefoxRoots(fs, p, localAppData) {
  const packages = p.join(localAppData, 'Packages');
  return listDir(fs, packages)
    .filter((d) => /^Mozilla\.Firefox_/i.test(d))
    .sort()
    .map((d) => p.join(packages, d, 'LocalCache', 'Roaming', 'Mozilla', 'Firefox'));
}

/**
 * Find browser profiles that have a bookmarks source file.
 * @param {{ localAppData?: string, appData?: string }} roots  usually platform.browserProfileRoots()
 * @param {typeof import('fs')} [fs]
 * @returns {{ browser: string, profile: string, kind: 'chromium'|'firefox', file: string }[]}
 */
function discoverProfiles(roots, fs = require('fs')) {
  const out = [];
  const attempt = (fn) => {
    try {
      out.push(...fn());
    } catch {
      /* unreadable or missing: skip */
    }
  };
  try {
    const localAppData = roots && typeof roots.localAppData === 'string' && roots.localAppData ? roots.localAppData : null;
    const appData = roots && typeof roots.appData === 'string' && roots.appData ? roots.appData : null;
    const p = pathFor(localAppData, appData);
    if (localAppData) {
      for (const b of CHROMIUM_BROWSERS) attempt(() => chromiumProfiles(fs, p, b.browser, p.join(localAppData, ...b.rel)));
    }
    if (appData) {
      for (const b of OPERA_BROWSERS) attempt(() => operaProfile(fs, p, b.browser, p.join(appData, ...b.rel)));
      attempt(() => firefoxProfiles(fs, p, 'Firefox', p.join(appData, 'Mozilla', 'Firefox')));
    }
    if (localAppData) {
      attempt(() => storeFirefoxRoots(fs, p, localAppData).flatMap((r) => firefoxProfiles(fs, p, 'Firefox', r)));
    }
  } catch {
    /* never throw */
  }
  return out;
}

// ---------------------------------------------------------------------------------------------
// Chromium
// ---------------------------------------------------------------------------------------------

/** Chromium timestamps are microseconds since 1601-01-01 (as a decimal string). → Unix seconds, 0 if unknown. */
function chromiumTimeToUnix(value) {
  let v = value;
  if (typeof v === 'number' && Number.isFinite(v)) v = String(Math.trunc(v));
  if (typeof v !== 'string' || !/^\d{1,20}$/.test(v)) return 0;
  const seconds = BigInt(v) / 1000000n - CHROMIUM_EPOCH_OFFSET_S;
  return seconds > 0n ? Number(seconds) : 0;
}

function chromiumChildren(list) {
  const out = [];
  if (!Array.isArray(list)) return out;
  for (const node of list) {
    if (!isObject(node)) continue;
    const title = typeof node.name === 'string' ? node.name : '';
    if (node.type === 'folder' || (node.type === undefined && Array.isArray(node.children))) {
      out.push({ title, children: chromiumChildren(node.children) });
    } else if (typeof node.url === 'string') {
      out.push({ title, url: node.url, added: chromiumTimeToUnix(node.date_added) });
    }
  }
  return out;
}

/**
 * Parse a Chromium-family "Bookmarks" file.
 * @param {Buffer|string} input
 * @returns {{ title: string, children: object[] }}
 */
function readChromiumBookmarks(input) {
  const data = JSON.parse(toText(input));
  const roots = isObject(data) ? data.roots : null;
  if (!isObject(roots)) throw new Error('Not a Chromium bookmarks file (no "roots")');
  const children = [];
  for (const [key, title, keepEmpty] of [
    ['bookmark_bar', 'Bookmarks bar', true],
    ['other', 'Other bookmarks', true],
    ['synced', 'Mobile bookmarks', false],
  ]) {
    const node = roots[key];
    if (!isObject(node)) continue;
    const kids = chromiumChildren(node.children);
    if (!keepEmpty && kids.length === 0) continue;
    children.push({ title, children: kids });
  }
  return { title: 'Bookmarks', children };
}

// ---------------------------------------------------------------------------------------------
// Firefox (mozLz4 + bookmarks backup JSON)
// ---------------------------------------------------------------------------------------------

/** Decompress one raw LZ4 block from src[start..] into a buffer of exactly `size` bytes. */
function lz4DecompressBlock(src, start, size) {
  const out = Buffer.alloc(size);
  const end = src.length;
  let ip = start;
  let op = 0;
  const fail = (what) => {
    throw new Error(`mozLz4: corrupt data (${what} at input byte ${ip})`);
  };
  if (size === 0 && ip === end) return out;
  for (;;) {
    if (ip >= end) fail('unexpected end of input');
    const token = src[ip++];

    // Literals
    let lit = token >>> 4;
    if (lit === 15) {
      let b;
      do {
        if (ip >= end) fail('truncated literal length');
        b = src[ip++];
        lit += b;
      } while (b === 255);
    }
    if (lit > end - ip) fail('literals run past end of input');
    if (lit > size - op) fail('literals overflow the declared size');
    src.copy(out, op, ip, ip + lit);
    ip += lit;
    op += lit;

    // The last sequence carries literals only.
    if (ip === end) break;

    // Match
    if (end - ip < 2) fail('truncated match offset');
    const offset = src[ip] | (src[ip + 1] << 8);
    ip += 2;
    if (offset === 0) fail('zero match offset');
    if (offset > op) fail('match offset points before start of output');
    let len = token & 15;
    if (len === 15) {
      let b;
      do {
        if (ip >= end) fail('truncated match length');
        b = src[ip++];
        len += b;
      } while (b === 255);
    }
    len += 4;
    if (len > size - op) fail('match overflows the declared size');
    let ref = op - offset;
    if (offset >= len) {
      out.copy(out, op, ref, ref + len);
      op += len;
    } else {
      // Overlapping copy: the match repeats bytes it is itself producing (e.g. runs).
      for (let k = 0; k < len; k++) out[op++] = out[ref++];
    }
  }
  if (op !== size) fail(`decoded ${op} bytes but the header says ${size}`);
  return out;
}

function hasMozLz4Magic(buf) {
  return buf.length >= MOZLZ4_MAGIC.length && buf.subarray(0, MOZLZ4_MAGIC.length).equals(MOZLZ4_MAGIC);
}

/**
 * Decode a Mozilla "mozLz40\0" file (jsonlz4 / baklz4).
 * @param {Buffer} input
 * @returns {Buffer}
 */
function decodeMozLz4(input) {
  const buf = toBuffer(input);
  if (!buf) throw new TypeError('decodeMozLz4: expected a Buffer');
  if (!hasMozLz4Magic(buf)) throw new Error('mozLz4: missing "mozLz40" header');
  if (buf.length < 12) throw new Error('mozLz4: file is truncated (no size field)');
  const size = buf.readUInt32LE(8);
  if (size > MAX_DECODED_BYTES) throw new Error(`mozLz4: declared size ${size} bytes is implausibly large`);
  return lz4DecompressBlock(buf, 12, size);
}

function firefoxKind(node) {
  if (typeof node.type === 'string') {
    if (node.type === FF_CONTAINER) return 'folder';
    if (node.type === FF_PLACE) return 'link';
    return 'other';
  }
  if (node.typeCode === 2) return 'folder';
  if (node.typeCode === 1) return 'link';
  return 'other';
}

/** Firefox dateAdded: microseconds since the Unix epoch → seconds, 0 if unknown. */
function firefoxTimeToUnix(value) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.floor(n / 1e6) : 0;
}

function firefoxChildren(list) {
  const out = [];
  if (!Array.isArray(list)) return out;
  for (const node of list) {
    if (!isObject(node)) continue;
    const title = typeof node.title === 'string' ? node.title : '';
    const kind = firefoxKind(node);
    if (kind === 'folder') {
      out.push({ title, children: firefoxChildren(node.children) });
    } else if (kind === 'link') {
      if (typeof node.uri !== 'string' || /^\s*place:/i.test(node.uri)) continue;
      out.push({ title, url: node.uri, added: firefoxTimeToUnix(node.dateAdded) });
    }
    // separators and anything unknown are dropped
  }
  return out;
}

/**
 * Parse a Firefox bookmarks backup (.jsonlz4, or plain JSON for old-style backups).
 * @param {Buffer|string} input
 * @returns {{ title: string, children: object[] }}
 */
function readFirefoxBookmarks(input) {
  const buf = toBuffer(input);
  let text;
  if (buf && hasMozLz4Magic(buf)) text = toText(decodeMozLz4(buf));
  else text = toText(input);
  const root = JSON.parse(text);
  if (!isObject(root) || !Array.isArray(root.children)) throw new Error('Not a Firefox bookmarks backup');

  const known = [];
  const extra = [];
  for (const child of root.children) {
    if (!isObject(child)) continue;
    if (child.guid === FIREFOX_TAGS_GUID || child.root === 'tagsFolder') continue;
    const spec = FIREFOX_ROOTS.find((r) => r.guid === child.guid || (child.root && r.root === child.root));
    if (spec) {
      const kids = firefoxChildren(child.children);
      if (!spec.keepEmpty && kids.length === 0) continue;
      known.push({ order: FIREFOX_ROOTS.indexOf(spec), node: { title: spec.title, children: kids } });
    } else if (firefoxKind(child) === 'folder') {
      const kids = firefoxChildren(child.children);
      if (kids.length) extra.push({ title: typeof child.title === 'string' && child.title ? child.title : 'Bookmarks', children: kids });
    }
  }
  known.sort((a, b) => a.order - b.order);
  return { title: 'Bookmarks', children: [...known.map((k) => k.node), ...extra] };
}

// ---------------------------------------------------------------------------------------------
// Netscape HTML export
// ---------------------------------------------------------------------------------------------

/** The URL as it will be exported, or null if it must not be exported (unknown/dangerous scheme). */
function cleanUrl(url) {
  if (typeof url !== 'string') return null;
  // Browsers ignore control characters and surrounding spaces when parsing URLs, so
  // " java\nscript:" is still javascript:. Normalise the same way before checking the scheme.
  const u = url.replace(/[\u0000-\u001f\u007f]/g, '').trim();
  const m = /^([A-Za-z][A-Za-z0-9+.-]*):/.exec(u);
  if (!m || !ALLOWED_SCHEMES.has(m[1].toLowerCase())) return null;
  return u;
}

/** True if the URL uses a scheme we export (http, https, ftp, file, chrome, edge, about). */
function isSafeUrl(url) {
  return cleanUrl(url) !== null;
}

function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/[\u0000-\u001f\u007f]+/g, ' ') // importers are line-based: no newlines inside a title
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function dateAttr(added) {
  return Number.isFinite(added) && added > 0 ? ` ADD_DATE="${Math.floor(added)}"` : '';
}

function writeChildren(lines, children, depth) {
  if (!Array.isArray(children)) return;
  const pad = '    '.repeat(depth);
  for (const node of children) {
    if (!isObject(node)) continue;
    if (Array.isArray(node.children)) {
      lines.push(`${pad}<DT><H3${dateAttr(node.added)}>${escapeHtml(node.title)}</H3>`);
      lines.push(`${pad}<DL><p>`);
      writeChildren(lines, node.children, depth + 1);
      lines.push(`${pad}</DL><p>`);
    } else {
      const url = cleanUrl(node.url);
      if (!url) continue;
      const title = typeof node.title === 'string' && node.title ? node.title : url;
      lines.push(`${pad}<DT><A HREF="${escapeHtml(url)}"${dateAttr(node.added)}>${escapeHtml(title)}</A>`);
    }
  }
}

/**
 * Render a normalised bookmark tree as a Netscape bookmark file (what browsers export/import).
 * Links with schemes other than http(s)/ftp/file/chrome/edge/about are left out.
 * @param {{ children: object[] }} tree
 * @param {{ title?: string }} [options]
 * @returns {string}
 */
function toNetscapeHtml(tree, { title = 'Bookmarks' } = {}) {
  const heading = escapeHtml(title || 'Bookmarks');
  const lines = [
    '<!DOCTYPE NETSCAPE-Bookmark-file-1>',
    '<!-- This is an automatically generated file.',
    '     It will be read and overwritten.',
    '     DO NOT EDIT! -->',
    '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">',
    `<TITLE>${heading}</TITLE>`,
    `<H1>${heading}</H1>`,
    '<DL><p>',
  ];
  writeChildren(lines, tree && tree.children, 1);
  lines.push('</DL><p>');
  return lines.join('\n') + '\n';
}

/**
 * Number of links in a tree that toNetscapeHtml() will export (unsafe schemes are not counted).
 * @param {{ children?: object[] }} tree
 * @returns {number}
 */
function countBookmarks(tree) {
  let n = 0;
  const walk = (node) => {
    if (!isObject(node)) return;
    if (Array.isArray(node.children)) node.children.forEach(walk);
    else if (cleanUrl(node.url)) n++;
  };
  walk(tree);
  return n;
}

// ---------------------------------------------------------------------------------------------
// Export to a box
// ---------------------------------------------------------------------------------------------

const RESERVED_WIN_NAMES = /^(con|prn|aux|nul|com[0-9¹²³]|lpt[0-9¹²³])(\..*)?$/i;

/** Make a string safe as a Windows file name (without extension). */
function sanitizeFileName(name, fallback = 'Bookmarks') {
  let s = String(name == null ? '' : name)
    .replace(/[<>:"/\\|?*\u0000-\u001f\u007f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[. ]+$/, '');
  const chars = Array.from(s);
  if (chars.length > 120) s = chars.slice(0, 120).join('').replace(/[. ]+$/, '');
  if (!s) s = fallback;
  if (RESERVED_WIN_NAMES.test(s)) s = `_${s}`;
  return s;
}

function uniqueName(base, used) {
  let name = base;
  for (let n = 2; used.has(name.toLowerCase()); n++) name = `${base} (${n})`;
  used.add(name.toLowerCase());
  return name;
}

/**
 * Write `<Browser> - <Profile>.html` for every readable profile into outDir, plus a copy of each
 * raw source file under outDir/raw/<Browser> - <Profile>/. Profiles that cannot be read or parsed
 * are skipped silently. Never throws.
 * @param {{ browser: string, profile: string, kind: string, file: string }[]} profiles
 * @param {string} outDir  e.g. <box>/bookmarks
 * @param {typeof import('fs')} [fs]
 * @returns {{ browser: string, profile: string, file: string, count: number }[]}  file is e.g. 'bookmarks/Chrome - Sam.html'
 */
function exportAll(profiles, outDir, fs = require('fs')) {
  const results = [];
  try {
    if (!Array.isArray(profiles) || typeof outDir !== 'string' || !outDir) return results;
    const p = pathFor(outDir);
    const dirName = p.basename(outDir) || 'bookmarks';
    fs.mkdirSync(outDir, { recursive: true });
    const used = new Set();
    for (const prof of profiles) {
      try {
        if (!isObject(prof) || typeof prof.file !== 'string' || !prof.file) continue;
        const st = fs.statSync(prof.file);
        if (!st.isFile() || st.size > MAX_SOURCE_BYTES) continue;
        const raw = fs.readFileSync(prof.file);
        const firefox = prof.kind === 'firefox' || (prof.kind !== 'chromium' && /\.jsonlz4$/i.test(prof.file));
        const tree = firefox ? readFirefoxBookmarks(raw) : readChromiumBookmarks(raw);

        const browser = typeof prof.browser === 'string' && prof.browser ? prof.browser : 'Browser';
        const profile = typeof prof.profile === 'string' && prof.profile ? prof.profile : 'Default';
        const label = `${browser} - ${profile}`;
        const name = uniqueName(sanitizeFileName(label), used);
        fs.writeFileSync(p.join(outDir, `${name}.html`), toNetscapeHtml(tree, { title: label }), 'utf8');

        try {
          const rawDir = p.join(outDir, 'raw', name);
          fs.mkdirSync(rawDir, { recursive: true });
          const srcName = sanitizeFileName(pathFor(prof.file).basename(prof.file), firefox ? 'bookmarks.jsonlz4' : 'Bookmarks');
          fs.writeFileSync(p.join(rawDir, srcName), raw);
        } catch {
          /* the raw copy is a bonus; the HTML file is what matters */
        }

        results.push({ browser, profile, file: `${dirName}/${name}.html`, count: countBookmarks(tree) });
      } catch {
        /* unreadable or unparseable profile: skip */
      }
    }
  } catch {
    /* never throw */
  }
  return results;
}

module.exports = {
  discoverProfiles,
  readChromiumBookmarks,
  decodeMozLz4,
  readFirefoxBookmarks,
  toNetscapeHtml,
  countBookmarks,
  exportAll,
  // helpers (exported for tests and UI)
  sanitizeFileName,
  isSafeUrl,
};
