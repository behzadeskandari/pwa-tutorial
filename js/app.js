if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
         console.log("Service Worker Registered",reg)
    }).catch(error => {
        console.log("Service Worker Error");
        console.log(error.message);
    });
}