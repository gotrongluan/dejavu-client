import * as ActionTypes from 'redux-config/actions/actionTypes';

export default (state = {
    user: {},
    numOfUnreadMessage: 0,
    numOfUnreadNotification: 0
}, action) => {
    switch(action.type) {
        default:
            return state;
    }
};