import * as ActionTypes from './actionTypes';

export const fetchTransactions = () => ({
    type: ActionTypes.FETCH_TRANSACTIONS
});

export const fetchOldTransactions = () => ({
    type: ActionTypes.FETCH_OLD_TRANSACTIONS
});

export const saveTransactions = transactions => ({
    type: ActionTypes.SAVE_TRANSACTIONS,
    payload: transactions,
});

export const saveOldTransactions = transactions => ({
    type: ActionTypes.SAVE_OLD_TRANSACTIONS,
    payload: transactions,
});

export const resetTransactions = () => ({
    type: ActionTypes.RESET_TRANSACTIONS
});

export const buyCoins = money => ({
    type: ActionTypes.BUY_COINS,
    payload: money
});

export const saveHasmore = val => ({
    type: ActionTypes.SAVE_TRANSACTIONS_HASMORE,
    payload: val
});