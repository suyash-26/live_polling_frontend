import axios from 'axios';

// Create custom Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Include cookies in requests
});

// Request interceptor: Add token and log
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor: Handle errors and log
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized, redirecting to login...');
      // Example: Redirect to login
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;