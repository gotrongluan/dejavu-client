import { all, call, takeEvery, put, select } from 'redux-saga/effects';
import { takeFirst } from 'utils/takeFirst';
import { findLimit } from 'utils/utils';
import _ from 'lodash';
import * as actionTypes from '_redux/actions/actionTypes';
import * as conversationActions from '_redux/actions/conversations';
import * as messageActions from '_redux/actions/messages';
import * as loadingActions from '_redux/actions/loading';
import * as conversationServices from 'services/conversations';
import { history } from 'utils/history';

function* fetchConversations() {
    yield put(loadingActions.saveLoading('fetchConversations', true));
    const response = yield call(conversationServices.fetch, { page: 1, limit: 12 });
    if (response) {
        let { data: conversations } = response;
        if (conversations.length < 12)
            yield put(conversationActions.toggleConversHasmore());
        conversations = _.keyBy(conversations, conver => conver._id);
        yield put(conversationActions.saveConversations(conversations));
    }
    yield put(loadingActions.saveLoading('fetchConversations', false));
}

function* fetchConversationsWatcher() {
    yield takeEvery(actionTypes.FETCH_CONVERSATIONS, fetchConversations);
}

function* fetchOldConversations() {
    yield put(loadingActions.saveLoading('fetchOldConversations', true));
    const { list: conversations, hasMore } = yield select(state => state.conversations);
    if (hasMore) {
        const numConvers = Object.keys(conversations).length;
        const limit = findLimit(numConvers, 6, true);
        const response = yield call(conversationServices.fetch, { page: (numConvers / limit) + 1, limit: limit });
        if (response) {
            let { data: oldConversations } = response;
            if (oldConversations.length < limit)
                yield put(conversationActions.toggleConversHasmore());
            oldConversations = _.keyBy(oldConversations, conver => conver._id);
            yield put(conversationActions.saveOldConversations(oldConversations));
            
        }
    }
    yield put(loadingActions.saveLoading('fetchOldConversations', false));
}

function* fetchOldConversationsWatcher() {
    yield takeFirst(actionTypes.FETCH_OLD_CONVERSATIONS, fetchOldConversations);
}

function* startConversation({ payload }) {
    yield put(loadingActions.saveLoading('startConversation', true));
    const { id, avatar, name, online } = payload;
    const response = yield call(conversationServices.checkConversation, id);
    if (response) {
        const { data: already } = response;
        if (already) history.push('/messenger');
        else {
            const converId = _.uniqueId('new_conver_')
            yield put(conversationActions.saveFirstConversation({
                _id: converId,
                name: name,
                avatar: avatar,
                color: 'default',
                updatedAt: Date.now(),
                lastMessage: '',
                seen: false,
            }));
            yield put(messageActions.saveCurrentUser({
                _id: id,
                converId,
                name, avatar, online
            }));
            history.push('/messenger');
        }
    }
    yield put(loadingActions.saveLoading('startConversation', false));
}

function* startConversationWatcher() {
    yield takeEvery(actionTypes.START_CONVERSATION, startConversation);
}

export default function* () {
    yield all([
        fetchConversationsWatcher(),
        fetchOldConversationsWatcher(),
        startConversationWatcher()
    ]);
}