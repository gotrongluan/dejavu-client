import { all } from 'redux-saga/effects';
import globalSaga from './sagas/global';

export function* rootSaga() {
    yield all([
        globalSaga(),
    ]);
}