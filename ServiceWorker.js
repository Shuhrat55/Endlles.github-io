const cacheName = "DefaultCompany-Test-1.0";
const contentToCache = [
    "Build/Tests.loader.js",
    "Build/f7d950b12b3f6de41da7f8f245357186.js.unityweb",
    "Build/af584c4d46ab8e6a6647c66c2853a4c4.data.unityweb",
    "Build/12daea3527c81bcc6eb3aece2944a2e4.wasm.unityweb",
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
