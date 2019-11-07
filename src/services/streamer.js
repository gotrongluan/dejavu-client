import { apiGet, apiPost, apiDelete } from 'utils/request';

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

export async function fetchStreamer(id) {
    return apiGet(`streamers/${id}`);
}

export async function follow(id) {
    return apiPost('follows/follow', { body: { followedId: id } });
}

export async function unfollow(id) {
    return apiDelete(`follows/${id}/unfollow`);
}