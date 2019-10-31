import { apiGet } from 'utils/request';

export async function fetch(params) {
    return apiGet('conversations/', params);
};

export async function checkConversation(id) {
    return apiGet(`conversations/check?partnerId=${id}`);
}
