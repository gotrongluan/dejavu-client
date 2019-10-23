import { all, takeEvery, put } from 'redux-saga/effects';
import { takeFirst } from 'utils/takeFirst';
import { notification } from 'antd';
import * as ActionTypes from '_redux/actions/actionTypes';
import * as NotificationActions from '_redux/actions/notifications';
import * as LoadingActions from '_redux/actions/loading';
import NOTIFICATIONS from 'assets/faker/notifications';

function* fetchNotifications() {
    yield put(LoadingActions.saveLoading('fetchNotifications', true));
    try {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > -1) return resolve();
                reject();
            }, 2000);
        });
        const data = NOTIFICATIONS.slice(0, 15);
        yield put(NotificationActions.saveNotifications(data));
    }
    catch {
        notification.error({
            message: 'Fetch notifications failed',
            description: 'What the fuck are you doing. Please check again!'
        });
    }
    yield put(LoadingActions.saveLoading('fetchNotifications', false));
}

function* fetchNotificationsWatcher() {
    yield takeEvery(ActionTypes.FETCH_NOTIFICATIONS, fetchNotifications);
}

function* fetchOldNotifications() {
    yield put(LoadingActions.saveLoading('fetchOldNotifications', true));
    try {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > -1) return resolve();
                reject();
            }, 1000);
        });
        const data = NOTIFICATIONS.slice(0, 6);
        yield put(NotificationActions.saveOldNotifications(data));
    }
    catch {
        notification.error({
            message: 'Fetch old notifications failed',
            description: 'What the fuck are you doing. Please check again!'
        });
    }
    yield put(LoadingActions.saveLoading('fetchOldNotifications', false));
}

function* fetchOldNotificationsWatcher() {
    yield takeFirst(ActionTypes.FETCH_OLD_NOTIFICATIONS, fetchOldNotifications);
}

export default function* () {
    yield all([
        fetchNotificationsWatcher(),
        fetchOldNotificationsWatcher(),
    ]);
}