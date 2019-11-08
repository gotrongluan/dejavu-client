import { apiGet, apiPut } from 'utils/request';
import { wowzaApiGet } from 'utils/wowza';

export async function fetchStreamer(streamerId) {
    return apiGet(`view-stream/streamer/${streamerId}`);
}

export async function viewStream(streamId) {
    return wowzaApiGet(`live_streams/${streamId}`);
}

export async function fetchGifts() {
    return apiGet(`gifts`);
}

export async function sendGift(params) {
    return apiPut('gifts/send', { body: params });
}