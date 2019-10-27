import { apiGet, apiPut } from 'utils/request';

export async function read(id) {
    return apiPut(`notifications/${id}/read`);
};

export async function fetch(params) {
    return apiGet(`notifications/`, params);
};