import * as actionTypes from '_redux/actions/actionTypes';

export default (state = {
    streamer: null,
    gifts: null,
}, action) => {
    switch(action.type) {
        case actionTypes.RESET_VIEW_STREAM:
            return {
                streamer: null,
                gifts: null
            };
        case actionTypes.SAVE_STREAMER_VT:
            return {
                ...state,
                streamer: { ...action.payload }
            };
        case actionTypes.SAVE_GIFTS:
            return {
                ...state,
                gifts: [...action.payload]
            };
        default:
            return state;
    }
}