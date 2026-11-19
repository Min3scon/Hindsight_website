'use strict';
// The moving box: a plain folder anyone can browse, plus a manifest and a file journal.

const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const { safeSegment } = require('./fsutil');

const MANIFEST = 'moving-day.json';
const JOURNAL = 'files.ndjson';
const FORMAT = 'moving-day-box';
const VERSION = 1;

function boxFolderName(computerName, date = new Date()) {
  const d = date.toISOString().slice(0, 10);
  return `MovingDay-${safeSegment(computerName)}-${d}`;
}

/** Path of a file inside the box for folder key + relative path ("a/b.txt"). */
function boxFilePath(boxPath, key, rel) {
  return path.join(boxPath, 'files', key, ...rel.split('/'));
}

const entryId = (k, p) => `${k}\u0000${p}`;

/** Read the journal; later lines win. A torn final line (power cut) is ignored. */
async function readJournal(boxPath) {
  const map = new Map();
  let text;
  try {
    text = await fsp.readFile(path.join(boxPath, JOURNAL), 'utf8');
  } catch {
    return map;
  }
  for (const line of text.split('\n')) {
    if (!line.trim()) continue;
    try {
      const e = JSON.parse(line);
      if (e && typeof e.k === 'string' && typeof e.p === 'string' && typeof e.h === 'string') {
        map.set(entryId(e.k, e.p), e);
      }
    } catch {
      /* torn line */
    }
  }
  return map;
}

/** Rewrite the journal with exactly these entries (atomic). */
async function writeJournal(boxPath, entries) {
  const lines = entries.map((e) => JSON.stringify({ k: e.k, p: e.p, s: e.s, m: e.m, h: e.h }));
  await atomicWrite(path.join(boxPath, JOURNAL), lines.join('\n') + (lines.length ? '\n' : ''));
}

async function atomicWrite(file, data) {
  const tmp = file + '.tmp';
  await fsp.writeFile(tmp, data);
  await fsp.rename(tmp, file);
}

async function writeManifest(boxPath, manifest) {
  await atomicWrite(path.join(boxPath, MANIFEST), JSON.stringify(manifest, null, 2));
}

/** Read and validate a finished box. Throws a friendly error otherwise. */
async function readBox(boxPath) {
  let raw;
  try {
    raw = await fsp.readFile(path.join(boxPath, MANIFEST), 'utf8');
  } catch {
    throw friendly('NOT_A_BOX', 'This folder is not a finished moving box. Pack it again on your old PC.');
  }
  let m;
  try {
    m = JSON.parse(raw);
  } catch {
    throw friendly('BAD_BOX', 'This moving box is damaged (its manifest cannot be read).');
  }
  if (!m || m.format !== FORMAT) throw friendly('NOT_A_BOX', 'This folder is not a moving box.');
  if (m.version > VERSION) {
    throw friendly('NEWER_BOX', 'This box was made by a newer version of Moving Day. Update the app and try again.');
  }
  return m;
}

function friendly(code, message) {
  const e = new Error(message);
  e.code = code;
  return e;
}

/** Look for finished boxes in each root and one level below it. */
async function findBoxes(roots) {
  const found = [];
  const seen = new Set();
  const consider = async (dir) => {
    const key = path.resolve(dir).toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    try {
      const m = await readBox(dir);
      let bytes = 0;
      let files = 0;
      for (const f of Object.values(m.folders || {})) {
        bytes += f.bytes || 0;
        files += f.files || 0;
      }
      found.push({ path: dir, computerName: m.computerName, createdAt: m.createdAt, completedAt: m.completedAt, bytes, files });
    } catch {
      /* not a box */
    }
  };
  for (const root of roots || []) {
    if (!root) continue;
    await consider(root);
    let entries = [];
    try {
      entries = await fsp.readdir(root, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const d of entries) {
      if (!d.isDirectory()) continue;
      const sub = path.join(root, d.name);
      await consider(sub);
      if (/^MovingDay-/i.test(d.name)) continue;
      // one more level for "E:\Backups\MovingDay-…"
      let inner = [];
      try {
        inner = await fsp.readdir(sub, { withFileTypes: true });
      } catch {
        continue;
      }
      for (const i of inner) if (i.isDirectory() && /^MovingDay-/i.test(i.name)) await consider(path.join(sub, i.name));
    }
  }
  found.sort((a, b) => String(b.completedAt || b.createdAt).localeCompare(String(a.completedAt || a.createdAt)));
  return found;
}

function readMeText(m) {
  const lines = [
    'MOVING DAY — moving box',
    '',
    `Packed on ${m.computerName} (${m.userName}) at ${m.completedAt || m.createdAt}.`,
    '',
    'To unpack: install Moving Day on your new PC, open it, choose "This is my new PC" and pick this folder.',
    'Nothing on the new PC is overwritten or deleted.',
    '',
    'You can also browse this folder yourself — your files are in "files", sorted by the folder they came from.',
  ];
  if (m.wifi && m.wifi.withKeys) {
    lines.push('', 'Note: the "wifi" folder contains Wi-Fi passwords. Keep this drive safe, and delete this box once you have moved in.');
  }
  return lines.join('\r\n') + '\r\n';
}

module.exports = {
  MANIFEST,
  JOURNAL,
  FORMAT,
  VERSION,
  boxFolderName,
  boxFilePath,
  entryId,
  readJournal,
  writeJournal,
  writeManifest,
  readBox,
  findBoxes,
  readMeText,
  atomicWrite,
};
