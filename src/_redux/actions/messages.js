import * as actionTypes from './actionTypes';

export const fetchMessages = converId => ({
    type: actionTypes.FETCH_MESSAGES,
    payload: converId,
});

export const fetchOldMessages = converId => ({
    type: actionTypes.FETCH_OLD_MESSAGES,
    payload: converId,
});

export const saveMessages = messages => ({
    type: actionTypes.SAVE_MESSAGES,
    payload: messages,
});

export const saveOldMessages = messages => ({
    type: actionTypes.SAVE_OLD_MESSAGES,
    payload: messages,
});

export const resetMessages = () => ({
    type: actionTypes.RESET_MESSAGES
});

export const fetchCurrentUser = converId => ({
    type: actionTypes.FETCH_CURRENT_USER,
    payload: converId,
});

export const saveCurrentUser = user => ({
    type: actionTypes.SAVE_CURRENT_USER,
    payload: user,
});

export const resetCurrentUser = () => ({
    type: actionTypes.RESET_CURRENT_USER
});

export const sendMessage = (converId, userId, message) => ({
    type: actionTypes.SEND_MESSAGE,
    payload: {
        converId, userId, message
    }
});

export const addSendingMessage = message => ({
    type: actionTypes.ADD_SENDING_MESSAGE,
    payload: message
});

export const deleteSendingMessage = messId => ({
    type: actionTypes.DELETE_SENDING_MESSAGE,
    payload: messId,
});

export const addNewMessage = message => ({
    type: actionTypes.ADD_NEW_MESSAGE,
    payload: message
});