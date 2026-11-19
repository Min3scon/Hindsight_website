# Moving Day — architecture

Electron app (Windows 10/11 target, Microsoft Store MSIX). Two flows:

- **Pack** (old PC): copy chosen folders + app list + Wi-Fi + bookmarks + wallpaper into a *moving box* folder on a USB drive / external disk / network folder.
- **Unpack** (new PC): restore from a box. **Never deletes or overwrites anything.** Conflicts are written as `name (from OLDPC).ext`.

Plain modern JavaScript (CommonJS), no build step. Node 22 / Electron 44. Tests: `node --test test/` (core + platform, run on Linux), UI tests in `test-ui/` (Playwright + Electron under xvfb).

## Layout

```
src/
  main/main.js          Electron main process: window, IPC handlers (calls core + platform)
  main/preload.js       contextBridge → window.movingDay (see "Renderer API")
  renderer/index.html   minimal UI (one window, a few screens)
  renderer/app.js
  renderer/style.css
  core/fsutil.js        walk(), copyWithHash(), safe paths, skip rules, formatting helpers
  core/box.js           box layout, manifest read/write, findBoxes()
  core/pack.js          pack(options, platform, onProgress, signal)
  core/unpack.js        unpack(options, platform, onProgress, signal)
  core/bookmarks.js     browser profile discovery + Chromium JSON / Firefox jsonlz4 → Netscape HTML
  core/apps.js          winget export JSON parsing, installed-programs normalisation, apps.txt
  platform/index.js     getPlatform(): windows.js on win32, generic.js elsewhere
  platform/windows.js   real Windows implementation (PowerShell / winget / netsh)
  platform/generic.js   non-Windows implementation for development & tests
test/                   node:test unit + integration tests
test-ui/                Playwright Electron smoke tests
```

## Folder keys

| key | label | Windows source (resolved via `User Shell Folders` registry, so OneDrive/relocated folders work) |
|---|---|---|
| desktop | Desktop | FOLDERID_Desktop |
| documents | Documents | FOLDERID_Documents |
| pictures | Pictures | FOLDERID_Pictures |
| music | Music | FOLDERID_Music |
| videos | Videos | FOLDERID_Videos |
| downloads | Downloads | FOLDERID_Downloads |
| savedgames | Saved Games | FOLDERID_SavedGames |
| custom-N | (folder name) | any extra folder the user adds |

## Platform interface (`platform/*.js` export an object with these members)

All methods async unless noted. Must never throw for "feature unavailable" — return empty results instead.

```js
{
  name: 'windows' | 'generic',
  computerName(),                    // sync → 'DESKTOP-ABC'
  userName(),                        // sync
  knownFolders(),                    // → { desktop, documents, pictures, music, videos, downloads, savedgames } absolute paths (missing ones omitted)
  oneDriveRoots(),                   // sync → [absolute paths] (env OneDrive, OneDriveConsumer, OneDriveCommercial; deduped)
  exportApps(destDir),               // writes destDir/winget.json (if winget available) and destDir/installed.json; → { winget: bool, wingetCount, installed: [{name, version, publisher}] }
  installApp(pkg, onLine),           // pkg = { id, source }; → { ok, code, output }
  exportWifi(destDir),               // writes one XML per profile → { profiles: [{ name, file, hasKey }] }
  importWifi(xmlFile),               // → { ok, output }
  browserProfileRoots(),             // → { localAppData, appData } used by core/bookmarks.js discovery
  wallpaperFile(),                   // → absolute path of current wallpaper image or null
  setWallpaper(imageFile),           // → { ok }
  freeSpace(dir),                    // → bytes (number) or null if unknown
  removableRoots(),                  // → [drive roots like 'E:\\'] to search for boxes (generic: [])
  cloudOnlyFiles(dir),               // → Set of absolute paths under dir that are cloud-only placeholders (OneDrive Files On-Demand). generic: empty Set
}
```

## Core API (used by main.js)

```js
// core/pack.js
scanFolders(folders, { exclude: [paths], cloudOnly: Set }) // folders: [{key,label,path}] → [{ key, label, path, files, bytes }]
pack({ dest, folders: [{key,label,path}], include: { apps, wifi, bookmarks, wallpaper }, platform, onProgress, signal })
  // → { boxPath, files, bytes, skipped: [{path, reason}], apps, wifi, bookmarks, wallpaper }
// core/unpack.js
unpack({ box, folders: [keys] | 'all', targets: { key: path } (optional; defaults to platform.knownFolders(), custom-N → original path if its parent exists, else Documents/<name>),
         include: { files, apps: [{id, source}], wifi, bookmarks, wallpaper }, platform, onProgress, signal })
  // → { restored, alreadyThere, renamed: [{ from, to }], failed: [{ path, reason }], apps: { installed: [], failed: [] }, wifi: { added, failed }, bookmarksDir, wallpaper }
// core/box.js
readBox(boxPath)        // → manifest object (throws if not a complete box)
findBoxes(roots)        // → [{ path, computerName, createdAt, bytes, files }] (searches each root and one level below)
```

`windows.js` shells out with `child_process.execFile` (never `exec` with string interpolation). PowerShell is invoked as
`powershell.exe -NoProfile -NonInteractive -ExecutionPolicy Bypass -Command <script>`; values are passed through
environment variables, not string concatenation, to avoid injection. The exec function is injectable for tests:
`createWindowsPlatform({ execFile, env, fs })`.

## Box format (version 1)

```
MovingDay-<COMPUTER>-<YYYY-MM-DD>/
  moving-day.json        manifest (see below) — written last; presence = box complete
  files.ndjson           one line per copied file: {"k":"documents","p":"sub/dir/a.txt","s":123,"m":1700000000000,"h":"<sha256>"}
  files/<key>/<relative path>
  apps/winget.json  apps/installed.json  apps/Apps to reinstall.txt
  wifi/*.xml
  bookmarks/<Browser> - <Profile>.html   (+ raw source files under bookmarks/raw/)
  wallpaper/wallpaper.<ext>
  READ ME.txt
```

`files.ndjson` doubles as the resume journal: a re-run of pack skips files already in the journal whose size and
mtime are unchanged and whose copy in the box still has the same size.

Manifest:

```json
{
  "format": "moving-day-box", "version": 1, "app": "0.1.0",
  "createdAt": "ISO", "completedAt": "ISO", "computerName": "OLDPC", "userName": "sam",
  "folders": { "documents": { "label": "Documents", "source": "C:\\Users\\sam\\Documents", "files": 120, "bytes": 123456 } },
  "skipped": [{ "path": "...", "reason": "locked" }],
  "apps": { "winget": true, "wingetCount": 42, "installedCount": 80 } | null,
  "wifi": { "count": 3, "withKeys": 2 } | null,
  "bookmarks": [{ "browser": "Chrome", "profile": "Default", "file": "bookmarks/Chrome - Default.html", "count": 120 }],
  "wallpaper": "wallpaper/wallpaper.jpg" | null
}
```

## Renderer API (`window.movingDay`, exposed by preload)

```js
getInfo()                         // → { computerName, platform, version }
scan()                            // → { folders: [{ key, label, path, files, bytes, inOneDrive }], wifi: n, browsers: [...], apps: bool, wallpaper: bool }
addFolder()                       // opens folder picker → { key, label, path, files, bytes } | null
chooseDestination()               // folder picker → { path, freeBytes } | null
pack({ dest, folders: [keys], include: { apps, wifi, bookmarks, wallpaper } })   // resolves summary
findBoxes()                       // → [{ path, computerName, createdAt, bytes }]
chooseBox()                       // folder picker → box summary | null
unpack({ box, folders: [keys], include: { files, apps: [ids], wifi, bookmarks, wallpaper } })
cancel()
onProgress(cb)                    // cb({ phase, filesDone, filesTotal, bytesDone, bytesTotal, current, message })
openPath(path)
```

## Safety rules (tested)

1. Unpack never overwrites or deletes an existing file. Same content → skipped; different → `name (from OLDPC).ext` (then ` 2`, ` 3`…).
2. Every file restored is hash-verified against the manifest; mismatches are reported, the partial file is removed.
3. Copies go to `*.mdpart` then rename; interrupted copies never leave half files with real names.
4. Symlinks/junctions are never followed (Windows "My Music" junctions inside Documents etc.).
5. The box folder is excluded if it lives inside a folder being packed.
6. Locked/unreadable files are skipped and listed, never fatal.
7. Files inside OneDrive are flagged; by default folders that live inside OneDrive are left unselected (they sync on their own), and cloud-only placeholders are never force-downloaded on Windows.
