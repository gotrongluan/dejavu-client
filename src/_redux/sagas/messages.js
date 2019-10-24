import { all, takeLatest, put, fork, take, cancel } from 'redux-saga/effects';
import { notification } from 'antd';
import * as ActionTypes from '_redux/actions/actionTypes';
import * as MessageActions from '_redux/actions/messages';
import * as LoadingActions from '_redux/actions/loading';
import MESSAGES from 'assets/faker/messages';
import OLDMESSAGES from 'assets/faker/oldMessages';
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
    yield takeLatest(ActionTypes.FETCH_MESSAGES, fetchMessages);
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
    yield takeLatest(ActionTypes.FETCH_CURRENT_USER, fetchCurrentUser);
}

function* fetchOldMessages(action) {
    const task = yield fork(function* ({ payload: converId }) {
        yield put(LoadingActions.saveLoading('fetchOldMessages', true));
        try {
            yield new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (Math.random() > 80.1) return resolve();
                    reject();
                }, 1000);
            });
            console.log(OLDMESSAGES);
            yield put(MessageActions.saveOldMessages(OLDMESSAGES));
            yield put({ type: ActionTypes.FINISH_FETCH_OLD_MESSAGES });
        }
        catch {
            notification.error({
                message: 'Fetch Old Messages Failed',
                description: 'What the fuck are you doing!'
            });
            yield put({ type: ActionTypes.FINISH_FETCH_OLD_MESSAGES });
        }
        finally {
            yield put(LoadingActions.saveLoading('fetchOldMessages', false));
        }
    }, action);
    const { type } = yield take([ActionTypes.FETCH_MESSAGES, ActionTypes.FINISH_FETCH_OLD_MESSAGES]);
    if (type === ActionTypes.FETCH_MESSAGES)
        yield cancel(task);
}

function* fetchOldMessagesWatcher() {
    yield takeLatest(ActionTypes.FETCH_OLD_MESSAGES, fetchOldMessages)
}

export default function* () {
    yield all([
        fetchMessagesWatcher(),
        fetchCurrentUserWatcher(),
        fetchOldMessagesWatcher()
    ]);
}