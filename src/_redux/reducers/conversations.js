import * as ActionTypes from '_redux/actions/actionTypes';

export default (state = null, action) => {
    switch(action.type) {
        case ActionTypes.SAVE_CONVERSATIONS:
            return { ...action.payload };
        case ActionTypes.SAVE_OLD_CONVERSATIONS:
            return {
                ...state,
                ...action.payload,
            };
        case ActionTypes.RESET_CONVERSATIONS:
            return null;
        default:
            return state;
    }
};