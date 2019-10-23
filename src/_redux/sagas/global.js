import { all, put, takeEvery } from 'redux-saga/effects';
import { notification } from 'antd';
import * as ActionTypes from '_redux/actions/actionTypes';
import * as GlobalActions from '_redux/actions/global';
import * as LoadingActions from '_redux/actions/loading';
import USER from 'assets/faker/user';
import storage from 'utils/storage';
import { history } from 'utils/history';

function* login({ from, payload }) {
    const { phone, password } = payload;
    yield put(LoadingActions.saveLoading('login', true));
    try {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.1) return resolve();
                reject();
            }, 1000);
        });
        storage.setToken('fake-user-token');
        yield put(GlobalActions.saveUser(USER));
        yield put(GlobalActions.saveNumOfUnread(6, 7));
        history.push(from);
        
    }
    catch {
        notification.error({
            message: 'Login Failed',
            description: 'Your phone or password is incorrect. Please check again!'
        });
    }
    yield put(LoadingActions.saveLoading('login', false));
}

function* loginWatcher() {
    yield takeEvery(ActionTypes.LOGIN, login);
}

function* fetchUser({ payload: token }) {
    yield put(LoadingActions.saveLoading('fetchUser', true));
    try {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > -1) return resolve();
                reject();
            }, 1000);
        });
        yield put(GlobalActions.saveUser(USER));
        yield put(GlobalActions.saveNumOfUnread(6, 7));
    }
    catch {
        notification.error({
            message: 'Internal Server Error',
            description: 'Please check again!'
        });
        history.push('/user/login');
    }
    yield put(LoadingActions.saveLoading('fetchUser', false));
}

function* fetchUserWatcher() {
    yield takeEvery(ActionTypes.FETCH_USER, fetchUser);
}

export default function* () {
    yield all([
        loginWatcher(),
        fetchUserWatcher(),
    ]);
}