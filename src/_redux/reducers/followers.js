import * as actionTypes from '_redux/actions/actionTypes';

export default (state = {
    numOfFollower: null,
    hasMore: true,
    list: null,
}, action) => {
    switch(action.type) {
        case actionTypes.SAVE_FOLLOWERS:
            return {
                ...state,
                list: [...action.payload]
            };
        case actionTypes.SAVE_OLD_FOLLOWERS:
            return {
                ...state,
                list: [
                    ...state.list,
                    ...action.payload
                ]
            };
        case actionTypes.SAVE_NUM_OF_FOLLOWER:
            return {
                ...state,
                numOfFollower: action.payload
            };
        case actionTypes.RESET_FOLLOWERS:
            return {
                numOfFollower: null,
                hasMore: true,
                list: null,
            };
        case actionTypes.TOGGLE_FOLLOWERS_HASMORE:
            return {
                ...state,
                hasMore: false
            };
        default:
            return state;
    }
};