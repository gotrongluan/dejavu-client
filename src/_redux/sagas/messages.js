import { all, takeLatest, put, fork, take, cancel, takeEvery, select, call } from 'redux-saga/effects';
import { notification } from 'antd';
import _ from 'lodash';
import * as actionTypes from '_redux/actions/actionTypes';
import * as messageActions from '_redux/actions/messages';
import * as conversationActions from '_redux/actions/conversations';
import * as loadingActions from '_redux/actions/loading';
import * as messageServices from 'services/messages';
import MESSAGES from 'assets/faker/messages';
import OLDMESSAGES from 'assets/faker/oldMessages';
import USER from 'assets/faker/user';

function* fetchMessages({ payload: converId }) {
    yield put(loadingActions.saveLoading('fetchMessages', true));
    try {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > -1) return resolve();
                reject();
            }, 1000);
        });
        yield put(messageActions.saveMessages(MESSAGES));
    }
    catch {
        notification.error({
            message: 'Fetch Messages Failed',
            description: 'What the fuck are you doing!'
        });
    }
    yield put(loadingActions.saveLoading('fetchMessages', false));
}

function* fetchMessagesWatcher() {
    yield takeLatest(actionTypes.FETCH_MESSAGES, fetchMessages);
}

function* fetchCurrentUser({ payload: converId }) {
    yield put(loadingActions.saveLoading('fetchCurrentUser', true));
    try {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > -0.1) return resolve();
                reject();
            }, 1000);
        });
        yield put(messageActions.saveCurrentUser({
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
    yield put(loadingActions.saveLoading('fetchCurrentUser', false));
}

function* fetchCurrentUserWatcher() {
    yield takeLatest(actionTypes.FETCH_CURRENT_USER, fetchCurrentUser);
}

function* fetchOldMessages(action) {
    const task = yield fork(function* ({ payload: converId }) {
        yield put(loadingActions.saveLoading('fetchOldMessages', true));
        try {
            yield new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (Math.random() > 80.1) return resolve();
                    reject();
                }, 1000);
            });
            console.log(OLDMESSAGES);
            yield put(messageActions.saveOldMessages(OLDMESSAGES));
            yield put({ type: actionTypes.FINISH_FETCH_OLD_MESSAGES });
        }
        catch {
            notification.error({
                message: 'Fetch Old Messages Failed',
                description: 'What the fuck are you doing!'
            });
            yield put({ type: actionTypes.FINISH_FETCH_OLD_MESSAGES });
        }
        finally {
            yield put(loadingActions.saveLoading('fetchOldMessages', false));
        }
    }, action);
    const { type } = yield take([actionTypes.FETCH_MESSAGES, actionTypes.FINISH_FETCH_OLD_MESSAGES]);
    if (type === actionTypes.FETCH_MESSAGES)
        yield cancel(task);
}

function* fetchOldMessagesWatcher() {
    yield takeLatest(actionTypes.FETCH_OLD_MESSAGES, fetchOldMessages)
}

function* sendMessage({ payload }) {
    const user = yield select(state => state.global.user);
    const messId = _.uniqueId('sending_message_');
    yield put(messageActions.addSendingMessage({
        _id: messId,
        userName: user && user.name,
        avatar: user && user.avatar,
        conversationId: payload.converId,
        text: payload.message,
        userId: user._id,
        createdAt: Date.now()
    }));
    const response = yield call(messageServices.send, {
        text: payload.message,
        conversationId: payload.converId,
        partnerId: payload.userId,
    });
    if (response) {
        const {
            data: {
                message,
                conversation
            }
        } = response;
        if (!payload.converId) {
            //first
            yield put(conversationActions.deleteFirstConversation());
        }
        yield put(conversationActions.updateOneConversation(conversation));
        yield put(messageActions.deleteSendingMessage(messId));
        yield put(messageActions.addNewMessage(message));
    }
}

function* sendMessageWatcher() {
    yield takeEvery(actionTypes.SEND_MESSAGE, sendMessage);
}

export default function* () {
    yield all([
        fetchMessagesWatcher(),
        fetchCurrentUserWatcher(),
        fetchOldMessagesWatcher(),
        sendMessageWatcher()
    ]);
}