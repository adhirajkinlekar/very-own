import axios from 'axios'; 
// Create an Axios instance
const axiosInstance = axios.create({
  //baseURL: 'https://localhost:5001', // Your backend API URL
});
// Axios instance for API 2
const api2Instance = axios.create({
  baseURL: 'https://localhost:5000',
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
      document.cookie = 'VERY_OWN_JWT_TOKEN=; path=/; domain=.veryown.in; samesite=strict';
      // You could use a redirect here if needed, e.g., window.location.href = '/login';
      window.location.href = `https://sso.veryown.in/secure/${window.location.hostname.split('.')[0]}_academy/signin`

    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
