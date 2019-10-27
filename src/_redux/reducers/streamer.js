import * as actionTypes from '_redux/actions/actionTypes';

export default (state = {
    profile: {},
    followers: {
        numOfFollower: 0,
        list: null,
        hasMore: true,
    },
    followings: {
        numOfFollowing: 0,
        list: null,
        hasMore: true
    }
}, action) => {
    switch(action.type) {
        case actionTypes.SAVE_STREAMER_FOLLOWERS:
            return {
                ...state,
                followers: {
                    ...state.followers,
                    list: [...action.payload]
                }
            };
        case actionTypes.SAVE_STREAMER_OLD_FOLLOWERS:
            return {
                ...state,
                followers: {
                    ...state.followers,
                    list: [
                        ...state.followers.list,
                        ...action.payload
                    ]
                }
            };
        case actionTypes.SAVE_STREAMER_NUM_OF_FOLLOWER:
            return {
                ...state,
                followers: {
                    ...state.followers,
                    numOfFollower: action.payload
                }
            };
        case actionTypes.SAVE_STREAMER_FOLLOWINGS:
            return {
                ...state,
                followings: {
                    ...state.followings,
                    list: [...action.payload]
                }
            };
        case actionTypes.SAVE_STREAMER_OLD_FOLLOWINGS:
            return {
                ...state,
                followings: {
                    ...state.followings,
                    list: [
                        ...state.followings.list,
                        ...action.payload
                    ]
                }
            };
        case actionTypes.SAVE_STREAMER_NUM_OF_FOLLOWING:
            return {
                ...state,
                followings: {
                    ...state.followings,
                    numOfFollowing: action.payload
                }
            };
        case actionTypes.RESET_STREAMER_FOLLOWERS:
            return {
                ...state,
                followers: {
                    list: null,
                    numOfFollower: 0,
                    hasMore: true
                }
            };
        case actionTypes.TOGGLE_STREAMER_FOLLOWERS_HASMORE:
            return {
                ...state,
                followers: {
                    ...state.followers,
                    hasMore: false
                }
            };
        case actionTypes.RESET_STREAMER_FOLLOWINGS:
            return {
                ...state,
                followings: {
                    list: null,
                    numOfFollowing: 0,
                    hasMore: true
                }
            };
        case actionTypes.TOGGLE_STREAMER_FOLLOWINGS_HASMORE:
            return {
                ...state,
                followings: {
                    ...state.followings,
                    hasMore: false
                }
            };
        case actionTypes.SAVE_PROFILE:
            return {
                ...state,
                profile: { ...action.payload }
            }
        case actionTypes.RESET_PROFILE:
            return {
                ...state,
                profile: {}
            }
        case actionTypes.SAVE_FOLLOW:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    followed: action.payload
                }
            };
        default:
            return state;
    }
};