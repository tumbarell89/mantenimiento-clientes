import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pruebareactjs.test-class.com/Api'
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('userId');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['UsuarioID'] = userid;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

