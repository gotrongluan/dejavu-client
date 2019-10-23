import * as ActionTypes from './actionTypes';

export const fetchMessengerPopovers = () => ({
    type: ActionTypes.FETCH_MESSENGER_POPOVERS,
});

export const fetchOldMessengerPopovers = () => ({
    type: ActionTypes.FETCH_OLD_MESSENGER_POPOVERS,
});

export const saveMessengerPopovers = messengerPopovers => ({
    type: ActionTypes.SAVE_MESSENGER_POPOVERS,
    payload: messengerPopovers,
});

export const saveOldMessengerPopovers = messengerPopovers => ({
    type: ActionTypes.SAVE_OLD_MESSENGER_POPOVERS,
    payload: messengerPopovers,
});


export const resetMessengerPopovers = () => ({
    type: ActionTypes.RESET_MESSENGER_POPOVERS
});