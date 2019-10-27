import { all, takeEvery, put, call, select } from 'redux-saga/effects';
import { takeFirst } from 'utils/takeFirst';
import * as actionTypes from '_redux/actions/actionTypes';
import * as notificationActions from '_redux/actions/notifications';
import * as globalActions from '_redux/actions/global';
import * as loadingActions from '_redux/actions/loading';
import * as notificationServices from 'services/notifications';
import { delay } from 'utils/utils';

function* fetchNotifications() {
    yield put(loadingActions.saveLoading('fetchNotifications', true));
    const response = yield call(notificationServices.fetch, { page: 1, limit: 12 });
    if (response) {
        const { data: notifications } = response;
        yield delay(700);
        yield put(notificationActions.saveNotifications(notifications));
        if (notifications.length < 12)
            yield put(notificationActions.toggleNotiHasmore());
    }
    yield put(loadingActions.saveLoading('fetchNotifications', false));
}

function* fetchNotificationsWatcher() {
    yield takeEvery(actionTypes.FETCH_NOTIFICATIONS, fetchNotifications);
}

function* fetchOldNotifications() {
    yield put(loadingActions.saveLoading('fetchOldNotifications', true));
    const { list: notifications, hasMore } = yield select(state => state.notifications);
    if (hasMore) {
        const response = yield call(notificationServices.fetch, { page: (notifications.length / 6) + 1, limit: 6 });
        if (response) {
            const { data: oldNotifications } = response;
            yield delay(700);
            yield put(notificationActions.saveOldNotifications(oldNotifications));
            if (oldNotifications.length < 6)
                yield put(notificationActions.toggleNotiHasmore());
        }
    }
    yield put(loadingActions.saveLoading('fetchOldNotifications', false));
}

function* fetchOldNotificationsWatcher() {
    yield takeFirst(actionTypes.FETCH_OLD_NOTIFICATIONS, fetchOldNotifications);
}

function* readNoti({ payload: id }) {
    const response = yield call(notificationServices.read, id);
    if (response) {
        const { data: unread } = response;
        yield put(globalActions.saveNumOfUnreadNoti(unread));
    }
}

function* readNotiWatcher() {
    yield takeEvery(actionTypes.READ_NOTIFICATIONS, readNoti);
}

export default function* () {
    yield all([
        fetchNotificationsWatcher(),
        fetchOldNotificationsWatcher(),
        readNotiWatcher()
    ]);
}