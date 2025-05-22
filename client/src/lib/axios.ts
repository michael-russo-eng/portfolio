import axios from 'axios';

// Create an axios instance with default config
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  timeout: 5000, // 5 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
  // Ensure we're not caching responses by default
  validateStatus: (status) => status >= 200 && status < 300,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Ensure we're making a fresh request in server components
    if (typeof window === 'undefined') {
      config.headers['Cache-Control'] = 'no-store';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response error:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Export both the instance and a function to create a new instance
// This is useful for cases where you need a fresh instance
export const createAxiosInstance = () => axios.create(axiosInstance.defaults);
export default axiosInstance; 