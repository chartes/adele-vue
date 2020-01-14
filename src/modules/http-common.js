import axios from 'axios';
import { getCookie } from './cookies-helpers'
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const _baseApiURL = `${process.env.VUE_APP_API_URL}`;
const _baseAppURL = `${process.env.VUE_APP_ROOT_URL}`;


export const baseApiURL = _baseApiURL;
export const baseAppURL = _baseAppURL;

export const http = axios.create({
  baseURL: _baseApiURL,
  headers: {},
  withCredentials: true
});

function http_with_csrf_token() {
  return http; 
}


// Function that will be called to refresh authorization
const refreshAuthLogic = failedRequest => http.post('refresh', {}, {
  headers: {
    'X-CSRF-TOKEN': getCookie('csrf_refresh_token')
  }
}).then(tokenRefreshResponse => {
    const token = getCookie('csrf_access_token') 
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + token;
    failedRequest.response.config.headers['X-CSRF-Token'] = token;
    return Promise.resolve();
});

createAuthRefreshInterceptor(http, refreshAuthLogic);



/*

http.interceptors.response.use(function (response) {
  return response
}, function (error) {
  const { config, response: { status } } = error;
  const originalRequest = config;

  if (status === 401) {
    console.log("WTF")
    return  new Promise((resolve) => {
      console.warn("MAJ HEADERS");
      console.warn("from ", originalRequest.headers['X-CSRF-Token']);
      originalRequest.headers['X-CSRF-Token'] = getCookie('csrf_access_token');
      originalRequest.baseURL = '';
      console.warn("to ", originalRequest.headers['X-CSRF-Token']);
      resolve(axios(originalRequest));

    });
  }
  return Promise.reject(error)
});

*/

export default http_with_csrf_token;


