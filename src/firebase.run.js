import firebase from 'firebase';
import firebaseConfig from 'config/firebase';
import { notification } from 'antd';
import storage from 'utils/storage';
import { send } from 'q';

function sendError(message, description) {
    notification.error({
        message,
        description,
        duration: 0
    });
}

export default async () => {
    //create-project, create-app, connect app to project
    firebase.initializeApp(firebaseConfig);
    
    //get messaging object
    const messaging = firebase.messaging();
    //messaging.usePublicVapidKey('BPbc1IS5A0DUEmeSvEzxItfvzYGpH-71G8gxXHnMjqRdlev17PfMl0gucAH2sp7ZnAsxdFDleJBQB3YutuKktyU');
    //onMessage
    messaging.onMessage(function (payload) {
        alert('dit me may');
    });

    messaging.requestPermission()
        .then(() => messaging.getToken())
        .then(fcmToken => {
            const oldFCMToken  = storage.getFCMToken();
            if (fcmToken !== oldFCMToken) {
                //send to server;
                storage.setFCMToken(fcmToken);
            }
        })
        .catch(err => sendError(err.message, "Error when init firebase"));
}
