import axios from 'axios';

// Determine base API URL.
// Priority:
// 1. Explicit env override via REACT_APP_API_URL (configure in hosting platform)
// 2. Same-origin relative '/api' when bundled with backend in production
// 3. Local development server at localhost:5000
const API_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api');

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Handle token expiration
    if (response && response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;