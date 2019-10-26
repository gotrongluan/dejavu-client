import { takeEvery, call, put, all } from 'redux-saga/effects';
import * as actionTypes from '_redux/actions/actionTypes';
import * as coinPolicyActions from '_redux/actions/coinPolicy';
import * as loadingActions from '_redux/actions/loading';
import * as coinPolicyServices from 'services/coinPolicy';
import { delay } from 'utils/utils';

function* fetchCoinPolicy() {
    yield put(loadingActions.saveLoading('fetchcoinPolicy', true));
    const response = yield call(coinPolicyServices.fetch);
    if (response) {
        const { data: policy } = response;
        yield delay(600);
        yield put(coinPolicyActions.saveCoinPolicy(policy));
    }
    yield put(loadingActions.saveLoading('fetchcoinPolicy', false));
}

function* fetchCoinPolicyWatcher() {
    yield takeEvery(actionTypes.FETCH_COIN_POLICY, fetchCoinPolicy);
}

export default function*() {
    yield all([
        fetchCoinPolicyWatcher()
    ]);
}