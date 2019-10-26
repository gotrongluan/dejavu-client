import * as actionTypes from './actionTypes';

export const fetchFollowers = () => ({
    type: actionTypes.FETCH_FOLLOWERS,
});

export const fetchOldFollowers = () => ({
    type: actionTypes.FETCH_OLD_FOLLOWERS,
});

export const fetchNumOfFollower = () => ({
    type: actionTypes.FETCH_NUM_OF_FOLLOWER,
});

export const saveFollowers = followers => ({
    type: actionTypes.SAVE_FOLLOWERS,
    payload: followers,
});

export const saveOldFollowers = followers => ({
    type: actionTypes.SAVE_OLD_FOLLOWERS,
    payload: followers,
});

export const saveNumOfFollower = val => ({
    type: actionTypes.SAVE_NUM_OF_FOLLOWER,
    payload: val,
});

export const resetFollowers = () => ({
    type: actionTypes.RESET_FOLLOWERS,
});

export const toggleFollowersHasmore = () => ({
    type: actionTypes.TOGGLE_FOLLOWERS_HASMORE
});