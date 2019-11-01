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
                new: [],
                sending: []
            };
        case actionTypes.SAVE_OLD_MESSAGES:
            return {
                ...state,
                old: [
                    ...action.payload,
                    ...state.old
                ]
            };
        case actionTypes.UPDATE_CONVER_ID:
            return {
                ...state,
                current: {
                    ...state.current,
                    converId: action.payload
                }
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
        case actionTypes.UPDATE_SEEN_MESSAGES:
            const oldMessages = state.old;
            const newMessages = state.new;
            console.log(newMessages);
            const messageIds = action.payload;
            const updateOldMessages = _.map(oldMessages, mess => {
                const newMess = { ...mess };
                if (_.indexOf(messageIds, newMess._id) > -1) {
                    newMess.seenAt = Date.now();
                }
                return newMess;
            });
            const updateNewMessages = _.map(newMessages, mess => {
                const newMess = { ...mess };
                if (_.indexOf(messageIds, newMess._id) > -1) {
                    newMess.seenAt = Date.now();
                }
                return newMess;
            });
            console.log(updateNewMessages);
            return {
                ...state,
                old: updateOldMessages,
                new: updateNewMessages
            };
        default:
            return state;
    }
};