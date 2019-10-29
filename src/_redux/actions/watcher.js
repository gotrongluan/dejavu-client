import * as actionTypes from './actionTypes';

export const onMessage = payload => ({
    type: actionTypes.ON_MESSAGE,
    payload
});

export const onTokenRefresh = refreshedToken => ({
    type: actionTypes.ON_TOKEN_REFRESH,
    payload: refreshedToken
})