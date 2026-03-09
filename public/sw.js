const CACHE_NAME = "passgen-cache-v1";

// Install event - skip waiting to activate immediately
self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

// Activate event - claim clients immediately
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Fetch event - Dynamic caching
self.addEventListener("fetch", (event) => {
  // Only cache GET requests and HTTP/HTTPS
  if (event.request.method !== "GET" || !event.request.url.startsWith("http")) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached version if found
      if (cachedResponse) {
        return cachedResponse;
      }

      // Otherwise fetch from network and cache the response
      return fetch(event.request)
        .then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {});
    }),
  );
});
