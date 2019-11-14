/* eslint-disable  consistent-return */
import fetch from 'cross-fetch';
import { notification } from 'antd';

const { NODE_ENV, REACT_APP_WSC_HOST, REACT_APP_WSC_VERSION, REACT_APP_WSC_ACCESS_KEY, REACT_APP_WSC_API_KEY } = process.env;

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

export async function wowzaApiGet(url, options) {
    const newOptions = {
        method: 'GET',
        ...options,
        headers: {
            Accept: 'application/json',
            'wsc-api-key': REACT_APP_WSC_API_KEY,
            'wsc-access-key': REACT_APP_WSC_ACCESS_KEY
        }
    };

    return fetch(`${REACT_APP_WSC_HOST}/api/${REACT_APP_WSC_VERSION}/${url}`, newOptions)
        .then(checkStatus)
        .then(response => response.json())
        .catch(e => {
            notification.error({
                message: `Request error ${e.name}: ${NODE_ENV !== 'production' ? e.response.url : ''}`,
                description: e.message,
            });
            return undefined;
        });
}