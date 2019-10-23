import * as ActionTypes from '_redux/actions/actionTypes';

export default (state = null, action) => {
    switch(action.type) {
        case ActionTypes.SAVE_NOTIFICATIONS:
            return [ ...action.payload ];
        case ActionTypes.SAVE_OLD_NOTIFICATIONS:
            return [
                ...state,
                ...action.payload,
            ];
        case ActionTypes.RESET_NOTIFICATIONS:
            return null;
        default:
            return state;
    }
};