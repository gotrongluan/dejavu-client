import * as actionTypes from './actionTypes';

export const fetchMessengerPopovers = () => ({
    type: actionTypes.FETCH_MESSENGER_POPOVERS,
});

export const fetchOldMessengerPopovers = () => ({
    type: actionTypes.FETCH_OLD_MESSENGER_POPOVERS,
});

export const saveMessengerPopovers = messengerPopovers => ({
    type: actionTypes.SAVE_MESSENGER_POPOVERS,
    payload: messengerPopovers,
});

export const saveOldMessengerPopovers = messengerPopovers => ({
    type: actionTypes.SAVE_OLD_MESSENGER_POPOVERS,
    payload: messengerPopovers,
});

export const resetMessengerPopovers = () => ({
    type: actionTypes.RESET_MESSENGER_POPOVERS
});

export const saveNewMessengerPopover = messPopover => ({
    type: actionTypes.SAVE_NEW_MESSENGER_POPOVER,
    payload: messPopover,
});

export const toggleMessPopHasmore = () => ({
    type: actionTypes.TOGGLE_MESS_POP_HASMORE
})