import * as ActionTypes from '_redux/actions/actionTypes';

export default (state = [], action) => {
    switch(action.type) {
        case ActionTypes.SAVE_COIN_POLICY:
            return [...action.payload];
        case ActionTypes.RESET_COIN_POLICY:
            return [];
        default:
            return state;
    }
};