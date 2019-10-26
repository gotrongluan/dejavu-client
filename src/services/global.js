import { apiGet, apiPost } from 'utils/request';

export async function login(params) {
    return apiPost('users/login', { body: params });
};

export async function fetchUser() {
    return apiGet('users/me');
}

export async function signup(params) {
    return apiPost('users/signup', { body: params });
}