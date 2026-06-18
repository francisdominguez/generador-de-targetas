const CACHE = 'tarjetas-bp-v16';
const ASSETS = [
  '/generador-de-targetas/',
  '/generador-de-targetas/index.html',
  '/generador-de-targetas/style.css',
  '/generador-de-targetas/app.js',
  '/generador-de-targetas/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
