import * as actionTypes from '_redux/actions/actionTypes';

export default (state = {
    hasMore: true,
    list: null,
    first: null
}, action) => {
    switch(action.type) {
        case actionTypes.SAVE_FIRST_CONVERSATION:
            return {
                ...state,
                first: { ...action.payload }
            };
        case actionTypes.SAVE_CONVERSATIONS:
            return {
                ...state,
                list: { ...action.payload },
            };
        case actionTypes.SAVE_OLD_CONVERSATIONS:
            return {
                ...state,
                list: {
                    ...state.list,
                    ...action.payload,
                },
            };
        case actionTypes.RESET_CONVERSATIONS:
            return {
                hasMore: true,
                list: null,
                first: null
            };
        case actionTypes.TOGGLE_CONVER_HASMORE:
            return {
                ...state,
                hasMore: false,
            };
        default:
            return state;
    }
};