import { all, takeEvery, put, call, select } from 'redux-saga/effects';
import { takeFirst } from 'utils/takeFirst';
import _ from 'lodash';
import * as actionTypes from '_redux/actions/actionTypes';
import * as messengerPopoverActions from '_redux/actions/messengerPopover';
import * as loadingActions from '_redux/actions/loading';
import * as messengerPopoverServices from 'services/messengerPopover';

function* fetchMessengerPopovers() {
    yield put(loadingActions.saveLoading('fetchMessengerPopovers', true));
    const response = yield call(messengerPopoverServices.fetch, { page: 1, limit: 12 });
    if (response) {
        let { data: conversations } = response;
        conversations = _.keyBy(conversations, conver => conver._id);
        yield put(messengerPopoverActions.saveMessengerPopovers(conversations));
        if (conversations.length < 12)
            yield put(messengerPopoverActions.toggleMessPopHasmore());
    }
    yield put(loadingActions.saveLoading('fetchMessengerPopovers', false));
}

function* fetchMessengerPopoversWatcher() {
    yield takeEvery(actionTypes.FETCH_MESSENGER_POPOVERS, fetchMessengerPopovers);
}

function* fetchOldMessengerPopovers() {
    yield put(loadingActions.saveLoading('fetchOldMessengerPopovers', true));
    const { list: conversations, hasMore } = yield select(state => state.conversations);
    if (hasMore) {
        const response = yield call(messengerPopoverServices.fetch, { page: (conversations.length / 6) + 1, limit: 6 });
        if (response) {
            let { data: oldConversations } = response;
            oldConversations = _.keyBy(oldConversations, conver => conver._id);
            yield put(messengerPopoverActions.saveOldMessengerPopovers(oldConversations));
            if (oldConversations.length < 6)
                yield put(messengerPopoverActions.toggleMessPopHasmore());
        }
    }
    yield put(loadingActions.saveLoading('fetchOldMessengerPopovers', false));
}

function* fetchOldMessengerPopoversWatcher() {
    yield takeFirst(actionTypes.FETCH_OLD_MESSENGER_POPOVERS, fetchOldMessengerPopovers);
}

export default function* () {
    yield all([
        fetchMessengerPopoversWatcher(),
        fetchOldMessengerPopoversWatcher(),
    ]);
}