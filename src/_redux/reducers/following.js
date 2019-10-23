import * as ActionTypes from '_redux/actions/actionTypes';

export default (state = {
    numOfFollowing: null,
    list: null,
}, action) => {
    switch(action.type) {
        case ActionTypes.SAVE_FOLLOWINGS:
            return {
                ...state,
                list: [...action.payload]
            };
        case ActionTypes.SAVE_OLD_FOLLOWINGS:
            return {
                ...state,
                list: [
                    ...state.list,
                    ...action.payload
                ]
            };
        case ActionTypes.SAVE_NUM_OF_FOLLOWING:
            return {
                ...state,
                numOfFollowing: action.payload
            };
        case ActionTypes.RESET_FOLLOWINGS:
            return {
                numOfFollowing: null,
                list: null
            };
        default:
            return state;
    }
};