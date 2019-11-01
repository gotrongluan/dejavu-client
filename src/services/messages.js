import { apiGet, apiPost } from 'utils/request';

export async function send(message) {
    return apiPost('messages/', {
        body: message
    });
};

export async function fetch(params) {
    return apiGet('messages/', params);
}