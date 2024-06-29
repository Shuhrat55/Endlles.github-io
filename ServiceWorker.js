const cacheName = "DefaultCompany-My project (2)-1.0";
const contentToCache = [
    "Build/Test.loader.js",
    "Build/2a54fcf37ad99e2f0abe83e3092af456.js.unityweb",
    "Build/17f3883f2805f034bc33fec8c9d6f360.data.unityweb",
    "Build/accb6f5390d45e82a092bebd5bc622a2.wasm.unityweb",
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
