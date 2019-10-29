import firebase from 'firebase';
import firebaseConfig from 'config/firebase';
import { notification } from 'antd';

let curFCMToken;
let serviceWorkerRegistration;

const launchError = (message, description) => {
    notification.error({
        message,
        description
    });
};

export const register = (onMessageCallback, onTokenRefreshCallback) => {
    if ('serviceWorker' in navigator) {
        return navigator.serviceWorker
            .register('/firebase-messaging-sw.js')
            .then((registration) => {
                serviceWorkerRegistration = registration;
                let messaging;
                if (!firebase.apps.length) {
                    firebase.initializeApp(firebaseConfig);
                    messaging = firebase.messaging();
                    messaging.onTokenRefresh(() => {
                        messaging.getToken()
                            .then(fcmToken => {
                                curFCMToken = fcmToken;
                                onTokenRefreshCallback(fcmToken);
                            })
                            .catch(err => launchError('Refresh token error', err.message));
                    });
                    messaging.onMessage(payload => onMessageCallback(payload));
                }
                messaging = firebase.messaging();
                return messaging.requestPermission()
                    .then(() => messaging.getToken())
                    .then(fcmToken => {
                        curFCMToken = fcmToken;
                        return fcmToken;
                    })
                    .catch(err => launchError('FCM failed', err.message));
            })
            .catch((err) => launchError('Service worker registration failed', err.message));
    }
};

export const unregister = () => {
    if(serviceWorkerRegistration) serviceWorkerRegistration.unregister();
    if (curFCMToken) {
        firebase.messaging().deleteToken(curFCMToken);
        curFCMToken = null;
    }
};