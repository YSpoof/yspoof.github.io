const swConfig = {
  cacheName: "cache",
  log: true,
};

// Event Handlers

self.addEventListener("install", (event) => {
  event.waitUntil(async () => {
    await cachePagesOnInstall();
  });
  self.skipWaiting();
  swConfig.log && console.log("Service Worker installed");
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.registration?.navigationPreload.enable());
  swConfig.log && console.log("Service Worker activated");
});

self.addEventListener("fetch", (event) => {
  event.respondWith(staleRevalidate(event));
});

// Functions

async function cachePagesOnInstall() {
  const cache = await caches.open(swConfig.cacheName);
  const pages = await fetch("/toCache.json").then((r) => r.json());
  await cache.addAll(pages);
}

async function staleRevalidate(event) {
  const request = event.request;
  const cache = await caches.open(swConfig.cacheName);

  const cachedResponse = await cache.match(request);
  const preloadResponse = await event.preloadResponse;

  const fetchPromise = navigator.onLine
    ? (preloadResponse ? Promise.resolve(preloadResponse) : fetch(request))
        .then(async (networkResponse) => {
          // Only cache the network response if it's OK.
          if (networkResponse && networkResponse.ok) {
            await cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        })
        .catch(
          () =>
            new Response("Something went wrong", {
              status: 408,
              headers: { "Content-Type": "text/plain" },
            })
        )
    : new Response("You are offline", {
        status: 418,
        headers: { "Content-Type": "text/plain" },
      });

  // If there is a preloadResponse and it's OK, cache it.
  if (preloadResponse && preloadResponse.ok) {
    await cache.put(request, preloadResponse.clone());
  }

  return cachedResponse || fetchPromise;
}
