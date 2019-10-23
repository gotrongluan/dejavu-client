import { all, takeEvery, put } from 'redux-saga/effects';
import { takeFirst } from 'utils/takeFirst';
import { notification } from 'antd';
import * as ActionTypes from '_redux/actions/actionTypes';
import * as TransactionActions from '_redux/actions/transactions';
import * as LoadingActions from '_redux/actions/loading';
import TRANSACTIONS from 'assets/faker/transactions';

function* fetchTransactions() {
    yield put(LoadingActions.saveLoading('fetchTransactions', true));
    try {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > -1) return resolve();
                reject();
            }, 2000);
        });
        const data = TRANSACTIONS.slice(0, 10);
        yield put(TransactionActions.saveTransactions(data));
    }
    catch {
        notification.error({
            message: 'Fetch transactions failed',
            description: 'What the fuck are you doing. Please check again!'
        });
    }
    yield put(LoadingActions.saveLoading('fetchTransactions', false));
}

function* fetchTransactionsWatcher() {
    yield takeEvery(ActionTypes.FETCH_TRANSACTIONS, fetchTransactions);
}

function* fetchOldTransactions() {
    yield put(LoadingActions.saveLoading('fetchOldTransactions', true));
    try {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > -1) return resolve();
                reject();
            }, 1000);
        });
        const data = TRANSACTIONS.slice(11, 16);
        yield put(TransactionActions.saveOldTransactions(data));
    }
    catch {
        notification.error({
            message: 'Fetch old transactions failed',
            description: 'What the fuck are you doing. Please check again!'
        });
    }
    yield put(LoadingActions.saveLoading('fetchOldTransactions', false));
}

function* fetchOldTransactionsWatcher() {
    yield takeFirst(ActionTypes.FETCH_OLD_TRANSACTIONS, fetchOldTransactions);
}

export default function* () {
    yield all([
        fetchTransactionsWatcher(),
        fetchOldTransactionsWatcher()
    ])
}