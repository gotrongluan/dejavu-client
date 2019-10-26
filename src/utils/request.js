/* eslint-disable  consistent-return */
import fetch from 'cross-fetch';
import { notification } from 'antd';
import { history } from 'utils/history';
import storage from 'utils/storage';
import { toQueryString } from 'utils/utils';

const { NODE_ENV, REACT_APP_BACKEND_URL } = process.env;

const codeMessage = {
  200: 'Máy chủ đã trả về thành công dữ liệu được yêu cầu.',
  201: 'Dữ liệu mới hoặc sửa đổi thành công.',
  202: 'Dữ liệu mới hoặc sửa đổi thành công.',
  204: 'Xóa dữ liệu thành công.',
  400: 'Yêu cầu đã được phát hành với một lỗi. Máy chủ không tạo hoặc sửa đổi dữ liệu.',
  401: 'Người dùng không có quyền (mã thông báo, tên người dùng, lỗi mật khẩu).',
  403: 'Người dùng được ủy quyền nhưng quyền truy cập bị cấm.',
  404: 'Không thấy trang yêu cầu',
  406: 'Định dạng được yêu cầu không khả dụng.',
  410: 'Tài nguyên được yêu cầu sẽ bị xóa vĩnh viễn và sẽ không còn khả dụng nữa.',
  422: 'Đã xảy ra lỗi xác thực khi tạo đối tượng.',
  500: 'Đã xảy ra lỗi trên máy chủ. Vui lòng kiểm tra máy chủ.',
  502: 'Bad gateway.',
  503: 'The service is unavailable and the server is temporarily overloaded or maintained.',
  504: 'Đã hết thời gian chờ của cổng.',
};

class ErrorWithReponse extends Error {
    constructor(message, response) {
        super(message);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
        if (response) {
            this.name = response.status;
            this.response = response;
        }
    }
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const errortext = codeMessage[response.status] || response.statusText;
    const error = new ErrorWithReponse(errortext, response);
    throw error;
}

function checkErrorCode(response) {
    if (typeof response === 'object' && typeof response.errorCode !== 'undefined') {
        const errorCode = 1 * response.errorCode;
        if (errorCode !== 0 && errorCode !== 1002) {
        const errortext = response.data || response.message;
        if (errorCode !== 1003)
            notification.error({
            message: 'Lỗi yêu cầu:',
            description: errortext,
            });
        const error = new ErrorWithReponse(errortext, response);
        throw error;
        }
    }
    return response;
}

export default async function request(url, options) {
    const defaultOptions = {
        headers: {
            'Access-Control-Allow-Credentials': false,
        },
    };
    let qs = '';
    const newOptions = { ...defaultOptions, ...options };
    const token = storage.getToken();
    let catchErrorResponse = false;
    if (newOptions.body && !!newOptions.body.catchError) {
        catchErrorResponse = true;
        delete newOptions.body.catchError;
    }
    if (token) {
        newOptions.headers.Authorization = `Bearer ${token}`;
    }
    if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
        if (!(newOptions.body instanceof FormData)) {
            newOptions.headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                ...newOptions.headers,
            };
            newOptions.body = JSON.stringify(newOptions.body);
        }
        else {
            // newOptions.body is FormData
            newOptions.headers = {
                Accept: 'application/json',
                ...newOptions.headers,
            };
        }
    }
    else if (newOptions.method === 'GET') {
        delete options.method;
        qs = toQueryString(options);
    }

    //console.log(`${REACT_APP_BACKEND_URL}/${url}${qs ? `?${qs}` : ''}`);
    return fetch(`https://localhost:4443/${url}${qs ? `?${qs}` : ''}`, newOptions)
        .then(checkStatus)
        .then(response => {
            // DELETE and 204 do not return data by default
            // using .json will report an error.
            if (newOptions.method === 'DELETE' || response.status === 204) {
                return response.text();
            }
            return response.json();
        })
        .then(checkErrorCode)
        .catch(e => {
            notification.error({
                message: `Request error ${e.name}: ${NODE_ENV !== 'production' ? e.response.url : ''}`,
                description: e.message,
            });
            const status = e.name;
            if (status === 401 && window.location.pathname !== '/user/login')
                history.push('/user/login');
            return catchErrorResponse ? e : undefined;
        });
};

export async function apiGet(url, options) {
    return request(url, { method: 'GET', ...options });
}

export async function apiPost(url, options) {
    return request(url, { method: 'POST', ...options });
}

export async function apiPut(url, options) {
    return request(url, { method: 'PUT', ...options });
}

export async function apiDelete(url, options) {
    return request(url, { method: 'DELETE', ...options });
}
