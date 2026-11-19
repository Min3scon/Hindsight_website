'use strict';
// Exposes exactly the Renderer API (ARCHITECTURE.md) as window.movingDay.
// Main replies { ok, value } or { ok: false, error: { message, code } }; errors are re-thrown
// here with a message that is safe to show as-is.

const { contextBridge, ipcRenderer } = require('electron');

async function call(name, ...args) {
  const reply = await ipcRenderer.invoke(`md:${name}`, ...args);
  if (reply && reply.ok) return reply.value;
  const info = (reply && reply.error) || {};
  const err = new Error(info.message || 'Something went wrong.');
  err.code = info.code || 'ERROR';
  throw err;
}

contextBridge.exposeInMainWorld('movingDay', {
  getInfo: () => call('getInfo'),
  scan: () => call('scan'),
  addFolder: () => call('addFolder'),
  chooseDestination: () => call('chooseDestination'),
  pack: (options) => call('pack', options),
  findBoxes: () => call('findBoxes'),
  chooseBox: () => call('chooseBox'),
  unpack: (options) => call('unpack', options),
  cancel: () => call('cancel'),
  onProgress(cb) {
    if (typeof cb !== 'function') return () => {};
    const listener = (_event, data) => cb(data);
    ipcRenderer.on('progress', listener);
    return () => ipcRenderer.removeListener('progress', listener);
  },
  openPath: (p) => call('openPath', p),
});
