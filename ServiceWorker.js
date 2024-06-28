const cacheName = "DefaultCompany-My project (2)-1.0";
const contentToCache = [
    "Build/Test.loader.js",
    "Build/2e8f478037b488cbb95ac54f2def93ea.js.unityweb",
    "Build/826df6df1fe3ccfa9fa81398cda00b3a.data.unityweb",
    "Build/dd58d3db7563685f5091ba66c646ee25.wasm.unityweb",
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
