import { combineReducers } from 'redux';
import coinPolicyReducer from './reducers/coinPolicy';
import conversationsReducer from './reducers/conversations';
import followersReducer from './reducers/followers';
import followingReducer from './reducers/following';
import giftsReducer from './reducers/gifts';
import messagesReducer from './reducers/messages';
import messengerPopoverReducer from './reducers/messengerPopover';
import notificationPopoverReducer from './reducers/notificationPopover';
import notificationsReducer from './reducers/notifications';
import streamerReducer from './reducers/streamer';
import streamersReducer from './reducers/streamers';
import transactionsReducer from './reducers/transactions';
import globalReducer from './reducers/global';
import loadingReducer from './reducers/loading';
import errorReducer from './reducers/error';

const reducer = combineReducers({
    coinPolicy: coinPolicyReducer,
    conversations: conversationsReducer,
    followers: followersReducer,
    followings: followingReducer,
    gifts: giftsReducer,
    messages: messagesReducer,
    messengerPopover: messengerPopoverReducer,
    notificationPopover: notificationPopoverReducer,
    notifications: notificationsReducer,
    streamer: streamerReducer,
    streamers: streamersReducer,
    transactions: transactionsReducer,
    global: globalReducer,
    error: errorReducer,
    loading: loadingReducer,
});

export default reducer;
