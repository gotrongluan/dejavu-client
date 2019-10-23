import * as ActionTypes from '_redux/actions/actionTypes';
//import USER from 'assets/faker/user';

export default (state = {
    user: {},
    numOfUnreadMessage: 0,
    numOfUnreadNotification: 0,
}, action) => {
    switch(action.type) {
        case ActionTypes.SAVE_USER:
            return {
                ...state,
                user: { ...action.payload }
            };
        case ActionTypes.SAVE_NUM_OF_UNREAD:
            return {
                ...state,
                numOfUnreadMessage: action.payload.mess,
                numOfUnreadNotification: action.payload.noti
            }
        case ActionTypes.SAVE_COINS:
            return {
                ...state,
                user: {
                    ...state.user,
                    coins: action.payload,
                }
            };
        default:
            return state;
    }
};