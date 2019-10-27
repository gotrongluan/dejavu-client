import { apiGet } from 'utils/request';

export async function fetchFollowers(params) {
    return apiGet('follows/followers', params);
}

export async function fetchFollowings(params) {
    return apiGet('follows/followings', params);
}

export async function fetchNumOfFollower(userId) {
    return apiGet(`follows/num-followers?userId=${userId}`);
}

export async function fetchNumOfFollowing(userId) {
    return apiGet(`follows/num-followings?userId=${userId}`);
}