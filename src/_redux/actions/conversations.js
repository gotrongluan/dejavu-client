import * as actionTypes from './actionTypes';

export const fetchConversations = () => ({
    type: actionTypes.FETCH_CONVERSATIONS
});

export const fetchOldConversations = () => ({
    type: actionTypes.FETCH_OLD_CONVERSATIONS
});

export const saveConversations = conversations => ({
    type: actionTypes.SAVE_CONVERSATIONS,
    payload: conversations,
});

export const saveOldConversations = conversations => ({
    type: actionTypes.SAVE_OLD_CONVERSATIONS,
    payload: conversations,
});

export const resetConversations = () => ({
    type: actionTypes.RESET_CONVERSATIONS
});

export const saveFirstConversation = conver => ({
    type: actionTypes.SAVE_FIRST_CONVERSATION,
    payload: conver
});

export const startConversation = (id, name, avatar, online) => ({
    type: actionTypes.START_CONVERSATION,
    payload: {
        id, name, avatar, online
    },
});

export const toggleConversHasmore = () => ({
    type: actionTypes.TOGGLE_CONVER_HASMORE
});

export const deleteFirstConversation = () => ({
    type: actionTypes.DELETE_FIRST_CONVERSATION,
});

export const updateOneConversation = conver => ({
    type: actionTypes.UPDATE_ONE_CONVERSATION,
    payload: conver
});