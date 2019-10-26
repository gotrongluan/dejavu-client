import { apiGet } from 'utils/request';

export async function fetch() {
    return apiGet(`policy/all`);
}