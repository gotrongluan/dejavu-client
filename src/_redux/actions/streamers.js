import * as actionTypes from './actionTypes';

export const fetchStreamers = type => ({
    type: actionTypes.FETCH_STREAMERS,
    payload: type
});

export const fetchOldStreamers = type => ({
    type: actionTypes.FETCH_OLD_STREAMERS,
    payload: type
});

export const saveStreamers = streamers => ({
    type: actionTypes.SAVE_STREAMERS,
    payload: streamers,
});

export const saveOldStreamers = streamers => ({
    type: actionTypes.SAVE_OLD_STREAMERS,
    payload: streamers
});

export const resetStreamers = () => ({
    type: actionTypes.RESET_STREAMERS
});

export const saveStreamersHasmore = val => ({
    type: actionTypes.SAVE_STREAMERS_HASMORE,
    payload: val
});