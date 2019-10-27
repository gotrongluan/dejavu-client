import { all, put, call, takeLatest, select } from 'redux-saga/effects';
import { takeFirst } from 'utils/takeFirst';
import { message } from 'antd';
import * as actionTypes from '_redux/actions/actionTypes';
import * as loadingActions from '_redux/actions/loading';
import * as streamerActions from '_redux/actions/streamer';
import * as streamerServices from 'services/streamer';
import { delay } from 'utils/utils';

function* fetchFollowers({ payload: streamerId }) {
    yield put(loadingActions.saveLoading('fetchStreamerFollowers', true));
    const response = yield call(streamerServices.fetchFollowers, { userId: streamerId, page: 1, limit: 12 });
    if (response) {
        const { data: followers } = response;
        yield put(streamerActions.saveFollowers(followers));
        if (followers.length < 12)
            yield put(streamerActions.toggleFollowersHasmore());
    }
    yield put(loadingActions.saveLoading('fetchStreamerFollowers', false));
}

function* fetchFollowersWatcher() {
    yield takeLatest(actionTypes.FETCH_STREAMER_FOLLOWERS, fetchFollowers);
}

function* fetchOldFollowers({ payload: streamerId }) {
    yield put(loadingActions.saveLoading('fetchOldStreamerFollowers', true));
    const { list: followers, hasMore } = yield select(state => state.streamer.followers);
    if (hasMore) {
        const response = yield call(streamerServices.fetchFollowers, { userId: streamerId, page: (followers.length / 6) + 1, limit: 6 });
        if (response) {
            const { data: oldFollowers } = response;
            yield delay(600);
            yield put(streamerActions.saveOldFollowers(oldFollowers));
            if (oldFollowers.length < 6)
                yield put(streamerActions.toggleFollowersHasmore());
        }
    }
    yield put(loadingActions.saveLoading('fetchOldStreamerFollowers', false));
}

function* fetchOldFollowersWatcher() {
    yield takeLatest(actionTypes.FETCH_STREAMER_OLD_FOLLOWERS, fetchOldFollowers);
}

function* fetchFollowings({ payload: streamerId }) {
    yield put(loadingActions.saveLoading('fetchStreamerFollowings', true));
    const response = yield call(streamerServices.fetchFollowings, { userId: streamerId, page: 1, limit: 12 });
    if (response) {
        const { data: followings } = response;
        yield put(streamerActions.saveFollowings(followings));
        if (followings.length < 12)
            yield put(streamerActions.toggleFollowingsHasmore());
    }
    yield put(loadingActions.saveLoading('fetchStreamerFollowings', false));
}

function* fetchFollowingsWatcher() {
    yield takeLatest(actionTypes.FETCH_STREAMER_FOLLOWINGS, fetchFollowings);
}

function* fetchOldFollowings({ payload: streamerId }) {
    yield put(loadingActions.saveLoading('fetchOldStreamerFollowings', true));
    const { list: followings, hasMore } = yield select(state => state.streamer.followings);
    if (hasMore) {
        const response = yield call(streamerServices.fetchFollowings, { userId: streamerId, page: (followings.length / 6) + 1, limit: 6 });
        if (response) {
            const { data: oldFollowings } = response;
            yield delay(900);
            yield put(streamerActions.saveOldFollowings(oldFollowings));
            if (oldFollowings.length < 6)
                yield put(streamerActions.toggleFollowingsHasmore());
        }
    }
    yield put(loadingActions.saveLoading('fetchOldStreamerFollowings', false));
}

function* fetchOldFollowingsWatcher() {
    yield takeLatest(actionTypes.FETCH_STREAMER_OLD_FOLLOWINGS, fetchOldFollowings);
}

function* fetchNumOfFollower({ payload: streamerId }) {
    yield put(loadingActions.saveLoading('fetchNumOfStreamerFollower', true));
    const response = yield call(streamerServices.fetchNumOfFollower, streamerId);
    if (response) {
        const { data: value } = response;
        yield put(streamerActions.saveNumOfFollower(value));
    }
    yield put(loadingActions.saveLoading('fetchNumOfStreamerFollower', false));
}

function* fetchNumOfFollowerWatcher() {
    yield takeLatest(actionTypes.FETCH_STREAMER_NUM_OF_FOLLOWER, fetchNumOfFollower);
}

function* fetchNumOfFollowing({ payload: streamerId }) {
    yield put(loadingActions.saveLoading('fetchNumOfStreamerFollowing', true));
    const response = yield call(streamerServices.fetchNumOfFollowing, streamerId);
    if (response) {
        const { data: value } = response;
        yield put(streamerActions.saveNumOfFollowing(value));
    }
    yield put(loadingActions.saveLoading('fetchNumOfStreamerFollowing', false));
}

function* fetchNumOfFollowingWatcher() {
    yield takeLatest(actionTypes.FETCH_STREAMER_NUM_OF_FOLLOWING, fetchNumOfFollowing);
}

function* fetchStreamer({ payload: streamerId }) {
    yield put(loadingActions.saveLoading('fetchStreamer', true));
    const response = yield call(streamerServices.fetchStreamer, streamerId);
    if (response) {
        const {
            data: {
                streamer,
                followed
            } 
        } = response;
        streamer.followed = followed;
        yield put(streamerActions.saveProfile(streamer));
    }
    yield put(loadingActions.saveLoading('fetchStreamer', false));
}

function* fetchStreamerWatcher() {
    yield takeLatest(actionTypes.FETCH_STREAMER, fetchStreamer);
}

function* follow({ payload: streamerId }) {
    yield put(loadingActions.saveLoading('follow', true));
    const response = yield call(streamerServices.follow, streamerId);
    if (response) {
        yield put(streamerActions.saveFollow(true));
        message.success('Followed successfully!');
    }
    yield put(loadingActions.saveLoading('follow', false));
}

function* followWatcher() {
    yield takeFirst(actionTypes.FOLLOW, follow);
}

function* unfollow({ payload: streamerId }) {
    yield put(loadingActions.saveLoading('unfollow', true));
    const response = yield call(streamerServices.unfollow, streamerId);
    if (response) {
        yield put(streamerActions.saveFollow(false));
        message.info('Unfollowed :(');
    }
    yield put(loadingActions.saveLoading('unfollow', false));
}

function* unfollowWatcher() {
    yield takeFirst(actionTypes.UNFOLLOW, unfollow);
}

export default function* () {
    yield all([
        fetchFollowersWatcher(),
        fetchFollowingsWatcher(),
        fetchOldFollowersWatcher(),
        fetchOldFollowingsWatcher(),
        fetchNumOfFollowerWatcher(),
        fetchNumOfFollowingWatcher(),
        fetchStreamerWatcher(),
        followWatcher(),
        unfollowWatcher(),
    ])
}