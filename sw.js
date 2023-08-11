
var cacheName = 'main-cache';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(
        [
          '/',
          'auth.js',
          'api.js',
          'style.css',
          'favicon.png',
          'google.png',
          'screenshot.PNG',
          'placeholder.jpg'
        ]
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});