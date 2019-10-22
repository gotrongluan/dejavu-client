import { all, takeEvery } from 'redux-saga/effects';
import * as ActionTypes from 'redux-config/actions/actionTypes';

function* helloWorldWorker() {
    yield new Promise((resolve, reject) => { setTimeout(() => {
        console.log('Hello world');
        resolve();
    }, 1500) });
}

function* helloWorldWatcher() {
    yield takeEvery('GLOBAL_HELLO_WORLD', helloWorldWorker);
}

export default function* () {
    yield all([
        helloWorldWatcher(),
    ]);
}