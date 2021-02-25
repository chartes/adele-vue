import axios from 'axios';
import { getCookie } from './cookies-helpers'
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const _baseApiURL = `${process.env.VUE_APP_API_URL}`;
const _baseAppURL = `${process.env.VUE_APP_ROOT_URL}`;


export const baseApiURL = _baseApiURL;
export const baseAppURL = _baseAppURL;

export const http = axios.create({
  baseURL: _baseApiURL,
  headers: {
    //'X-CSRF-TOKEN': getCookie('csrf_refresh_token')
  },
  withCredentials: true
});

// Function that will be called to refresh authorization
const refreshAuthLogic = failedRequest => http.post('refresh', {}, {
  headers: {
    'X-CSRF-TOKEN': getCookie('access_token_cookie')
  }
}).then(tokenRefreshResponse => {
    const token = getCookie('access_token_cookie') 

    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + token;
    failedRequest.response.config.headers['X-CSRF-Token'] = token;
    return Promise.resolve();
});

createAuthRefreshInterceptor(http, refreshAuthLogic);


export default http;


