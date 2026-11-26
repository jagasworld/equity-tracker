// WealthLedger service worker — static assets only.
// Never intercept or cache API requests, Google Drive responses, OAuth requests,
// Angel One Worker responses, or any request carrying an Authorization header.
const CACHE_NAME = 'wealthledger-v54-xirr-allocation-fix';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  './icon-180-apple.png',
  './wealthledger-growth.gif',
  './wealthledger-live.gif'
];

const STATIC_PATHS = new Set(
  ASSETS.map((asset) => new URL(asset, self.registration.scope).pathname)
);

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith('wealthledger-') && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Cache only known same-origin static files. All cross-origin and dynamic/API
// requests pass straight through to the browser's normal network handling.
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.headers.has('Authorization')) return;
  if (!STATIC_PATHS.has(url.pathname)) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      const response = await fetch(request);
      if (response && response.ok && response.type !== 'opaque') {
        await cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      const cached = await cache.match(request);
      if (cached) return cached;

      if (request.mode === 'navigate') {
        const appShell = await cache.match(new URL('./index.html', self.registration.scope).href);
        if (appShell) return appShell;
      }
      return Response.error();
    }
  })());
});
