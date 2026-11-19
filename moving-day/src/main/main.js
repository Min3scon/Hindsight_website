'use strict';
// Electron main process: one window, IPC handlers for the Renderer API (see ARCHITECTURE.md).
// Core and platform modules are required lazily inside handlers, so the window still opens
// even if one of them is missing or broken.

const path = require('node:path');
const fs = require('node:fs');
const os = require('node:os');
const { pathToFileURL } = require('node:url');
const { app, BrowserWindow, ipcMain, dialog, shell, nativeTheme, Menu, session } = require('electron');

const FAKE = process.env.MOVING_DAY_FAKE === '1';
const INDEX_FILE = path.join(__dirname, '..', 'renderer', 'index.html');
const INDEX_URL = pathToFileURL(INDEX_FILE).href;
const BACKGROUND = { light: '#fbfbfa', dark: '#1c1c1e' }; // keep in sync with --bg in style.css
const PROGRESS_INTERVAL_MS = 100; // ≤ 10 progress events per second

const FOLDER_ORDER = ['desktop', 'documents', 'pictures', 'music', 'videos', 'downloads', 'savedgames'];
const FOLDER_LABELS = {
  desktop: 'Desktop',
  documents: 'Documents',
  pictures: 'Pictures',
  music: 'Music',
  videos: 'Videos',
  downloads: 'Downloads',
  savedgames: 'Saved Games',
};

let win = null;

// ---- Shared state ------------------------------------------------------------------------------

const state = {
  task: null, // AbortController of the running pack/unpack
  scan: null, // AbortController of the running scan
  folders: new Map(), // key → { key, label, path } from the last scan (+ custom folders)
  custom: new Map(), // custom-N → { key, label, path, files, bytes }
  customCounter: 0,
  destination: null, // folder the user picked for the box
  boxes: new Map(), // normalised box path → { path, apps: [{ id, source }] }
  allowedRoots: new Set(), // normalised paths openPath may open
};

const isWin = process.platform === 'win32';
const norm = (p) => (isWin ? path.resolve(p).toLowerCase() : path.resolve(p));

function isInside(child, parent) {
  const rel = path.relative(norm(parent), norm(child));
  return rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel));
}

function allow(p) {
  if (typeof p === 'string' && p) state.allowedRoots.add(norm(p));
}

function isAllowed(p) {
  for (const root of state.allowedRoots) if (isInside(p, root)) return true;
  return false;
}

/** An error whose message is safe and meant to be shown to the user as-is. */
function userError(message, code = 'USER') {
  const e = new Error(message);
  e.code = code;
  e.userFacing = true;
  return e;
}

const FRIENDLY = {
  ENOSPC: 'The drive is full. Free up some space, or pick another drive.',
  EACCES: 'Moving Day is not allowed to use that folder. Pick another one.',
  EPERM: 'Moving Day is not allowed to use that folder. Pick another one.',
  EROFS: 'That drive is read-only. Pick another one.',
  ENOENT: 'That folder is not there any more. Is the drive still plugged in?',
  EIO: 'The drive could not be read. Is it still plugged in?',
  ENODEV: 'The drive could not be read. Is it still plugged in?',
  MODULE_NOT_FOUND: 'Part of Moving Day is missing. Try reinstalling it.',
};

function friendlyMessage(err) {
  if (!err) return 'Something went wrong.';
  if (err.userFacing) return err.message;
  const code = typeof err.code === 'string' ? err.code : '';
  if (FRIENDLY[code]) return FRIENDLY[code];
  // Raw system errors carry paths and jargon in their message.
  if (/^E[A-Z0-9]+$/.test(code)) return `Something went wrong (${code}).`;
  // Core errors (NOT_A_BOX, ENOSPC_PRECHECK, plain Errors…) are written to be shown as-is.
  if (err.message && err.message.length <= 200 && !/\n\s+at /.test(err.message)) return err.message;
  return 'Something went wrong.';
}

/** IPC results must be plain data. */
const plain = (v) => (v === undefined ? null : JSON.parse(JSON.stringify(v)));

async function safely(fn, fallback) {
  try {
    const v = await fn();
    return v === undefined ? fallback : v;
  } catch {
    return fallback;
  }
}

// ---- Lazy modules ------------------------------------------------------------------------------

let platformCache = null;
function platform() {
  if (!platformCache) platformCache = require('../platform').getPlatform();
  return platformCache;
}
const core = {
  pack: () => require('../core/pack'),
  unpack: () => require('../core/unpack'),
  box: () => require('../core/box'),
  bookmarks: () => require('../core/bookmarks'),
};

// ---- Progress ----------------------------------------------------------------------------------

function sendToRenderer(channel, data) {
  if (win && !win.isDestroyed() && !win.webContents.isDestroyed()) win.webContents.send(channel, data);
}

/** Latest-value throttle: at most one event per interval, and flush() always delivers the last one. */
function createThrottle(send, interval = PROGRESS_INTERVAL_MS) {
  let pending = null;
  let timer = null;
  let last = 0;
  const fire = () => {
    clearTimeout(timer);
    timer = null;
    if (!pending) return;
    const e = pending;
    pending = null;
    last = Date.now();
    send(e);
  };
  return {
    push(e) {
      pending = e;
      const wait = interval - (Date.now() - last);
      if (wait <= 0) fire();
      else if (!timer) timer = setTimeout(fire, wait);
    },
    flush: fire,
  };
}

function cleanProgress(e) {
  e = e || {};
  const num = (v) => (Number.isFinite(v) ? v : 0);
  return {
    phase: typeof e.phase === 'string' ? e.phase : '',
    filesDone: num(e.filesDone),
    filesTotal: num(e.filesTotal),
    bytesDone: num(e.bytesDone),
    bytesTotal: num(e.bytesTotal),
    current: typeof e.current === 'string' ? e.current : '',
    message: typeof e.message === 'string' ? e.message : '',
  };
}

/**
 * Run a cancellable pack/unpack. Resolves { cancelled: true } when the user pressed Cancel.
 */
async function runTask(fn) {
  if (state.task) throw userError('Moving Day is already busy.', 'BUSY');
  const controller = new AbortController();
  state.task = controller;
  const throttle = createThrottle((e) => sendToRenderer('progress', e));
  try {
    const result = await fn({ signal: controller.signal, onProgress: (e) => throttle.push(cleanProgress(e)) });
    if (controller.signal.aborted) return { cancelled: true };
    return result;
  } catch (err) {
    if (controller.signal.aborted || (err && (err.name === 'AbortError' || err.code === 'ABORT_ERR'))) {
      return { cancelled: true };
    }
    throw err;
  } finally {
    throttle.flush();
    state.task = null;
  }
}

function cancel() {
  if (state.task) state.task.abort();
  if (state.scan) state.scan.abort();
  return true;
}

// ---- Dialogs -----------------------------------------------------------------------------------

async function pickFolder({ title, buttonLabel, defaultPath } = {}) {
  const options = { title, buttonLabel, properties: ['openDirectory', 'createDirectory'] };
  if (defaultPath) options.defaultPath = defaultPath;
  const res = win && !win.isDestroyed() ? await dialog.showOpenDialog(win, options) : await dialog.showOpenDialog(options);
  if (!res || res.canceled || !res.filePaths || !res.filePaths.length) return null;
  return res.filePaths[0];
}

// ---- Real handlers -----------------------------------------------------------------------------

async function scanFolderList(list, signal) {
  const p = platform();
  const oneDrive = (await safely(() => p.oneDriveRoots(), [])) || [];
  const inOneDrive = (dir) => oneDrive.some((r) => r && isInside(dir, r));
  const cloudOnly = new Set();
  for (const f of list) {
    if (!inOneDrive(f.path) || typeof p.cloudOnlyFiles !== 'function') continue;
    const set = await safely(() => p.cloudOnlyFiles(f.path), null);
    if (set) for (const x of set) cloudOnly.add(x);
  }
  const scanned = await core.pack().scanFolders(list, { exclude: [], cloudOnly, signal });
  return scanned.map((f) => ({
    key: f.key,
    label: f.label,
    path: f.path,
    files: f.files || 0,
    bytes: f.bytes || 0,
    inOneDrive: inOneDrive(f.path),
  }));
}

async function detectBrowsers(p) {
  return safely(async () => {
    const roots = await p.browserProfileRoots();
    const profiles = await core.bookmarks().discoverProfiles(roots);
    const names = (profiles || []).map((x) => (x && (x.browser || x.name)) || '').filter(Boolean);
    return [...new Set(names)];
  }, []);
}

async function boxSummary(boxPath) {
  const manifest = await core.box().readBox(boxPath);
  const apps = (await safely(() => core.unpack().boxApps(boxPath), [])) || [];
  const entries = Object.entries(manifest.folders || {});
  const rank = (k) => (FOLDER_ORDER.includes(k) ? FOLDER_ORDER.indexOf(k) : FOLDER_ORDER.length);
  entries.sort((a, b) => rank(a[0]) - rank(b[0]));
  const folders = entries.map(([key, f]) => ({
    key,
    label: (f && f.label) || FOLDER_LABELS[key] || key,
    files: (f && f.files) || 0,
    bytes: (f && f.bytes) || 0,
  }));
  const seen = new Set();
  const appList = [];
  for (const a of apps) {
    if (!a || !a.id || seen.has(a.id)) continue;
    seen.add(a.id);
    appList.push({ id: String(a.id), source: a.source || 'winget' });
  }
  state.boxes.set(norm(boxPath), { path: boxPath, apps: appList });
  allow(boxPath);
  return {
    path: boxPath,
    computerName: manifest.computerName || '',
    createdAt: manifest.completedAt || manifest.createdAt || null,
    bytes: folders.reduce((a, f) => a + f.bytes, 0),
    files: folders.reduce((a, f) => a + f.files, 0),
    folders,
    apps: appList.map((a) => a.id),
    wifi: (manifest.wifi && manifest.wifi.count) || 0,
    bookmarks: Array.isArray(manifest.bookmarks) ? manifest.bookmarks.length : 0,
    wallpaper: Boolean(manifest.wallpaper),
  };
}

function createRealHandlers() {
  return {
    async getInfo() {
      let computerName = os.hostname();
      let name = process.platform;
      try {
        const p = platform();
        computerName = p.computerName() || computerName;
        name = p.name || name;
      } catch {
        /* platform module missing: fall back to os */
      }
      return { computerName, platform: name, version: app.getVersion() };
    },

    async scan() {
      if (state.scan) state.scan.abort();
      const controller = new AbortController();
      state.scan = controller;
      try {
        const p = platform();
        const known = (await p.knownFolders()) || {};
        const list = FOLDER_ORDER.filter((k) => typeof known[k] === 'string' && known[k]).map((k) => ({
          key: k,
          label: FOLDER_LABELS[k],
          path: known[k],
        }));
        for (const c of state.custom.values()) list.push({ key: c.key, label: c.label, path: c.path });
        const folders = await scanFolderList(list, controller.signal);
        state.folders = new Map(folders.map((f) => [f.key, f]));
        const [wallpaper, browsers] = await Promise.all([
          safely(() => p.wallpaperFile(), null),
          detectBrowsers(p),
        ]);
        return {
          folders,
          // The Wi-Fi count is only known after export; null means "probably available".
          wifi: p.name === 'windows' ? null : 0,
          browsers,
          apps: p.name === 'windows',
          wallpaper: Boolean(wallpaper),
        };
      } catch (err) {
        if (controller.signal.aborted) return { cancelled: true, folders: [] };
        throw err;
      } finally {
        if (state.scan === controller) state.scan = null;
      }
    },

    async addFolder() {
      const dir = await pickFolder({ title: 'Add a folder', buttonLabel: 'Add folder' });
      if (!dir) return null;
      for (const f of state.folders.values()) {
        if (norm(f.path) === norm(dir)) throw userError(`${f.label} is already on the list.`, 'DUPLICATE');
        if (isInside(dir, f.path)) throw userError(`That folder is already inside ${f.label}.`, 'NESTED');
        if (isInside(f.path, dir)) throw userError(`That folder holds ${f.label}. Pick a smaller folder.`, 'NESTED');
      }
      const key = `custom-${++state.customCounter}`;
      const label = path.basename(dir) || dir;
      const [scanned] = await scanFolderList([{ key, label, path: dir }]);
      state.custom.set(key, scanned);
      state.folders.set(key, scanned);
      return scanned;
    },

    async chooseDestination() {
      const p = platform();
      const removable = (await safely(() => p.removableRoots(), [])) || [];
      const dir = await pickFolder({
        title: 'Save the moving box to…',
        buttonLabel: 'Save here',
        defaultPath: state.destination || removable[0],
      });
      if (!dir) return null;
      const freeBytes = await safely(() => p.freeSpace(dir), null);
      state.destination = dir;
      allow(dir);
      return {
        path: dir,
        freeBytes: Number.isFinite(freeBytes) ? freeBytes : null,
        removable: removable.some((r) => r && isInside(dir, r)),
      };
    },

    async pack(opts) {
      opts = opts || {};
      if (!state.destination || typeof opts.dest !== 'string' || norm(opts.dest) !== norm(state.destination)) {
        throw userError('Choose where to save the moving box first.', 'NO_DEST');
      }
      const keys = Array.isArray(opts.folders) ? opts.folders : [];
      const folders = keys
        .map((k) => state.folders.get(k))
        .filter(Boolean)
        .map((f) => ({ key: f.key, label: f.label, path: f.path }));
      const inc = opts.include || {};
      const include = { apps: !!inc.apps, wifi: !!inc.wifi, bookmarks: !!inc.bookmarks, wallpaper: !!inc.wallpaper };
      if (!folders.length && !Object.values(include).some(Boolean)) throw userError('Choose something to move.', 'EMPTY');
      const { pack } = core.pack();
      const p = platform();
      return runTask(async ({ signal, onProgress }) => {
        const result = await pack({ dest: state.destination, folders, include, platform: p, onProgress, signal });
        if (result && result.boxPath) allow(result.boxPath);
        return plain(result);
      });
    },

    async findBoxes() {
      const p = platform();
      const roots = [...((await safely(() => p.removableRoots(), [])) || [])];
      if (state.destination) roots.push(state.destination);
      const found = await core.box().findBoxes(roots);
      const out = [];
      for (const b of found || []) {
        const summary = await safely(() => boxSummary(b.path), null);
        if (summary) out.push(summary);
      }
      return out;
    },

    async chooseBox() {
      const dir = await pickFolder({ title: 'Find the moving box', buttonLabel: 'Use this box' });
      if (!dir) return null;
      try {
        return await boxSummary(dir);
      } catch (err) {
        // The user may have picked the drive or a parent folder: look one or two levels down.
        const found = await safely(() => core.box().findBoxes([dir]), []);
        if (found && found.length) return boxSummary(found[0].path);
        throw err.code === 'NOT_A_BOX' ? userError('No moving box in that folder. Pick the folder that starts with "MovingDay-".', 'NOT_A_BOX') : err;
      }
    },

    async unpack(opts) {
      opts = opts || {};
      const entry = typeof opts.box === 'string' ? state.boxes.get(norm(opts.box)) : null;
      if (!entry) throw userError('Choose a moving box first.', 'NO_BOX');
      const folders = (Array.isArray(opts.folders) ? opts.folders : []).filter((k) => typeof k === 'string');
      const inc = opts.include || {};
      const wanted = new Set(Array.isArray(inc.apps) ? inc.apps : []);
      const apps = entry.apps.filter((a) => wanted.has(a.id)).map((a) => ({ id: a.id, source: a.source }));
      const include = {
        files: folders.length > 0 && inc.files !== false,
        apps,
        wifi: !!inc.wifi,
        bookmarks: !!inc.bookmarks,
        wallpaper: !!inc.wallpaper,
      };
      if (!include.files && !apps.length && !include.wifi && !include.bookmarks && !include.wallpaper) {
        throw userError('Choose something to unpack.', 'EMPTY');
      }
      const { unpack } = core.unpack();
      const p = platform();
      return runTask(async ({ signal, onProgress }) => {
        const result = await unpack({ box: entry.path, folders, include, platform: p, onProgress, signal });
        if (result && result.bookmarksDir) allow(result.bookmarksDir);
        return plain(result);
      });
    },

    cancel,

    async openPath(p) {
      if (typeof p !== 'string' || !p) throw userError('Nothing to open.', 'BAD_PATH');
      const abs = path.resolve(p);
      if (!isAllowed(abs)) throw userError('Moving Day only opens folders it made or you picked.', 'NOT_ALLOWED');
      const st = await fs.promises.stat(abs).catch(() => null);
      // Folders only: opening a file would run it.
      if (!st || !st.isDirectory()) throw userError('That folder is not there any more.', 'ENOENT');
      const err = await shell.openPath(abs);
      if (err) throw userError(`Could not open the folder. ${err}`, 'OPEN_FAILED');
      return true;
    },
  };
}

// ---- IPC ---------------------------------------------------------------------------------------

const API = ['getInfo', 'scan', 'addFolder', 'chooseDestination', 'pack', 'findBoxes', 'chooseBox', 'unpack', 'cancel', 'openPath'];

function registerIpc(handlers) {
  for (const name of API) {
    const fn = handlers[name];
    ipcMain.handle(`md:${name}`, async (event, ...args) => {
      const frameUrl = event.senderFrame ? event.senderFrame.url : '';
      if (!win || event.sender !== win.webContents || frameUrl !== INDEX_URL) {
        return { ok: false, error: { message: 'Not allowed.', code: 'FORBIDDEN' } };
      }
      try {
        return { ok: true, value: plain(await fn(...args)) };
      } catch (err) {
        console.error(`[moving-day] ${name} failed:`, err);
        return { ok: false, error: { message: friendlyMessage(err), code: String((err && err.code) || 'ERROR') } };
      }
    });
  }
}

// ---- Window ------------------------------------------------------------------------------------

function themeBackground() {
  return nativeTheme.shouldUseDarkColors ? BACKGROUND.dark : BACKGROUND.light;
}

function createWindow() {
  win = new BrowserWindow({
    width: 720,
    height: 560,
    minWidth: 600,
    minHeight: 480,
    useContentSize: true,
    show: false,
    title: 'Moving Day',
    autoHideMenuBar: true,
    backgroundColor: themeBackground(),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webviewTag: false,
      spellcheck: false,
    },
  });

  const wc = win.webContents;
  wc.setWindowOpenHandler(() => ({ action: 'deny' }));
  wc.on('will-navigate', (e, url) => {
    if (url !== INDEX_URL) e.preventDefault();
  });
  wc.on('will-redirect', (e) => e.preventDefault());
  wc.on('will-attach-webview', (e) => e.preventDefault());

  win.once('ready-to-show', () => win.show());
  win.on('closed', () => {
    cancel();
    win = null;
  });
  win.loadFile(INDEX_FILE);
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (!win) return;
    if (win.isMinimized()) win.restore();
    win.focus();
  });

  app.whenReady().then(() => {
    if (app.isPackaged) Menu.setApplicationMenu(null);
    session.defaultSession.setPermissionRequestHandler((_wc, _permission, callback) => callback(false));
    session.defaultSession.setPermissionCheckHandler(() => false);
    nativeTheme.on('updated', () => {
      if (win && !win.isDestroyed()) win.setBackgroundColor(themeBackground());
    });

    const handlers = FAKE ? require('./fake').createFakeHandlers({ runTask, cancel, version: app.getVersion() }) : createRealHandlers();
    registerIpc(handlers);
    createWindow();
  });

  app.on('web-contents-created', (_e, contents) => {
    contents.setWindowOpenHandler(() => ({ action: 'deny' }));
    contents.on('will-navigate', (e, url) => {
      if (url !== INDEX_URL) e.preventDefault();
    });
  });

  app.on('before-quit', cancel);
  app.on('window-all-closed', () => app.quit());
}
