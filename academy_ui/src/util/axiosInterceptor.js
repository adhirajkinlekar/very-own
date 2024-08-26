import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  //baseURL: 'http://localhost:5001', // Your backend API URL
});
// Axios instance for API 2
const api2Instance = axios.create({
    baseURL: 'http://localhost:300222221',
  });
// Utility function to get the JWT token from cookies
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return '';
};

// Intercept request to attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie('VERY_OWN_JWT_TOKEN');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercept response to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response || {};
    
    // Handle 401 or 403 errors by removing the token and redirecting if necessary
    if ([401, 403].includes(status)) {
      document.cookie = 'VERY_OWN_JWT_TOKEN=; Max-Age=-99999999;';
      // You could use a redirect here if needed, e.g., window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
