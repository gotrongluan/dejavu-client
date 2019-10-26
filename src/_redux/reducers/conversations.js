import * as actionTypes from '_redux/actions/actionTypes';

export default (state = null, action) => {
    switch(action.type) {
        case actionTypes.SAVE_CONVERSATIONS:
            return { ...action.payload };
        case actionTypes.SAVE_OLD_CONVERSATIONS:
            return {
                ...state,
                ...action.payload,
            };
        case actionTypes.RESET_CONVERSATIONS:
            return null;
        default:
            return state;
    }
};