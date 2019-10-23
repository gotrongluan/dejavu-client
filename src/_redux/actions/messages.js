import * as ActionTypes from './actionTypes';

export const fetchMessages = () => ({
    type: ActionTypes.FETCH_MESSAGES
});

export const fetchOldMessages = () => ({
    type: ActionTypes.FETCH_OLD_MESSAGES
});

export const saveMessages = messages => ({
    type: ActionTypes.SAVE_MESSAGES,
    payload: messages,
});

export const saveOldMessages = messages => ({
    type: ActionTypes.SAVE_OLD_MESSAGES,
    payload: messages,
});

export const resetMessages = () => ({
    type: ActionTypes.RESET_MESSAGES
});

export const fetchCurrentUser = () => ({
    type: ActionTypes.FETCH_CURRENT_USER
});

export const saveCurrentUser = user => ({
    type: ActionTypes.SAVE_CURRENT_USER,
    payload: user,
});

export const resetCurrentUser = () => ({
    type: ActionTypes.RESET_CURRENT_USER
});