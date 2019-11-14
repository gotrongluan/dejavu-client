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
        case actionTypes.DELETE_FIRST_CONVERSATION:
            return {
                ...state,
                first: null
            };
        case actionTypes.UPDATE_ONE_CONVERSATION:
            const conversation = state.list[action.payload._id] ? state.list[action.payload._id] : {};
            return {
                ...state,
                list: {
                    ...state.list,
                    [action.payload._id]: {
                        ...conversation,
                        ...action.payload
                    }
                }
            };
        case actionTypes.UPDATE_SEEN_STATUS:
            return {
                ...state,
                list: {
                    ...state.list,
                    [action.payload.converId]: {
                        ...state.list[action.payload.converId],
                        seen: action.payload.status
                    }
                }
            }
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
        case actionTypes.UPDATE_LAST_MESS_AND_UPDATED_AT:
            return {
                ...state,
                list: {
                    ...state.list,
                    [action.payload.converId]: {
                        ...state.list[action.payload.converId],
                        updatedAt: action.payload.updatedAt,
                        lastMessage: action.payload.lastMessage,
                    }
                }
            };
        default:
            return state;
    }
};