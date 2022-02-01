import axios from 'axios';
import store from '../store'

const _baseApiURL = `${process.env.VUE_APP_API_URL}`;
const _baseAppURL = `${process.env.VUE_APP_ROOT_URL}`;


export const baseApiURL = _baseApiURL;
export const baseAppURL = _baseAppURL;

export const http = axios.create({
  baseURL: _baseApiURL,
  withCredentials: true
});

http.interceptors.request.use((config) => {
  const jwt = store.state.user.jwt;
  if (jwt) {
    config.headers['Authorization'] = `Bearer ${jwt}`
  }
  return config
})


export function isValidJwt(jwt) {
  if (!jwt || jwt.split(".").length < 3) {
    return false;
  }
  const data = JSON.parse(atob(jwt.split(".")[1]))
  const exp = new Date(data.exp * 1000); // JS deals with dates in milliseconds since epoch
  const now = new Date()
  return now < exp
} 

export function getCurrentUser() {
  return http.get(`${_baseApiURL}/current-user`);
}


export default http;


