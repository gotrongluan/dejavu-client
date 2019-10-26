import { all, put, call, takeEvery } from 'redux-saga/effects';
import { notification } from 'antd';
import * as actionTypes from '_redux/actions/actionTypes';
import * as globalActions from '_redux/actions/global';
import * as loadingActions from '_redux/actions/loading';
import * as globalServices from 'services/global';
import USER from 'assets/faker/user';
import storage from 'utils/storage';
import { history } from 'utils/history';

function* login({ from, payload }) {
    const { phone, password } = payload;
    yield put(loadingActions.saveLoading('login', true));
    const response = yield call(globalServices.login, { phone, password});
    if (response) {
        const { data: { user, unreads } } = response;
        const token = user.token;
        storage.setToken(token);
        yield put(globalActions.saveUser(user));
        yield put(globalActions.saveNumOfUnread(unreads.message, unreads.notification));
        history.replace(from);
    }
    yield put(loadingActions.saveLoading('login', false));
}

function* loginWatcher() {
    yield takeEvery(actionTypes.LOGIN, login);
}

function* fetchUser({ payload: token }) {
    yield put(loadingActions.saveLoading('fetchUser', true));
    try {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > -1) return resolve();
                reject();
            }, 1000);
        });
        yield put(globalActions.saveUser(USER));
        yield put(globalActions.saveNumOfUnread(6, 7));
    }
    catch {
        notification.error({
            message: 'Internal Server Error',
            description: 'Please check again!'
        });
        history.push('/user/login');
    }
    yield put(loadingActions.saveLoading('fetchUser', false));
}

function* fetchUserWatcher() {
    yield takeEvery(actionTypes.FETCH_USER, fetchUser);
}

function* logout() {
    storage.setToken(null);
    yield put(globalActions.resetUser());
    history.push('/user/login');
}

function* logoutWatcher() {
    yield takeEvery(actionTypes.LOGOUT, logout);
}

export default function* () {
    yield all([
        loginWatcher(),
        fetchUserWatcher(),
        logoutWatcher()
    ]);
}