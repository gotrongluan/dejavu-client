import * as actionTypes from './actionTypes';

export const fetchStreamerVT = id => ({
    type: actionTypes.FETCH_STREAMER_VT,
    payload: id
});

export const fetchGifts = () => ({
    type: actionTypes.FETCH_GIFTS
});

export const saveStreamerVT = streamer => ({
    type: actionTypes.SAVE_STREAMER_VT,
    payload: streamer
});

export const saveGifts = gifts => ({
    type: actionTypes.SAVE_GIFTS,
    payload: gifts
});

export const resetViewStream = () => ({
    type: actionTypes.RESET_VIEW_STREAM
});

export const viewStream = streamId => ({
    type: actionTypes.VIEW_STREAM,
    payload: streamId,
});

export const saveHlsUrl = url => ({
    type: actionTypes.SAVE_HLS_URL,
    payload: url
});