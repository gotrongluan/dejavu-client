import * as actionTypes from '_redux/actions/actionTypes';
import _ from 'lodash';

export default (state = {
    current: null,
    old: [],
    new: [],
    sending: []
}, action) => {
    switch(action.type) {
        case actionTypes.ADD_SENDING_MESSAGE:
            return {
                ...state,
                sending: [
                    ...state.sending,
                    action.payload
                ]
            };
        case actionTypes.DELETE_SENDING_MESSAGE:
            return {
                ...state,
                sending: _.filter(state.sending, message => message._id !== action.payload),
            };
        case actionTypes.ADD_NEW_MESSAGE:
            return {
                ...state,
                new: [
                    ...state.new,
                    action.payload
                ]
            };
        case actionTypes.SAVE_MESSAGES:
            return {
                ...state,
                old: [ ...action.payload ],
            };
        case actionTypes.SAVE_OLD_MESSAGES:
            return {
                ...state,
                old: [
                    ...action.payload,
                    ...state.old
                ]
            };
        case actionTypes.RESET_MESSAGES:
            return {
                ...state,
                old: [],
                new: [],
                sending: []
            };
        case actionTypes.SAVE_CURRENT_USER:
            return {
                ...state,
                current: { ...action.payload }
            };
        case actionTypes.RESET_CURRENT_USER:
            return {
                ...state,
                current: null
            };
        default:
            return state;
    }
};