import * as ActionTypes from './actionTypes';

export const fetchFollowings = () => ({
    type: ActionTypes.FETCH_FOLLOWINGS,
});

export const fetchOldFollowings = () => ({
    type: ActionTypes.FETCH_OLD_FOLLOWINGS,
});

export const fetchNumOfFollowing = () => ({
    type: ActionTypes.FETCH_NUM_OF_FOLLOWING,
});

export const saveFollowings = followers => ({
    type: ActionTypes.SAVE_FOLLOWINGS,
    payload: followers,
});

export const saveOldFollowings = followers => ({
    type: ActionTypes.SAVE_OLD_FOLLOWINGS,
    payload: followers,
});

export const saveNumOfFollowing = val => ({
    type: ActionTypes.SAVE_NUM_OF_FOLLOWING,
    payload: val,
});

export const resetFollowings = () => ({
    type: ActionTypes.RESET_FOLLOWINGS,
});

export const toggleFollowingsHasmore = () => ({
    type: ActionTypes.TOGGLE_FOLLOWINGS_HASMORE
});