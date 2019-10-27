import * as actionTypes from '_redux/actions/actionTypes';

export default (state = {
    hasMore: true,
    list: null,
}, action) => {
    switch(action.type) {
        case actionTypes.SAVE_NOTIFICATIONS:
            return {
                ...state,
                list: [...action.payload]
            }
        case actionTypes.SAVE_OLD_NOTIFICATIONS:
            return {
                ...state,
                list: [
                    ...state.list,
                    ...action.payload
                ]
            }
        case actionTypes.RESET_NOTIFICATIONS:
            return {
                hasMore: true,
                list: null
            };
        case actionTypes.TOGGLE_NOTI_HASMORE:
            return {
                ...state,
                hasMore: false
            };
        default:
            return state;
    }
};