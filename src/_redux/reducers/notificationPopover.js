import * as ActionTypes from '_redux/actions/actionTypes';

export default (state = null, action) => {
    switch(action.type) {
        case ActionTypes.SAVE_NOTIFICATION_POPOVERS:
            return [ ...action.payload ];
        case ActionTypes.SAVE_OLD_NOTIFICATION_POPOVERS:
            return [
                ...state,
                ...action.payload
            ];
        case ActionTypes.RESET_NOTIFICATION_POPOVERS:
            return null;
        default:
            return state;
    }
};