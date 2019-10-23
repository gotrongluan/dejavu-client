import * as ActionTypes from '_redux/actions/actionTypes';

export default (state = {
    numOfFollower: null,
    list: null,
}, action) => {
    switch(action.type) {
        case ActionTypes.SAVE_FOLLOWERS:
            return {
                ...state,
                list: [...action.payload]
            };
        case ActionTypes.SAVE_OLD_FOLLOWERS:
            return {
                ...state,
                list: [
                    ...state.list,
                    ...action.payload
                ]
            };
        case ActionTypes.SAVE_NUM_OF_FOLLOWER:
            return {
                ...state,
                numOfFollower: action.payload
            };
        case ActionTypes.RESET_FOLLOWERS:
            return {
                numOfFollower: null,
                list: null,
            };
        default:
            return state;
    }
};