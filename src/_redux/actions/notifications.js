import * as ActionTypes from './actionTypes';

export const fetchNotifications = () => ({
    type: ActionTypes.FETCH_NOTIFICATIONS
});

export const fetchOldNotifications = () => ({
    type: ActionTypes.FETCH_OLD_NOTIFICATIONS
});

export const saveNotifications = notifications => ({
    type: ActionTypes.SAVE_NOTIFICATIONS,
    payload: notifications,
});

export const saveOldNotifications = notifications => ({
    type: ActionTypes.SAVE_OLD_NOTIFICATIONS,
    payload: notifications,
});

export const resetNotifications = () => ({
    type: ActionTypes.RESET_NOTIFICATIONS
});