import { all, takeEvery, put, fork, call, select } from 'redux-saga/effects';
import { takeFirst } from 'utils/takeFirst';
import * as actionTypes from '_redux/actions/actionTypes';
import * as transactionActions from '_redux/actions/transactions';
import * as loadingActions from '_redux/actions/loading';
import * as globalActions from '_redux/actions/global';
import * as transactionServices from 'services/transactions';
import { delay } from 'utils/utils';

function* fetchTransactions() {
    yield put(loadingActions.saveLoading('fetchTransactions', true));
    const response = yield call(transactionServices.fetch, { page: 1, limit: 12 });
    if (response) {
        const { data: transactions } = response;
        yield put(transactionActions.saveTransactions(transactions));
        if (transactions.length < 12)
            yield put(transactionActions.saveHasmore(false));
        else
            yield put(transactionActions.saveHasmore(true));
        
    }
    yield put(loadingActions.saveLoading('fetchTransactions', false));
}

function* fetchTransactionsWatcher() {
    yield takeEvery(actionTypes.FETCH_TRANSACTIONS, fetchTransactions);
}

function* fetchOldTransactions() {
    yield put(loadingActions.saveLoading('fetchOldTransactions', true));
    const { list: transactions, hasMore } = yield select(state => state.transactions);
    if (hasMore) {
        const response = yield call(transactionServices.fetch, { page: (transactions.length / 6) + 1, limit: 6 });
        if (response) {
            const { data: oldTransactions } = response;
            yield delay(700);
            yield put(transactionActions.saveOldTransactions(oldTransactions));
            if (oldTransactions.length < 6)
                yield put(transactionActions.saveHasmore(false));
        }
    }
    yield put(loadingActions.saveLoading('fetchOldTransactions', false));
}

function* fetchOldTransactionsWatcher() {
    yield takeFirst(actionTypes.FETCH_OLD_TRANSACTIONS, fetchOldTransactions);
}

function* buyCoins({ payload: money }) {
    yield put(loadingActions.saveLoading('buyCoins', true));
    const response = yield call(transactionServices.buyCoins, money);
    if (response) {
        const { data: { coin } } = response;
        yield fork(fetchTransactions);
        yield put(globalActions.saveCoins(coin));
    }
    yield put(loadingActions.saveLoading('buyCoins', false));
}

function* buyCoinsWatcher() {
    yield takeFirst(actionTypes.BUY_COINS, buyCoins);
}

export default function* () {
    yield all([
        fetchTransactionsWatcher(),
        fetchOldTransactionsWatcher(),
        buyCoinsWatcher(),
    ])
}