import { apiPut } from 'utils/request';

export async function sendFCMToken(fcmToken) {
    return apiPut('users/saveFCMToken', { body: { fcmToken } });
}