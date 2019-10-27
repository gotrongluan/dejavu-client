import { apiGet } from 'utils/request';

export async function fetch(params) {
    return apiGet(`notifications/`, params);
};