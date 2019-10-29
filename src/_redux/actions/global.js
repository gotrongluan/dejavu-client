import * as actionTypes from './actionTypes';

export const saveUser = user => ({
    type: actionTypes.SAVE_USER,
    payload: user,
});

export const saveNumOfUnread = (mess, noti) => ({
    type: actionTypes.SAVE_NUM_OF_UNREAD,
    payload: {
        mess, noti,
    }
});

export const login = (phone, password, from) => ({
    type: actionTypes.LOGIN,
    from: from,
    payload: {
        phone, password,
    }
});

export const fetchUser = () => ({
    type: actionTypes.FETCH_USER
});

export const saveCoins = coins => ({
    type: actionTypes.SAVE_COINS,
    payload: coins,
});

export const logout = () => ({
    type: actionTypes.LOGOUT
});

export const resetUser = () => ({
    type: actionTypes.RESET_USER
});

export const signup = info => ({
    type: actionTypes.SIGN_UP,
    payload: info
});

export const saveNumOfUnreadNoti = val => ({
    type: actionTypes.SAVE_NUM_OF_UNREAD_NOTI,
    payload: val
});

export const authorized = () => ({
    type: actionTypes.AUTHORIZED
});