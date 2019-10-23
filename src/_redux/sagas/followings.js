import { all, takeEvery, put } from 'redux-saga/effects';
import { takeFirst } from 'utils/takeFirst';
import { notification } from 'antd';
import * as ActionTypes from '_redux/actions/actionTypes';
import * as FollowingActions from '_redux/actions/followings';
import * as LoadingActions from '_redux/actions/loading';
import FOLLOWINGS from 'assets/faker/followings';

function* fetchFollowings() {
    yield put(LoadingActions.saveLoading('fetchFollowings', true));
    try {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > -1) return resolve();
                reject();
            }, 2000);
        });
        const data = FOLLOWINGS.slice(0, 10);
        yield put(FollowingActions.saveFollowings(data));
    }
    catch {
        notification.error({
            message: 'Fetch followings failed',
            description: 'What the fuck are you doing. Please check again!'
        });
    }
    yield put(LoadingActions.saveLoading('fetchFollowings', false));
}

function* fetchFollowingsWatcher() {
    yield takeEvery(ActionTypes.FETCH_FOLLOWINGS, fetchFollowings);
}

function* fetchOldFollowings() {
    yield put(LoadingActions.saveLoading('fetchOldFollowings', true));
    try {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > -1) return resolve();
                reject();
            }, 1000);
        });
        const data = FOLLOWINGS.slice(11, 16);
        yield put(FollowingActions.saveOldFollowings(data));
    }
    catch {
        notification.error({
            message: 'Fetch old followings failed',
            description: 'What the fuck are you doing. Please check again!'
        });
    }
    yield put(LoadingActions.saveLoading('fetchOldFollowings', false));
}

function* fetchOldFollowingsWatcher() {
    yield takeFirst(ActionTypes.FETCH_OLD_FOLLOWINGS, fetchOldFollowings);
}

function* fetchNumOfFollowing() {
    yield put(LoadingActions.saveLoading('fetchNumOfFollowing', true));
    try {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > -1) return resolve();
                reject();
            }, 1400);
        });
        yield put(FollowingActions.saveNumOfFollowing(124));
    }
    catch {
        notification.error({
            message: 'Fetch number of following failed',
            description: 'What the fuck are you doing. Please check again!'
        });
    }
    yield put(LoadingActions.saveLoading('fetchNumOfFollowing', false));
}

function* fetchNumOfFollowingWatcher() {
    yield takeEvery(ActionTypes.FETCH_NUM_OF_FOLLOWING, fetchNumOfFollowing);
}

export default function* () {
    yield all([
        fetchFollowingsWatcher(),
        fetchOldFollowingsWatcher(),
        fetchNumOfFollowingWatcher(),
    ])
}