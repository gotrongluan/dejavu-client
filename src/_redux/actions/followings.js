import * as actionTypes from './actionTypes';

export const fetchFollowings = () => ({
    type: actionTypes.FETCH_FOLLOWINGS,
});

export const fetchOldFollowings = () => ({
    type: actionTypes.FETCH_OLD_FOLLOWINGS,
});

export const fetchNumOfFollowing = () => ({
    type: actionTypes.FETCH_NUM_OF_FOLLOWING,
});

export const saveFollowings = followers => ({
    type: actionTypes.SAVE_FOLLOWINGS,
    payload: followers,
});

export const saveOldFollowings = followers => ({
    type: actionTypes.SAVE_OLD_FOLLOWINGS,
    payload: followers,
});

export const saveNumOfFollowing = val => ({
    type: actionTypes.SAVE_NUM_OF_FOLLOWING,
    payload: val,
});

export const resetFollowings = () => ({
    type: actionTypes.RESET_FOLLOWINGS,
});

export const toggleFollowingsHasmore = () => ({
    type: actionTypes.TOGGLE_FOLLOWINGS_HASMORE
});