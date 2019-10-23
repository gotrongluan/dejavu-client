import * as ActionTypes from './actionTypes';

export const fetchNotificationPopovers = () => ({
    type: ActionTypes.FETCH_NOTIFICATION_POPOVERS,
});

export const fetchOldNotificationPopovers = () => ({
    type: ActionTypes.FETCH_OLD_NOTIFICATION_POPOVERS,
});

export const saveNotificationPopovers = notificationPopovers => ({
    type: ActionTypes.SAVE_NOTIFICATION_POPOVERS,
    payload: notificationPopovers,
});

export const saveOldNotificationPopovers = notificationPopovers => ({
    type: ActionTypes.SAVE_OLD_NOTIFICATION_POPOVERS,
    payload: notificationPopovers,
});


export const resetNotificationPopovers = () => ({
    type: ActionTypes.RESET_NOTIFICATION_POPOVERS
});