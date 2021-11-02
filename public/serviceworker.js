const CACHE_NAME = 'version1'
const urlsToCache = [ 'index.html', 'offline.html' ];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
          console.log('Opened cache');

          return cache.addAll(urlsToCache);
      })
  )
});
// Fetch SW
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(async () => {
        try {
          return fetch(event.request);
        } catch (e) {
          return await caches.match('offline.html');
        }
      })
  )
});
// Activate SW
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);
  
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if(!cacheWhitelist.includes(cacheName)) {
          return caches.delete(cacheName);
        }
      })
    ))
  );


});

