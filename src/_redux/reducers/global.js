import * as actionTypes from '_redux/actions/actionTypes';
//import USER from 'assets/faker/user';

export default (state = {
    user: {},
    numOfUnreadMessage: 0,
    numOfUnreadNotification: 0,
}, action) => {
    switch(action.type) {
        case actionTypes.SAVE_USER:
            return {
                ...state,
                user: { ...action.payload }
            };
        case actionTypes.SAVE_NUM_OF_UNREAD:
            return {
                ...state,
                numOfUnreadMessage: action.payload.mess,
                numOfUnreadNotification: action.payload.noti
            }
        case actionTypes.SAVE_COINS:
            return {
                ...state,
                user: {
                    ...state.user,
                    coin: action.payload,
                }
            };
        case actionTypes.RESET_USER:
            return {
                user: {},
                numOfUnreadMessage: 0,
                numOfUnreadNotification: 0
            };
        case actionTypes.SAVE_NUM_OF_UNREAD_NOTI:
            return {
                ...state,
                numOfUnreadNotification: action.payload
            }
        default:
            return state;
    }
};