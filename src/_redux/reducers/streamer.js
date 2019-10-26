import * as actionTypes from '_redux/actions/actionTypes';

export default (state = {
    profile: {},
    followers: {
        numOfFollower: 0,
        list: null,
        hasMore: true,
    },
    following: {
        numOfFollowing: 0,
        list: null,
        hasMore: true
    }
}, action) => {
    switch(action.type) {
        default:
            return state;
    }
};