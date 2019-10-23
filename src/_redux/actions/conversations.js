import * as ActionTypes from './actionTypes';

export const fetchConversations = () => ({
    type: ActionTypes.FETCH_CONVERSATIONS
});

export const fetchOldConversations = () => ({
    type: ActionTypes.FETCH_OLD_CONVERSATIONS
});

export const saveConversations = conversations => ({
    type: ActionTypes.SAVE_CONVERSATIONS,
    payload: conversations,
});

export const saveOldConversations = conversations => ({
    type: ActionTypes.SAVE_OLD_CONVERSATIONS,
    payload: conversations,
});

export const resetConversations = () => ({
    type: ActionTypes.RESET_CONVERSATIONS
});