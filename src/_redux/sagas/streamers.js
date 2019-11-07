import { takeEvery, all, put, call, select } from 'redux-saga/effects';
import * as actionTypes from '_redux/actions/actionTypes';
import * as loadingActions from '_redux/actions/loading';
import * as streamersActions from '_redux/actions/streamers';
import * as streamersServices from 'services/streamers';

function* fetchStreamers({ payload: type }) {
    yield put(loadingActions.saveLoading('fetchStreamers', true));
    const response = yield call(streamersServices.fetch, { page: 1, limit: 12, type });
    if (response) {
        const { data: streamers } = response;
        yield put(streamersActions.saveStreamers(streamers));
        if (streamers.length < 12) yield put(streamersActions.saveStreamersHasmore(false));
    }
    yield put(loadingActions.saveLoading('fetchStreamers', false));
}

function* fetchStreamersWatcher() {
    yield takeEvery(actionTypes.FETCH_STREAMERS, fetchStreamers);
}

function* fetchOldStreamers({ payload: type }) {
    yield put(loadingActions.saveLoading('fetchOldStreamers', true));
    const { list: streamers, hasMore } = yield select(state => state.streamers);
    if (hasMore) {
        const response = yield call(streamersServices.fetch, { page: (streamers.length / 6) + 1, limit: 6, type });
        if (response) {
            const { data: oldStreamers } = response;
            yield put(streamersActions.saveOldStreamers(oldStreamers));
            if (oldStreamers.length < 6) yield put(streamersActions.saveStreamersHasmore(false));
        }
    }
    yield put(loadingActions.saveLoading('fetchOldStreamers', false));
}

function* fetchOldStreamersWatcher() {
    yield takeEvery(actionTypes.FETCH_OLD_STREAMERS, fetchOldStreamers);
}

export default function* () {
    yield all([
        fetchStreamersWatcher(),
        fetchOldStreamersWatcher()
    ]);
}