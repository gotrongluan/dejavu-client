import * as ActionTypes from '_redux/actions/actionTypes';

export default (state = null, action) => {
    switch(action.type) {
        case ActionTypes.SAVE_MESSENGER_POPOVERS:
            return { ...action.payload };
        case ActionTypes.SAVE_OLD_MESSENGER_POPOVERS:
            return {
                ...state,
                ...action.payload
            };
        case ActionTypes.RESET_MESSENGER_POPOVERS:
            return null;
        default:
            return state;
    }
};