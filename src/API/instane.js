import axios from 'axios';
import Cookies from 'js-cookie';
import { visitor } from './Visistor/visitor';

const instane = axios.create({
  // baseURL: 'https://api.fita.io.vn',
  baseURL: 'http://localhost:8080',
  headers: {
    'ngrok-skip-browser-warning': '1',
  },
});

instane.interceptors.request.use(
  (req) => {
    const tokenAdmin = Cookies.get('accessTokenAdmin');
    const tokenStudent = Cookies.get('accessTokenStudent');
    if (tokenAdmin || tokenStudent) {
      req.headers['Authorization'] = `Bearer ${tokenAdmin || tokenStudent}`;
    }
    return req;
  },
  (err) => {
    return Promise.reject(err);
  },
);

instane.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const originalConfig = error.config;
    const refreshToken = Cookies.get('refresh_token');
    if (error && error.success === false && error.error?.code === 4) {
      try {
        const dataRefresh = await visitor.refreshToken({
          refreshToken: refreshToken,
        });
        if (dataRefresh) {
          const { token, data } = dataRefresh.data;
          Cookies.set('refresh_token', data);
          originalConfig.header['Authorization'] = `Bearer ${token}`;
          return instane(originalConfig);
        }
      } catch (error) {
        if (error && error.succes === false) {
          Cookies.remove('refresh_token');
          localStorage.removeItem('info_admin');
          localStorage.removeItem('info_student');
          window.location.href = '/';
        }
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
export default instane;
