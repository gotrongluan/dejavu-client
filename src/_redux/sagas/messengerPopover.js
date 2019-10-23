import { all, takeEvery, put } from 'redux-saga/effects';
import { takeFirst } from 'utils/takeFirst';
import _ from 'lodash';
import { notification } from 'antd';
import * as ActionTypes from '_redux/actions/actionTypes';
import * as MessengerPopoverActions from '_redux/actions/messengerPopover';
import * as LoadingActions from '_redux/actions/loading';
import MESSENGER_POPOVERS from 'assets/faker/messengerPopover';

function* fetchMessengerPopovers() {
    yield put(LoadingActions.saveLoading('fetchMessengerPopovers', true));
    try {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > -1) return resolve();
                reject();
            }, 2000);
        });
        const data = MESSENGER_POPOVERS;
        yield put(MessengerPopoverActions.saveMessengerPopovers(data));
    }
    catch {
        notification.error({
            message: 'Fetch messengerPopovers failed',
            description: 'What the fuck are you doing. Please check again!'
        });
    }
    yield put(LoadingActions.saveLoading('fetchMessengerPopovers', false));
}

function* fetchMessengerPopoversWatcher() {
    yield takeEvery(ActionTypes.FETCH_MESSENGER_POPOVERS, fetchMessengerPopovers);
}

function* fetchOldMessengerPopovers() {
    yield put(LoadingActions.saveLoading('fetchOldMessengerPopovers', true));
    try {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > -1) return resolve();
                reject();
            }, 700);
        });
        let newData = {};
        newData[_.uniqueId("abc_")] = { ...MESSENGER_POPOVERS['conver_id_1'] };
        newData[_.uniqueId("abc_")] = { ...MESSENGER_POPOVERS['conver_id_2'] };
        newData[_.uniqueId("abc_")] = { ...MESSENGER_POPOVERS['conver_id_3'] };
        newData[_.uniqueId("abc_")] = { ...MESSENGER_POPOVERS['conver_id_4'] };
        newData[_.uniqueId("abc_")] = { ...MESSENGER_POPOVERS['conver_id_5'] };
        yield put(MessengerPopoverActions.saveOldMessengerPopovers(newData));
    }
    catch {
        notification.error({
            message: 'Fetch old messengerPopovers failed',
            description: 'What the fuck are you doing. Please check again!'
        });
    }
    yield put(LoadingActions.saveLoading('fetchOldMessengerPopovers', false));
}

function* fetchOldMessengerPopoversWatcher() {
    yield takeFirst(ActionTypes.FETCH_OLD_MESSENGER_POPOVERS, fetchOldMessengerPopovers);
}

export default function* () {
    yield all([
        fetchMessengerPopoversWatcher(),
        fetchOldMessengerPopoversWatcher(),
    ]);
}