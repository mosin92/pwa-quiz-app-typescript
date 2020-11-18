console.log("yes it is registered Pwa");
let cacheData = "appV1"
this.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open('airhorner').then(function(cache) {
        return cache.addAll([
            '/',
            '/static/js/main.chunk.js',
            '/static/js/0.chunk.js',
            '/static/js/bundle.js',
            '/index.tsx',
            '/App.tsx',
            '/Api.tsx',
            '/QuestionCard.tsx',
          '/QuestionCard.style.ts',
          '/ArrayShuffle.ts'
        ]);
      })
    );
});
this.addEventListener('fetch', function(event) {
    console.log(event.request.url);
   
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
   });
// this.addEventListener("install", (event) => {
//     event.waitUntil(
//         caches.open(cacheData).then((cache) => {
//             cache.addAll([
//                 '/static/js/main.chunk.js',
//                 '/static/js/0.chunk.js',
//                 '/static/js/bundle.js',
//                 '/QuestionCard.tsx',
//                 '/Api.tsx',
//                 '/App.tsx',
//                 '/ArrayShuffle.ts' ,
//                 '/'
//             ])
//         })
//     )
// })

// this.addEventListener("fetch", (event) => {
//     event.respondWith(
//         caches.match(event.request).then((resp) => {
//             if (resp) {
//                 return resp;
//             }
//         })
//     )
// })