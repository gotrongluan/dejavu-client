import * as ActionTypes from '_redux/actions/actionTypes';
import { access } from 'fs';

export default (state = [], action) => {
    switch(action.type) {
        case ActionTypes.SAVE_TRANSACTIONS:
            return [...action.payload];
        case ActionTypes.SAVE_OLD_TRANSACTIONS:
            return [
                ...state,
                ...action.payload
            ];
        case ActionTypes.RESET_TRANSACTIONS:
            return [];
        default:
            return state;
    }
};