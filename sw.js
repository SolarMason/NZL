/* NZL service worker — minimal, correct, no surprises. */
const VERSION = 'nzl-v1';
const SHELL = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/nzl-mark.svg',
  '/favicon.ico',
  '/favicon-16.png',
  '/favicon-32.png',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
  '/og-card.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Only handle same-origin
  if (url.origin !== self.location.origin) return;

  // Network-first for HTML so fresh content always wins when online
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((cache) => cache.put(request, copy));
          return res;
        })
        .catch(() => caches.match(request).then((r) => r || caches.match('/')))
    );
    return;
  }

  // Cache-first for static assets
  event.respondWith(
    caches.match(request).then((cached) => {
      return cached || fetch(request).then((res) => {
        const copy = res.clone();
        caches.open(VERSION).then((cache) => cache.put(request, copy));
        return res;
      });
    })
  );
});
