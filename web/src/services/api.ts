import Router from 'next/router';
import axios from 'axios';
import { parseCookies } from 'nookies';

const { 'canvance.token': token } = parseCookies();

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

if (token) {
  api.defaults.headers['Authorization'] = `Bearer ${token}`;
}

api.interceptors.request.use(
  (config) => config,
  (error) => {
    if (error.response.status == 401) {
      console.log('Unauthorized');

      Router.push('/login');
    }

    return Promise.reject(error);
  }
);

export default api;
