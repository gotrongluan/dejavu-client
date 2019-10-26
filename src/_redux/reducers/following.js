import * as actionTypes from '_redux/actions/actionTypes';

export default (state = {
    numOfFollowing: null,
    hasMore: true,
    list: null,
}, action) => {
    switch(action.type) {
        case actionTypes.SAVE_FOLLOWINGS:
            return {
                ...state,
                list: [...action.payload]
            };
        case actionTypes.SAVE_OLD_FOLLOWINGS:
            return {
                ...state,
                list: [
                    ...state.list,
                    ...action.payload
                ]
            };
        case actionTypes.SAVE_NUM_OF_FOLLOWING:
            return {
                ...state,
                numOfFollowing: action.payload
            };
        case actionTypes.RESET_FOLLOWINGS:
            return {
                numOfFollowing: null,
                hasMore: true,
                list: null
            };
        case actionTypes.TOGGLE_FOLLOWINGS_HASMORE:
            return {
                ...state,
                hasMore: false
            };
        default:
            return state;
    }
};