import * as actionTypes from '_redux/actions/actionTypes';

export default (state = {
    hasMore: true,
    list: null,
}, action) => {
    switch(action.type) {
        case actionTypes.SAVE_NOTIFICATION_POPOVERS:
            return {
                ...state,
                list: [...action.payload]
            }
        case actionTypes.SAVE_OLD_NOTIFICATION_POPOVERS:
            return {
                ...state,
                list: [
                    ...state.list,
                    ...action.payload
                ]
            }
        case actionTypes.RESET_NOTIFICATION_POPOVERS:
            return {
                hasMore: true,
                list: null
            };
        case actionTypes.TOGGLE_NOTI_POP_HASMORE:
            return {
                ...state,
                hasMore: false
            };
        case actionTypes.SAVE_NEW_NOTIFICATION_POPOVER:
            return {
                ...state,
                list: [
                    action.payload,
                    ...state.list
                ]
            };
        default:
            return state;
    }
};