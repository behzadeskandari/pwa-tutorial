const staticChacheName = "site-static";
const assets = [
    '/',
    '/index.html',
    '/about.html',
    '/contact.html',
    '/js/app.js',
    '/js/ui.js',
    '/css/materialize.min.css',
    '/js/materialize.min.js',
    '/css/styles.css',
    'img/dish.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v143/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
]
self.addEventListener('install', function(event) {
    console.log('Service Worker Installed',event);
    event.waitUntil(
        caches.open(staticChacheName).then(function(cache) {
            console.log('chaching shell assets');
            cache.addAll(assets)
        })    
    );
})


self.addEventListener('activate', function(event) {
    console.log('Service Worker Activated',event);
})


self.addEventListener('fetch', function(event) {
    console.log('Service Worker Fetched',event);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request)
        })
    )
})


