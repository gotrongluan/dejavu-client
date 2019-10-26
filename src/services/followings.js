import { apiGet } from 'utils/request';

export async function fetch(params) {
    return apiGet(`follows/followings`, params);
}

export async function fetchNumOfFollowing() {
    return apiGet(`follows/num-followings`);
}