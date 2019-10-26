import * as actionTypes from '_redux/actions/actionTypes';

export default (state = {
    hasMore: true,
    list: null
}, action) => {
    switch(action.type) {
        case actionTypes.SAVE_TRANSACTIONS:
            return {
                ...state,
                list: [ ...action.payload ]
            };
        case actionTypes.SAVE_OLD_TRANSACTIONS:
            return {
                ...state,
                list: [
                    ...state.list,
                    ...action.payload
                ]
            };
        case actionTypes.RESET_TRANSACTIONS:
            return {
                hasMore: true,
                list: null
            };
        case actionTypes.SAVE_TRANSACTIONS_HASMORE:
            return {
                ...state,
                hasMore: action.payload
            };
        default:
            return state;
    }
};