import { all, takeEvery, put, call, select } from 'redux-saga/effects';
import { takeFirst } from 'utils/takeFirst';
import * as actionTypes from '_redux/actions/actionTypes';
import * as followingActions from '_redux/actions/followings';
import * as loadingActions from '_redux/actions/loading';
import * as followingServices from 'services/followings';
import { delay } from 'utils/utils';

function* fetchFollowings() {
    yield put(loadingActions.saveLoading('fetchFollowings', true));
    const response = yield call(followingServices.fetch, { page: 1, limit: 12 });
    if (response) {
        const { data: followings } = response;
        yield put(followingActions.saveFollowings(followings));
        if (followings.length < 12)
            yield put(followingActions.toggleFollowingsHasmore());
    }
    yield put(loadingActions.saveLoading('fetchFollowings', false));
}

function* fetchFollowingsWatcher() {
    yield takeEvery(actionTypes.FETCH_FOLLOWINGS, fetchFollowings);
}

function* fetchOldFollowings() {
    yield put(loadingActions.saveLoading('fetchOldFollowings', true));
    const { list: followings, hasMore } = yield select(state => state.followings);
    if (hasMore) {
        const response = yield call(followingServices.fetch, { page: (followings.length / 6) + 1, limit: 6 });
        if (response) {
            const { data: oldFollowings } = response;
            yield delay(1000);
            yield put(followingActions.saveOldFollowings(oldFollowings));
            if (oldFollowings.length < 6)
                yield put(followingActions.toggleFollowingsHasmore());
        }
    }
    yield put(loadingActions.saveLoading('fetchOldFollowings', false));
}

function* fetchOldFollowingsWatcher() {
    yield takeFirst(actionTypes.FETCH_OLD_FOLLOWINGS, fetchOldFollowings);
}

function* fetchNumOfFollowing() {
    yield put(loadingActions.saveLoading('fetchNumOfFollowing', true));
    const response = yield call(followingServices.fetchNumOfFollowing);
    if (response) {
        const { data: value } = response;
        yield put(followingActions.saveNumOfFollowing(value));
    }
    yield put(loadingActions.saveLoading('fetchNumOfFollowing', false));
}

function* fetchNumOfFollowingWatcher() {
    yield takeEvery(actionTypes.FETCH_NUM_OF_FOLLOWING, fetchNumOfFollowing);
}

export default function* () {
    yield all([
        fetchFollowingsWatcher(),
        fetchOldFollowingsWatcher(),
        fetchNumOfFollowingWatcher(),
    ])
}