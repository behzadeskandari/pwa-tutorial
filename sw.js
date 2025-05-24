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
    event.waitUntil(
        caches.keys().then(keys => {
            console.log('keys',keys);
            return Promise.all(keys
                .filter(key => key !== staticChacheName)
                .map(key => caches.delete(key))
            )
        })
    )
})


self.addEventListener('fetch', function(event) {
    console.log('Service Worker Fetched',event);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request)
        })
    )
})


self.addEventListener('push', function(event) {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: 'img/dish.png',
        badge: 'img/dish.png'
    };
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});