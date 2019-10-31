import { apiPost } from 'utils/request';

export async function send(message) {
    return apiPost('messages/', {
        body: message
    });
};