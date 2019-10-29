import React from 'react';
import moment from 'moment';
import { all, take, fork, put, cancel, call, takeEvery, select } from 'redux-saga/effects';
import NotificationTypes from 'constants/notificationType';
import { notification as notificationPopup, Avatar } from 'antd';
import * as actionTypes from '_redux/actions/actionTypes';
import * as watcherActions from '_redux/actions/watcher';
import * as globalActions from '_redux/actions/global';
import * as notificationPopoverActions from '_redux/actions/notificationPopover';
import { store } from '_redux/store';
import storage from 'utils/storage';
import * as FCM from 'utils/fcm-firebase';
import * as FCMServices from 'services/fcm-firebase';

function* onMessage({ payload: notification }) {
    if (notification.data) {
        //data message
        const notificationContent = JSON.parse(notification.data.payload);
        notificationPopup.info({
            message: notificationContent.content,
            description: `${moment(notificationContent.createdAt).format("HH:mm")}`,
            placement: "bottomRight"
        });
        if (notificationContent.type === NotificationTypes.MESSAGE) {

        }
        else {
            yield put(globalActions.saveNumOfUnreadNoti(notificationContent.numOfUnread));
            const { list: notifications } = yield select(state => state.notificationPopover);
            if (notifications && notifications.length > 0) {
                yield put(notificationPopoverActions.saveNewNotificationPopover(notificationContent));
            }
        }
    }
    else {
        const notificationTitle = notification.notification.title;
        const notificationBody = notification.notification.body;
        notificationPopup.info({
            message: notificationTitle,
            description: notificationBody,
            placement: "bottomRight"
        });
    }
}

function* onMessageWatcher() {
    yield takeEvery(actionTypes.ON_MESSAGE, onMessage);
}

function* onTokenRefresh({ payload: refreshedToken }) {
    if (refreshedToken) {
        const curFCMToken = storage.getFCMToken();
        if (refreshedToken !== curFCMToken) {
            storage.setFCMToken(refreshedToken);
            yield call(FCMServices.sendFCMToken, refreshedToken);
        }
    }
}

function* onTokenRefreshWatcher() {
    yield takeEvery(actionTypes.ON_TOKEN_REFRESH, onTokenRefresh);
}

function* fcmRegister() {
    const { dispatch } = store;
    const fcmToken = yield call(
        FCM.register,
        payload => {
            //onMessage
            dispatch(watcherActions.onMessage(payload))
            //dispatch()
        },
        refreshedToken => {
            dispatch(watcherActions.onMessage(refreshedToken))
        }
    );
    if (fcmToken) {
        const oldFCMToken = storage.getFCMToken();
        if (fcmToken !== oldFCMToken) {
            storage.setFCMToken(fcmToken);
            yield call(FCMServices.sendFCMToken, fcmToken);
        }
    }
}

function* authorizedWatcher() {
    while (yield take(actionTypes.AUTHORIZED)) {
        console.log('HELLO');
        const fcmTask = yield fork(fcmRegister);
        yield take(actionTypes.LOGOUT);
        yield cancel(fcmTask);
        FCM.unregister();
        storage.setFCMToken();
    }
}

export default function* () {
    yield all([
        authorizedWatcher(),
        onMessageWatcher(),
        onTokenRefreshWatcher()
    ])
}