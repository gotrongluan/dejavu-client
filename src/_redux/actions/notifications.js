import * as actionTypes from './actionTypes';

export const fetchNotifications = () => ({
    type: actionTypes.FETCH_NOTIFICATIONS
});

export const fetchOldNotifications = () => ({
    type: actionTypes.FETCH_OLD_NOTIFICATIONS
});

export const saveNotifications = notifications => ({
    type: actionTypes.SAVE_NOTIFICATIONS,
    payload: notifications,
});

export const saveOldNotifications = notifications => ({
    type: actionTypes.SAVE_OLD_NOTIFICATIONS,
    payload: notifications,
});

export const resetNotifications = () => ({
    type: actionTypes.RESET_NOTIFICATIONS
});

export const readNoti = id => ({
    type: actionTypes.READ_NOTIFICATIONS,
    payload: id
});

export const toggleNotiHasmore = () => ({
    type: actionTypes.TOGGLE_NOTI_HASMORE
});

export const saveNewNotification = notification => ({
    type: actionTypes.SAVE_NEW_NOTIFICATION,
    payload: notification,
});