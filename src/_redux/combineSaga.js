import { all } from 'redux-saga/effects';
import globalSaga from './sagas/global';
import followerSaga from './sagas/followers';

export function* rootSaga() {
    yield all([
        globalSaga(),
        followerSaga()
    ]);
}