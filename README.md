# Holdings XIRR

A single-page portfolio tracker — manual holdings entry, XIRR, realized/unrealized P&L by broker and recommendation, and a Google Sheets price refresh. Runs entirely in your browser; no server, no backend. Set up as an installable PWA (Progressive Web App) — add it to your phone's home screen or install it as a desktop app, and it works offline once loaded.

## Files

- `index.html` — the app itself
- `manifest.json` — PWA metadata (name, icons, theme color, install behavior)
- `sw.js` — service worker; caches the app for offline use and installability
- `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`, `icon-180-apple.png` — app icons at the sizes each platform expects

All seven files need to be uploaded together, in the same folder — the app references the others by relative path.

## Deploying to GitHub Pages

1. **Create a new repository** on GitHub (public — GitHub Pages on a private repo needs a paid plan). Anything works as the name, e.g. `holdings-xirr`.
2. **Upload all the files above** to the repo root — either drag them into the GitHub web UI ("Add file → Upload files", multi-select all seven) or:
   ```bash
   git clone https://github.com/YOUR-USERNAME/holdings-xirr.git
   cd holdings-xirr
   cp /path/to/index.html /path/to/manifest.json /path/to/sw.js /path/to/icon-*.png .
   git add .
   git commit -m "Add app"
   git push
   ```
3. **Turn on Pages**: repo → **Settings → Pages** → under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)` → **Save**.
4. Wait a minute or two, then visit:
   ```
   https://YOUR-USERNAME.github.io/holdings-xirr/
   ```

## Installing it

Once it's hosted (installability needs a real HTTPS origin — it won't offer to install from a local file or from this chat's preview):

- **Android (Chrome)**: open the URL → menu (⋮) → "Add to Home screen" / "Install app".
- **iPhone (Safari)**: open the URL → Share → "Add to Home Screen".
- **Desktop (Chrome/Edge)**: open the URL → an install icon appears in the address bar → click it.

Installed, it opens in its own window without browser chrome, gets its own icon and app-switcher entry, and keeps working without a connection.

## Updating the app later

Re-upload a new `index.html` (and bump `CACHE_NAME` in `sw.js`, e.g. `v1` → `v2`, so the old cached copy gets cleared out) and push. The service worker is network-first, so anyone online picks up the change on their next load automatically; the version bump just guarantees a clean cache rather than a stale mix of old and new files.

## A few things worth knowing once it's hosted

- **Your data never leaves your browser.** GitHub Pages just serves the static files — the same as any static file host. Everything you type in — holdings, transactions, prices — is saved with `localStorage` and stays local to your own browser/device. Nobody else who finds the URL sees your portfolio.
- **Autosave becomes actually reliable now.** The earlier issue where data vanished was because `localStorage` for a local file is tied to that exact file's path, and every new downloaded copy started fresh. A hosted URL doesn't have that problem — `https://YOUR-USERNAME.github.io/holdings-xirr/` is the same origin every time, from any device, in any browser, indefinitely. Autosave will now survive restarts properly.
- **Different browsers/devices/installs still don't share data.** `localStorage` is per-browser (and an installed PWA counts as its own browser context on some platforms). Chrome on your laptop and the installed app on your phone are separate storage buckets even for the same URL. Keep using **Download backup** / **Restore from file** to move data between them.
- **Google Sheets price refresh works better here too** — it was blocked in this chat's preview sandbox and needed the file opened locally before; from a real hosted URL it just works.

