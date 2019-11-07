import { takeEvery, call, all, put } from 'redux-saga/effects';
import * as actionTypes from '_redux/actions/actionTypes';
import * as viewStreamActions from '_redux/actions/viewStream';
import * as loadingActions from '_redux/actions/loading';
import * as viewStreamServices from 'services/viewStream';
import { delay } from 'utils/utils';

function* fetchStreamerVT({ payload: streamerId }) {
    yield put(loadingActions.saveLoading('fetchStreamerVT', true));
    const response = yield call(viewStreamServices.fetchStreamer, streamerId);
    if (response) {
        const { data: streamer } = response;
        yield delay(700);
        yield put(viewStreamActions.saveStreamerVT(streamer));
    }
    yield put(loadingActions.saveLoading('fetchStreamerVT', false));
}

function* fetchStreamerVTWatcher() {
    yield takeEvery(actionTypes.FETCH_STREAMER_VT, fetchStreamerVT);
}

function* fetchGifts() {

}

function* fetchGiftsWatcher() {
    yield takeEvery(actionTypes.FETCH_GIFTS, fetchGifts);
}

function* viewStream({ payload: streamId }) {
    const response = yield call(viewStreamServices.viewStream, streamId);
    if (response) {
        const { live_stream: { player_hls_playback_url: hlsUrl } } = response;
        yield put(viewStreamActions.saveHlsUrl(hlsUrl));
    }
}

function* viewStreamWatcher() {
    yield takeEvery(actionTypes.VIEW_STREAM, viewStream);
}

export default function* () {
    yield all([
        fetchStreamerVTWatcher(),
        fetchGiftsWatcher(),
        viewStreamWatcher()
    ]);
}