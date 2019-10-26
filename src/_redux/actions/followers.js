import * as ActionTypes from './actionTypes';

export const fetchFollowers = () => ({
    type: ActionTypes.FETCH_FOLLOWERS,
});

export const fetchOldFollowers = () => ({
    type: ActionTypes.FETCH_OLD_FOLLOWERS,
});

export const fetchNumOfFollower = () => ({
    type: ActionTypes.FETCH_NUM_OF_FOLLOWER,
});

export const saveFollowers = followers => ({
    type: ActionTypes.SAVE_FOLLOWERS,
    payload: followers,
});

export const saveOldFollowers = followers => ({
    type: ActionTypes.SAVE_OLD_FOLLOWERS,
    payload: followers,
});

export const saveNumOfFollower = val => ({
    type: ActionTypes.SAVE_NUM_OF_FOLLOWER,
    payload: val,
});

export const resetFollowers = () => ({
    type: ActionTypes.RESET_FOLLOWERS,
});

export const toggleFollowersHasmore = () => ({
    type: ActionTypes.TOGGLE_FOLLOWERS_HASMORE
});