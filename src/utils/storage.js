const getToken = () => {
    return localStorage.getItem('token');
}

const setToken = token => {
    if (token)
        return localStorage.setItem('token', token);
    const current = getToken();
    if (current)
        localStorage.removeItem('token');
}

const getFCMToken = () => {
    return localStorage.getItem('FCMToken');
}

const setFCMToken = token => {
    if (token)
        return localStorage.setItem('FCMToken', token);
    const current = getFCMToken();
    if (current)
        localStorage.removeItem('FCMToken');
}

export default {
    getToken, setToken, getFCMToken, setFCMToken
};