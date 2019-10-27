import { all, takeEvery, put, call, select } from 'redux-saga/effects';
import { takeFirst } from 'utils/takeFirst';
import * as actionTypes from '_redux/actions/actionTypes';
import * as notificationPopoverActions from '_redux/actions/notificationPopover';
import * as loadingActions from '_redux/actions/loading';
import * as notificationPopoverServices from 'services/notificationPopover';
import { delay } from 'utils/utils';

function* fetchNotificationPopovers() {
    yield put(loadingActions.saveLoading('fetchNotificationPopovers', true));
    const response = yield call(notificationPopoverServices.fetch, { page: 1, limit: 12 });
    if (response) {
        const { data: notifications } = response;
        yield delay(700);
        yield put(notificationPopoverActions.saveNotificationPopovers(notifications));
        if (notifications.length < 12)
            yield put(notificationPopoverActions.toggleNotiPopHasmore());
    }
    yield put(loadingActions.saveLoading('fetchNotificationPopovers', false));
}

function* fetchNotificationPopoversWatcher() {
    yield takeEvery(actionTypes.FETCH_NOTIFICATION_POPOVERS, fetchNotificationPopovers);
}

function* fetchOldNotificationPopovers() {
    yield put(loadingActions.saveLoading('fetchOldNotificationPopovers', true));
    const { list: notifications, hasMore } = yield select(state => state.notificationPopover);
    if (hasMore) {
        const response = yield call(notificationPopoverServices.fetch, { page: (notifications.length / 6) + 1, limit: 6 });
        if (response) {
            const { data: oldNotifications } = response;
            yield delay(700);
            yield put(notificationPopoverActions.saveOldNotificationPopovers(oldNotifications));
            if (oldNotifications.length < 6)
                yield put(notificationPopoverActions.toggleNotiPopHasmore());
        }
    }
    yield put(loadingActions.saveLoading('fetchOldNotificationPopovers', false));
}

function* fetchOldNotificationPopoversWatcher() {
    yield takeFirst(actionTypes.FETCH_OLD_NOTIFICATION_POPOVERS, fetchOldNotificationPopovers);
}

export default function* () {
    yield all([
        fetchNotificationPopoversWatcher(),
        fetchOldNotificationPopoversWatcher(),
    ]);
}