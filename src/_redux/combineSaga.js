import { all } from 'redux-saga/effects';
import globalSaga from './sagas/global';
import messengerPopoverSaga from './sagas/messengerPopover';
import notificationPopoverSaga from './sagas/notificationPopover';
import followerSaga from './sagas/followers';
import followingSaga from './sagas/followings';
import transactionSaga from './sagas/transactions';
import coinPolicySaga from './sagas/coinPolicy';
import notificationSaga from './sagas/notifications';
import conversationSaga from './sagas/conversations';
import messageSaga from './sagas/messages';
import streamerSaga from './sagas/streamer';
import watcherSaga from './sagas/watcher';

export function* rootSaga() {
    yield all([
        globalSaga(),
        followerSaga(),
        followingSaga(),
        transactionSaga(),
        coinPolicySaga(),
        messengerPopoverSaga(),
        notificationPopoverSaga(),
        notificationSaga(),
        conversationSaga(),
        messageSaga(),
        streamerSaga(),
        watcherSaga()
    ]);
}