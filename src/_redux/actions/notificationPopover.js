import * as actionTypes from './actionTypes';

export const fetchNotificationPopovers = () => ({
    type: actionTypes.FETCH_NOTIFICATION_POPOVERS,
});

export const fetchOldNotificationPopovers = () => ({
    type: actionTypes.FETCH_OLD_NOTIFICATION_POPOVERS,
});

export const saveNotificationPopovers = notificationPopovers => ({
    type: actionTypes.SAVE_NOTIFICATION_POPOVERS,
    payload: notificationPopovers,
});

export const saveOldNotificationPopovers = notificationPopovers => ({
    type: actionTypes.SAVE_OLD_NOTIFICATION_POPOVERS,
    payload: notificationPopovers,
});

export const resetNotificationPopovers = () => ({
    type: actionTypes.RESET_NOTIFICATION_POPOVERS
});

export const toggleNotiPopHasmore = () => ({
    type: actionTypes.TOGGLE_NOTI_POP_HASMORE
});