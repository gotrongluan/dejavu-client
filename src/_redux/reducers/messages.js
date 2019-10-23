import * as ActionTypes from '_redux/actions/actionTypes';

export default (state = {
    current: null,
    old: [],
    new: [],
    sending: []
}, action) => {
    switch(action.type) {
        case ActionTypes.SAVE_MESSAGES:
            return {
                ...state,
                old: [ ...action.payload ],
            };
        case ActionTypes.SAVE_OLD_MESSAGES:
            return {
                ...state,
                old: [
                    ...action.payload,
                    ...state.old
                ]
            };
        case ActionTypes.RESET_MESSAGES:
            return {
                ...state,
                old: [],
                new: [],
                sending: []
            };
        case ActionTypes.SAVE_CURRENT_USER:
            return {
                ...state,
                current: { ...action.payload }
            };
        case ActionTypes.RESET_CURRENT_USER:
            return {
                ...state,
                current: null
            };
        default:
            return state;
    }
};