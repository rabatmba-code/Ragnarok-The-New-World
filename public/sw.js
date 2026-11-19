const CACHE_NAME = 'ragnarok-tnw-static-v1';

const PRECACHE_ASSETS = [
  '/assets/official_chibi_logo.png',
  '/assets/aistudio/image_2f98b010.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // Never intercept byte-range requests (streaming video/audio)
  if (request.headers.has('range')) return;

  const url = new URL(request.url);

  // Never cache Google verification file or Vite dev internals
  if (
    url.pathname === '/googlef4b4f26b1fe204c0.html' ||
    url.pathname.startsWith('/@') ||
    url.pathname.startsWith('/src/') ||
    url.pathname.startsWith('/node_modules/')
  ) {
    return;
  }

  // Same-origin static assets (JS, CSS, images, fonts): Cache-First with background refresh
  const isSameOriginStatic =
    url.origin === self.location.origin &&
    (url.pathname.startsWith('/assets/') ||
      /\.(?:png|jpe?g|webp|svg|ico|woff2?|css|js)$/i.test(url.pathname));

  // Google Fonts stylesheets & font files: Cache-First
  const isGoogleFont =
    url.origin === 'https://fonts.googleapis.com' ||
    url.origin === 'https://fonts.gstatic.com';

  if (isSameOriginStatic || isGoogleFont) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then((cached) => {
          const networkFetch = fetch(request)
            .then((response) => {
              if (response && (response.status === 200 || response.type === 'opaque')) {
                cache.put(request, response.clone()).catch(() => {});
              }
              return response;
            })
            .catch(() => cached);

          return cached || networkFetch;
        })
      )
    );
    return;
  }

  // Navigation requests (HTML shell): Network-First with cache fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(request, copy))
              .catch(() => {});
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
  }
});
