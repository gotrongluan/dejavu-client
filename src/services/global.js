import { apiPost } from 'utils/request';

export async function login(params) {
    return apiPost('users/login', { body: params });
};