import { takeEvery, put, all } from 'redux-saga/effects';
import { notification } from 'antd';
import * as ActionTypes from '_redux/actions/actionTypes';
import * as CoinPolicyActions from '_redux/actions/coinPolicy';
import * as LoadingActions from '_redux/actions/loading';
import COIN_POLICY from 'assets/faker/coinPolicy';

function* fetchCoinPolicy() {
    yield put(LoadingActions.saveLoading('fetchCoinPolicy', true));
    try {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > -1) return resolve();
                reject();
            }, 2000);
        });
        const data = COIN_POLICY;
        yield put(CoinPolicyActions.saveCoinPolicy(data));
    }
    catch {
        notification.error({
            message: 'Fetch policy failed',
            description: 'What the fuck are you doing. Please check again!'
        });
    }
    yield put(LoadingActions.saveLoading('fetchCoinPolicy', false));
}

function* fetchCoinPolicyWatcher() {
    yield takeEvery(ActionTypes.FETCH_COIN_POLICY, fetchCoinPolicy);
}

export default function*() {
    yield all([
        fetchCoinPolicyWatcher()
    ]);
}