import { all, call, takeEvery, put, select } from 'redux-saga/effects';
import { takeFirst } from 'utils/takeFirst';
import * as actionTypes from '_redux/actions/actionTypes';
import * as followerActions from '_redux/actions/followers';
import * as loadingActions from '_redux/actions/loading';
import * as followerServices from 'services/followers';

function* fetchFollowers() {
    yield put(loadingActions.saveLoading('fetchFollowers', true));
    const response = yield call(followerServices.fetch, { page: 1, limit: 12 });
    if (response) {
        const { data: followers } = response;
        yield put(followerActions.saveFollowers(followers));
        if (followers.length < 12)
            yield put(followerActions.toggleFollowersHasmore());
    }
    yield put(loadingActions.saveLoading('fetchFollowers', false));
}

function* fetchFollowersWatcher() {
    yield takeEvery(actionTypes.FETCH_FOLLOWERS, fetchFollowers);
}

function* fetchOldFollowers() {
    yield put(loadingActions.saveLoading('fetchOldFollowers', true));
    const { list: followers, hasMore } = yield select(state => state.followers);
    if (hasMore) {
        const response = yield call(followerServices.fetch, { page: (followers.length / 6) + 1, limit: 6 });
        if (response) {
            const { data: oldFollowers } = response;
            yield put(followerActions.saveOldFollowers(oldFollowers));
            if (oldFollowers.length < 6)
                yield put(followerActions.toggleFollowersHasmore());
        }
    }
    yield put(loadingActions.saveLoading('fetchOldFollowers', false));
}

function* fetchOldFollowersWatcher() {
    yield takeFirst(actionTypes.FETCH_OLD_FOLLOWERS, fetchOldFollowers);
}

function* fetchNumOfFollower() {
    yield put(loadingActions.saveLoading('fetchNumOfFollower', true));
    const response = yield call(followerServices.fetchNumOfFollower);
    if (response) {
        const { data: value } = response;
        yield put(followerActions.saveNumOfFollower(value));
    }
    yield put(loadingActions.saveLoading('fetchNumOfFollower', false));
}

function* fetchNumOfFollowerWatcher() {
    yield takeEvery(actionTypes.FETCH_NUM_OF_FOLLOWER, fetchNumOfFollower);
}

export default function* () {
    yield all([
        fetchFollowersWatcher(),
        fetchOldFollowersWatcher(),
        fetchNumOfFollowerWatcher(),
    ])
}