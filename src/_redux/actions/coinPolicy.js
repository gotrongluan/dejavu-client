import * as ActionTypes from './actionTypes';

export const fetchCoinPolicy = () => ({
    type: ActionTypes.FETCH_COIN_POLICY
});

export const saveCoinPolicy = policy => ({
    type: ActionTypes.SAVE_COIN_POLICY,
    payload: policy,
});