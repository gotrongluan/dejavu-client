import * as actionTypes from '_redux/actions/actionTypes';

export default (state = {
    hasMore: true,
    list: null,
}, action) => {
    switch(action.type) {
        case actionTypes.SAVE_MESSENGER_POPOVERS:
            return {
                ...state,
                list: {
                    ...action.payload
                }
            }
        case actionTypes.SAVE_OLD_MESSENGER_POPOVERS:
            return {
                ...state,
                list: {
                    ...state.list,
                    ...action.payload
                }
            }
        case actionTypes.RESET_MESSENGER_POPOVERS:
            return {
                hasMore: true,
                list: null
            };
        case actionTypes.TOGGLE_MESS_POP_HASMORE:
            return {
                ...state,
                hasMore: false
            };
        case actionTypes.SAVE_NEW_MESSENGER_POPOVER:
            return {
                ...state,
                list: {
                    ...state.list,
                    [action.payload._id]: {
                        ...action.payload
                    }
                }
            };
        default:
            return state;
    }
};