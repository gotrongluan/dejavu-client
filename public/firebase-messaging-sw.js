'use strict';
importScripts('https://www.gstatic.com/firebasejs/7.2.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.2.2/firebase-messaging.js');

const config = {
    messagingSenderId: "5357324248"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };
  
    return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function(event) {
    console.log('abc');
    const clickedNotification = event.notification;
    clickedNotification.close();
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
         })
        .then(windowClients => {
            let matchingClient = null;
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                if (windowClient.url === feClickAction) {
                    matchingClient = windowClient;
                    break;
                }
            }
            if (matchingClient) {
                return matchingClient.focus();
            } else {
                return clients.openWindow(feClickAction);
            }
        });
        event.waitUntil(promiseChain);
 });