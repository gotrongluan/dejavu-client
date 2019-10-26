import { apiGet } from 'utils/request';

export async function fetch(params) {
    return apiGet(`follows/followers`, params);
}

export async function fetchNumOfFollower() {
    return apiGet(`follows/num-followers`);
}