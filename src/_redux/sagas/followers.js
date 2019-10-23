import { all, takeEvery, put } from 'redux-saga/effects';
import { takeFirst } from 'utils/takeFirst';
import { notification } from 'antd';
import * as ActionTypes from '_redux/actions/actionTypes';
import * as FollowerActions from '_redux/actions/followers';
import * as LoadingActions from '_redux/actions/loading';
import FOLLOWERS from 'assets/faker/followers';

function* fetchFollowers() {
    yield put(LoadingActions.saveLoading('fetchFollowers', true));
    try {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > -1) return resolve();
                reject();
            }, 2000);
        });
        const data = FOLLOWERS.slice(0, 10);
        yield put(FollowerActions.saveFollowers(data));
    }
    catch {
        notification.error({
            message: 'Fetch followers failed',
            description: 'What the fuck are you doing. Please check again!'
        });
    }
    yield put(LoadingActions.saveLoading('fetchFollowers', false));
}

function* fetchFollowersWatcher() {
    yield takeEvery(ActionTypes.FETCH_FOLLOWERS, fetchFollowers);
}

function* fetchOldFollowers() {
    yield put(LoadingActions.saveLoading('fetchOldFollowers', true));
    try {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > -1) return resolve();
                reject();
            }, 1000);
        });
        const data = FOLLOWERS.slice(11, 16);
        yield put(FollowerActions.saveOldFollowers(data));
    }
    catch {
        notification.error({
            message: 'Fetch old followers failed',
            description: 'What the fuck are you doing. Please check again!'
        });
    }
    yield put(LoadingActions.saveLoading('fetchOldFollowers', false));
}

function* fetchOldFollowersWatcher() {
    yield takeFirst(ActionTypes.FETCH_OLD_FOLLOWERS, fetchOldFollowers);
}

function* fetchNumOfFollower() {
    yield put(LoadingActions.saveLoading('fetchNumOfFollower', true));
    try {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > -1) return resolve();
                reject();
            }, 1400);
        });
        yield put(FollowerActions.saveNumOfFollower(124));
    }
    catch {
        notification.error({
            message: 'Fetch number of follower failed',
            description: 'What the fuck are you doing. Please check again!'
        });
    }
    yield put(LoadingActions.saveLoading('fetchNumOfFollower', false));
}

function* fetchNumOfFollowerWatcher() {
    yield takeEvery(ActionTypes.FETCH_NUM_OF_FOLLOWER, fetchNumOfFollower);
}

export default function* () {
    yield all([
        fetchFollowersWatcher(),
        fetchOldFollowersWatcher(),
        fetchNumOfFollowerWatcher(),
    ])
}