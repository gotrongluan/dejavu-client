import * as ActionTypes from './actionTypes';

export const saveUser = user => ({
    type: ActionTypes.SAVE_USER,
    payload: user,
});

export const saveNumOfUnread = (mess, noti) => ({
    type: ActionTypes.SAVE_NUM_OF_UNREAD,
    payload: {
        mess, noti,
    }
});

export const login = (phone, password, from) => ({
    type: ActionTypes.LOGIN,
    from: from,
    payload: {
        phone, password,
    }
});

export const fetchUser = token => ({
    type: ActionTypes.FETCH_USER,
    payload: token,
});