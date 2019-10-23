import { all, takeEvery, put } from 'redux-saga/effects';
import { takeFirst } from 'utils/takeFirst';
import { notification } from 'antd';
import * as ActionTypes from '_redux/actions/actionTypes';
import * as NotificationPopoverActions from '_redux/actions/notificationPopover';
import * as LoadingActions from '_redux/actions/loading';
import NOTIFICATION_POPOVERS from 'assets/faker/notificationPopover';

function* fetchNotificationPopovers() {
    yield put(LoadingActions.saveLoading('fetchNotificationPopovers', true));
    try {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > -1) return resolve();
                reject();
            }, 2000);
        });
        const data = NOTIFICATION_POPOVERS.slice(0, 8);
        yield put(NotificationPopoverActions.saveNotificationPopovers(data));
    }
    catch {
        notification.error({
            message: 'Fetch notificationPopovers failed',
            description: 'What the fuck are you doing. Please check again!'
        });
    }
    yield put(LoadingActions.saveLoading('fetchNotificationPopovers', false));
}

function* fetchNotificationPopoversWatcher() {
    yield takeEvery(ActionTypes.FETCH_NOTIFICATION_POPOVERS, fetchNotificationPopovers);
}

function* fetchOldNotificationPopovers() {
    yield put(LoadingActions.saveLoading('fetchOldNotificationPopovers', true));
    try {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > -1) return resolve();
                reject();
            }, 1000);
        });
        const data = NOTIFICATION_POPOVERS.slice(0, 4);
        yield put(NotificationPopoverActions.saveOldNotificationPopovers(data));
    }
    catch {
        notification.error({
            message: 'Fetch old notificationPopovers failed',
            description: 'What the fuck are you doing. Please check again!'
        });
    }
    yield put(LoadingActions.saveLoading('fetchOldNotificationPopovers', false));
}

function* fetchOldNotificationPopoversWatcher() {
    yield takeFirst(ActionTypes.FETCH_OLD_NOTIFICATION_POPOVERS, fetchOldNotificationPopovers);
}

export default function* () {
    yield all([
        fetchNotificationPopoversWatcher(),
        fetchOldNotificationPopoversWatcher(),
    ]);
}