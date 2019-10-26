import * as actionTypes from './actionTypes';

export const fetchFollowers = () => ({
    type: actionTypes.FETCH_STREAMER_FOLLOWERS,
});

export const fetchOldFollowers = () => ({
    type: actionTypes.FETCH_STREAMER_OLD_FOLLOWERS,
});

export const fetchNumOfFollower = () => ({
    type: actionTypes.FETCH_STREAMER_NUM_OF_FOLLOWER,
});

export const saveFollowers = followers => ({
    type: actionTypes.SAVE_STREAMER_FOLLOWERS,
    payload: followers,
});

export const saveOldFollowers = followers => ({
    type: actionTypes.SAVE_STREAMER_OLD_FOLLOWERS,
    payload: followers,
});

export const saveNumOfFollower = val => ({
    type: actionTypes.SAVE_STREAMER_NUM_OF_FOLLOWER,
    payload: val,
});

export const resetFollowers = () => ({
    type: actionTypes.RESET_STREAMER_FOLLOWERS,
});

export const toggleFollowersHasmore = () => ({
    type: actionTypes.TOGGLE_STREAMER_FOLLOWERS_HASMORE
});

export const fetchFollowings = () => ({
    type: actionTypes.FETCH_STREAMER_FOLLOWINGS,
});

export const fetchOldFollowings = () => ({
    type: actionTypes.FETCH_STREAMER_OLD_FOLLOWINGS,
});

export const fetchNumOfFollowing = () => ({
    type: actionTypes.FETCH_STREAMER_NUM_OF_FOLLOWING,
});

export const saveFollowings = followers => ({
    type: actionTypes.SAVE_STREAMER_FOLLOWINGS,
    payload: followers,
});

export const saveOldFollowings = followers => ({
    type: actionTypes.SAVE_STREAMER_OLD_FOLLOWINGS,
    payload: followers,
});

export const saveNumOfFollowing = val => ({
    type: actionTypes.SAVE_STREAMER_NUM_OF_FOLLOWING,
    payload: val,
});

export const resetFollowings = () => ({
    type: actionTypes.RESET_STREAMER_FOLLOWINGS,
});

export const toggleFollowingsHasmore = () => ({
    type: actionTypes.TOGGLE_STREAMER_FOLLOWINGS_HASMORE
});