import { all } from 'redux-saga/effects';
import globalSaga from './sagas/global';
import followerSaga from './sagas/followers';
import followingSaga from './sagas/followings';

export function* rootSaga() {
    yield all([
        globalSaga(),
        followerSaga(),
        followingSaga()
    ]);
}