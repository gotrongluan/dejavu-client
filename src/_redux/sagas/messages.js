import { all, takeEvery, put } from 'redux-saga/effects';
import { notification } from 'antd';
import * as ActionTypes from '_redux/actions/actionTypes';
import * as MessageActions from '_redux/actions/messages';
import * as LoadingActions from '_redux/actions/loading';
import MESSAGES from 'assets/faker/messages';
import USER from 'assets/faker/user';

function* fetchMessages({ payload: converId }) {
    yield put(LoadingActions.saveLoading('fetchMessages', true));
    try {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > -1) return resolve();
                reject();
            }, 1000);
        });
        yield put(MessageActions.saveMessages(MESSAGES));
    }
    catch {
        notification.error({
            message: 'Fetch Messages Failed',
            description: 'What the fuck are you doing!'
        });
    }
    yield put(LoadingActions.saveLoading('fetchMessages', false));
}

function* fetchMessagesWatcher() {
    yield takeEvery(ActionTypes.FETCH_MESSAGES, fetchMessages);
}

function* fetchCurrentUser({ payload: converId }) {
    yield put(LoadingActions.saveLoading('fetchCurrentUser', true));
    try {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > -0.1) return resolve();
                reject();
            }, 1000);
        });
        console.log(converId);
        yield put(MessageActions.saveCurrentUser({
            ...USER,
            converId: converId
        }));
    }
    catch {
        notification.error({
            message: 'Fetch CurrentUser Failed',
            description: 'What the fuck are you doing!'
        });
    }
    yield put(LoadingActions.saveLoading('fetchCurrentUser', false));
}

function* fetchCurrentUserWatcher() {
    yield takeEvery(ActionTypes.FETCH_CURRENT_USER, fetchCurrentUser);
}

export default function* () {
    yield all([
        fetchMessagesWatcher(),
        fetchCurrentUserWatcher()
    ]);
}