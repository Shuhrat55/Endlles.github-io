const cacheName = "DefaultCompany-My project (2)-1.0";
const contentToCache = [
    "Build/Test.loader.js",
    "Build/5699b165134e166caa2cbc11bc5cb75e.js.unityweb",
    "Build/d5412161ce65a481f5ee64d6de621d7c.data.unityweb",
    "Build/b6c2555273524f45234da7f06e0050b8.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
