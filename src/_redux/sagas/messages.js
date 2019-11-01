import { all, takeLatest, put, fork, take, cancel, takeEvery, select, call } from 'redux-saga/effects';
import { takeFirst } from 'utils/takeFirst';
import { findLimit } from 'utils/utils';
import _ from 'lodash';
import * as actionTypes from '_redux/actions/actionTypes';
import * as messageActions from '_redux/actions/messages';
import * as conversationActions from '_redux/actions/conversations';
import * as loadingActions from '_redux/actions/loading';
import * as messageServices from 'services/messages';
import * as conversationServices from 'services/conversations';

function* fetchMessages({ payload: converId }) {
    yield put(loadingActions.saveLoading('fetchMessages', true));
    const response = yield call(messageServices.fetch, { converId, page: 1, limit: 24 });
    if (response) {
        const { data: messages } = response;
        yield put(messageActions.saveMessages(_.reverse(messages)));
        yield put(conversationActions.updateSeenStatus(converId, true));
    }
    yield put(loadingActions.saveLoading('fetchMessages', false));
}

function* fetchMessagesWatcher() {
    yield takeLatest(actionTypes.FETCH_MESSAGES, fetchMessages);
}

function* fetchCurrentUser({ payload: converId }) {
    yield put(loadingActions.saveLoading('fetchCurrentUser', true));
    const response = yield call(conversationServices.fetchUser, converId);
    if (response) {
        const { data: user } = response;
        yield put(messageActions.saveCurrentUser({
            ...user,
            converId
        }));
    }
    yield put(loadingActions.saveLoading('fetchCurrentUser', false));
}

function* fetchCurrentUserWatcher() {
    yield takeLatest(actionTypes.FETCH_CURRENT_USER, fetchCurrentUser);
}

function* fetchOldMessages(action) {
    const task = yield fork(function* ({ payload: converId }) {
        yield put(loadingActions.saveLoading('fetchOldMessages', true));
        const { sending, old, new: newMessages } = yield select(state => state.messages);
        const messages = _.concat(sending, newMessages, old);
        const limit = findLimit(messages, 12);
        const response = yield call(messageServices.fetch, { converId, page: (messages.length / limit) + 1, limit });
        if (response) {
            const oldMessages = response.data;
            yield put(messageActions.saveOldMessages(_.reverse(oldMessages)));
            yield put({ type: actionTypes.FINISH_FETCH_OLD_MESSAGES });
        }
    }, action);
    const { type } = yield take([actionTypes.FETCH_MESSAGES, actionTypes.FINISH_FETCH_OLD_MESSAGES]);
    if (type === actionTypes.FETCH_MESSAGES)
        yield cancel(task);
    yield put(loadingActions.saveLoading('fetchOldMessages', false));
}

function* fetchOldMessagesWatcher() {
    yield takeFirst(actionTypes.FETCH_OLD_MESSAGES, fetchOldMessages)
}

function* sendMessage({ payload }) {
    const user = yield select(state => state.global.user);
    const messId = _.uniqueId('sending_message_');
    yield put(messageActions.addSendingMessage({
        _id: messId,
        userName: user && user.name,
        avatar: user && user.avatar,
        conversationId: payload.converId,
        content: payload.message,
        userId: user._id,
        seenAt: -1,
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
            if (payload.cb) payload.cb(conversation._id);
            yield put(messageActions.updateConverId(conversation._id));
            yield put(conversationActions.deleteFirstConversation());
        }
        yield put(conversationActions.updateOneConversation({
            ...conversation,
            seen: true,
        }));
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