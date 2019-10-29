import { all, put, call, takeEvery } from 'redux-saga/effects';
import * as actionTypes from '_redux/actions/actionTypes';
import * as globalActions from '_redux/actions/global';
import * as loadingActions from '_redux/actions/loading';
import * as globalServices from 'services/global';
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
        //firebase setup token
        yield put(globalActions.authorized());
        history.replace(from);
    }
    yield put(loadingActions.saveLoading('login', false));
}

function* loginWatcher() {
    yield takeEvery(actionTypes.LOGIN, login);
}

function* fetchUser() {
    yield put(loadingActions.saveLoading('fetchUser', true));
    const response = yield call(globalServices.fetchUser);
    if (response) {
        const {
            data: {
                user, unreads
            }
        } = response;
        yield put(globalActions.saveUser(user));
        yield put(globalActions.saveNumOfUnread(unreads.message, unreads.notification));
        yield put(globalActions.authorized());
        //fcm token
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

function* signup({ payload: info }) {
    yield put(loadingActions.saveLoading('signup', true));
    const response = yield call(globalServices.signup, info);
    if (response) history.push('/user/login');
    yield put(loadingActions.saveLoading('signup', false));
}

function* signupWatcher() {
    yield takeEvery(actionTypes.SIGN_UP, signup);
}

export default function* () {
    yield all([
        loginWatcher(),
        fetchUserWatcher(),
        logoutWatcher(),
        signupWatcher()
    ]);
}