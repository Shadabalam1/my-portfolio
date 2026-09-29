import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const api = axios.create({
  baseURL: baseURL.endsWith('/api') ? baseURL : `${baseURL}/api`,
});

api.interceptors.request.use(
  (config) => {
    const adminInfo = localStorage.getItem('adminInfo');
    if (adminInfo) {
      const { token } = JSON.parse(adminInfo);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
