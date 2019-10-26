import * as actionTypes from '_redux/actions/actionTypes';

export default (state = null, action) => {
    switch(action.type) {
        case actionTypes.SAVE_COIN_POLICY:
            return [...action.payload];
        case actionTypes.RESET_COIN_POLICY:
            return null;
        default:
            return state;
    }
};