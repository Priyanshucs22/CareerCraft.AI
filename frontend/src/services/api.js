import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Cookie-based authentication - no need for manual token handling
// The cookie is automatically sent with each request due to withCredentials: true

// Response interceptor for better error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout. Please check your connection.';
    } else if (!error.response) {
      error.message = 'Network error. Please check your connection.';
    } else if (error.response.status === 401) {
      // Unauthorized - redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
