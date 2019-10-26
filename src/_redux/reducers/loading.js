import * as actionTypes from '_redux/actions/actionTypes';

export default (state = {}, action) => {
    switch(action.type) {
        case actionTypes.SAVE_LOADING:
            return {
                ...state,
                [action.payload.key]: action.payload.val
            };
        default:
            return state;
    }
};