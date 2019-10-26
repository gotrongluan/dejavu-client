import { apiGet, apiPost } from 'utils/request';

export async function fetch(params) {
    return apiGet('transactions/', params);
}

export async function buyCoins(money) {
    return apiPost('transactions/buy-coins', { body: { money } });
}