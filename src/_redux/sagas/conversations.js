import { all, takeEvery, put } from 'redux-saga/effects';
import { takeFirst } from 'utils/takeFirst';
import _ from 'lodash';
import { notification } from 'antd';
import * as ActionTypes from '_redux/actions/actionTypes';
import * as ConversationActions from '_redux/actions/conversations';
import * as LoadingActions from '_redux/actions/loading';
import CONVERSATIONS from 'assets/faker/conversations';

function* fetchConversations() {
    yield put(LoadingActions.saveLoading('fetchConversations', true));
    try {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > -1) return resolve();
                reject();
            }, 2000);
        });
        const data = CONVERSATIONS;
        console.log(111);
        yield put(ConversationActions.saveConversations(data));
    }
    catch {
        notification.error({
            message: 'Fetch conversations failed',
            description: 'What the fuck are you doing. Please check again!'
        });
    }
    yield put(LoadingActions.saveLoading('fetchConversations', false));
}

function* fetchConversationsWatcher() {
    yield takeEvery(ActionTypes.FETCH_CONVERSATIONS, fetchConversations);
}

function* fetchOldConversations() {
    yield put(LoadingActions.saveLoading('fetchOldConversations', true));
    try {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > -1) return resolve();
                reject();
            }, 800);
        });
        let newData = {};
        newData[_.uniqueId("abc_")] = { ...CONVERSATIONS['conver_id_1'] };
        newData[_.uniqueId("abc_")] = { ...CONVERSATIONS['conver_id_2'] };
        newData[_.uniqueId("abc_")] = { ...CONVERSATIONS['conver_id_3'] };
        newData[_.uniqueId("abc_")] = { ...CONVERSATIONS['conver_id_4'] };
        newData[_.uniqueId("abc_")] = { ...CONVERSATIONS['conver_id_5'] };
        yield put(ConversationActions.saveOldConversations(newData));
    }
    catch {
        notification.error({
            message: 'Fetch old conversations failed',
            description: 'What the fuck are you doing. Please check again!'
        });
    }
    yield put(LoadingActions.saveLoading('fetchOldConversations', false));
}

function* fetchOldConversationsWatcher() {
    yield takeFirst(ActionTypes.FETCH_OLD_CONVERSATIONS, fetchOldConversations);
}

export default function* () {
    yield all([
        fetchConversationsWatcher(),
        fetchOldConversationsWatcher(),
    ]);
}