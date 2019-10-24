import * as ActionTypes from './actionTypes';

export const fetchMessages = converId => ({
    type: ActionTypes.FETCH_MESSAGES,
    payload: converId,
});

export const fetchOldMessages = converId => ({
    type: ActionTypes.FETCH_OLD_MESSAGES,
    payload: converId,
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

export const fetchCurrentUser = converId => ({
    type: ActionTypes.FETCH_CURRENT_USER,
    payload: converId,
});

export const saveCurrentUser = user => ({
    type: ActionTypes.SAVE_CURRENT_USER,
    payload: user,
});

export const resetCurrentUser = () => ({
    type: ActionTypes.RESET_CURRENT_USER
});