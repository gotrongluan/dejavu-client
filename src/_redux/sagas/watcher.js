import React from 'react';
import moment, { duration } from 'moment';
import _ from 'lodash';
import { all, take, fork, put, cancel, call, takeEvery, select } from 'redux-saga/effects';
import NotificationTypes from 'constants/notificationType';
import { notification as notificationPopup, Icon } from 'antd';
import * as actionTypes from '_redux/actions/actionTypes';
import * as watcherActions from '_redux/actions/watcher';
import * as globalActions from '_redux/actions/global';
import * as notificationPopoverActions from '_redux/actions/notificationPopover';
import * as notificationActions from '_redux/actions/notifications';
import * as conversationActions from '_redux/actions/conversations';
import * as messengerPopoverActions from '_redux/actions/messengerPopover';
import { store } from '_redux/store';
import storage from 'utils/storage';
import * as FCM from 'utils/fcm-firebase';
import * as FCMServices from 'services/fcm-firebase';

function* onMessage({ payload: notification }) {
    if (notification.data) {
        //data message
        const notificationContent = JSON.parse(notification.data.payload);
        
        if (notificationContent.type === NotificationTypes.MESSAGE) {
            notificationPopup.open({
                message: `${notificationContent.name} sent to you: "${notificationContent.lastMessage}"`,
                description: `${moment(notificationContent.updatedAt).format("HH:mm")}`,
                placement: "topLeft",
                icon: <Icon type="message" style={{ color: 'yellowgreen' }}/>,
            });
            const { converId, lastMessage, updatedAt, name, avatar } = notificationContent;
            const { list: messengerPopovers } = yield select(state => state.messengerPopover);
            const conver = {
                _id: converId,
                name: name,
                avatar: avatar,
                seen: false,
                updatedAt: updatedAt,
                color: 'default',
                lastMessage: lastMessage,
            };
            if (!_.isEmpty(messengerPopovers)) {
                yield put(messengerPopoverActions.saveNewMessengerPopover(conver));
            }
            const { list: conversations } = yield select(state => state.conversations);
            if (!_.isEmpty(conversations)) {
                yield put(conversationActions.updateOneConversation(conver));
            }
        }
        else {
            notificationPopup.open({
                message: notificationContent.content,
                description: `${moment(notificationContent.createdAt).format("HH:mm")}`,
                placement: "topLeft",
                icon: <Icon type="bell"  style={{ color: 'yellowgreen' }}/>
            });
            yield put(globalActions.saveNumOfUnreadNoti(notificationContent.numOfUnread));
            const { list: notificationPopovers } = yield select(state => state.notificationPopover);
            if (notificationPopovers && notificationPopovers.length > 0) {
                yield put(notificationPopoverActions.saveNewNotificationPopover(notificationContent));
            }
            const { list: notifications } = yield select(state => state.notifications);
            if (notifications && notifications.length > 0) {
                yield put(notificationActions.saveNewNotification(notificationContent));
            }
        }
    }
    else {
        const notificationTitle = notification.notification.title;
        const notificationBody = notification.notification.body;
        notificationPopup.open({
            message: notificationTitle,
            description: notificationBody,
            placement: "topLeft",
            icon: <Icon type="bell"  style={{ color: 'yellowgreen' }}/>
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