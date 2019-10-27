import * as actionTypes from './actionTypes';

export const fetchFollowers = streamerId => ({
    type: actionTypes.FETCH_STREAMER_FOLLOWERS,
    payload: streamerId,
});

export const fetchOldFollowers = streamerId => ({
    type: actionTypes.FETCH_STREAMER_OLD_FOLLOWERS,
    payload: streamerId
});

export const fetchNumOfFollower = streamerId => ({
    type: actionTypes.FETCH_STREAMER_NUM_OF_FOLLOWER,
    payload: streamerId
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

export const fetchFollowings = streamerId => ({
    type: actionTypes.FETCH_STREAMER_FOLLOWINGS,
    payload: streamerId
});

export const fetchOldFollowings = streamerId => ({
    type: actionTypes.FETCH_STREAMER_OLD_FOLLOWINGS,
    payload: streamerId
});

export const fetchNumOfFollowing = streamerId => ({
    type: actionTypes.FETCH_STREAMER_NUM_OF_FOLLOWING,
    payload: streamerId
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

export const resetProfile = () => ({
    type: actionTypes.RESET_PROFILE
});

export const fetchStreamer = id => ({
    type: actionTypes.FETCH_STREAMER,
    payload: id
});

export const saveProfile = profile => ({
    type: actionTypes.SAVE_PROFILE,
    payload: profile
});

export const follow = streamerId => ({
    type: actionTypes.FOLLOW,
    payload: streamerId
});

export const unfollow = streamerId => ({
    type: actionTypes.UNFOLLOW,
    payload: streamerId
});

export const saveFollow = val => ({
    type: actionTypes.SAVE_FOLLOW,
    payload: val
});