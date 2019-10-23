import * as ActionTypes from './actionTypes';

export const saveLoading = (key, val) => ({
    type: ActionTypes.SAVE_LOADING,
    payload: {
        key, val
    }
})