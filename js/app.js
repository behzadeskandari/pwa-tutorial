if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
         console.log("Service Worker Registered",reg)
            // Subscribe user to push
        reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array('<VAPID_PUBLIC_KEY>')
        }).then(subscription => {
            console.log('Push subscription:', subscription);
            // Send subscription to your backend
            fetch('/api/notifications/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subscription)
            });
        });
    }).catch(error => {
        console.log("Service Worker Error");
        console.log(error.message);
    });
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
}
