import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const urls = [
  {baseURL: 'https://tastetrove.up.railway.app/api'},
  {baseURL: 'http://localhost:4000/api'},
];

const location = window.location;
export const BASE_URL = location.protocol.concat(
  '//',
  location.hostname,
  location.port ? `:${location.port}` : ''
);

export const BASE_API_URL = 'http://localhost:4000/api';

const axiosInstance = axios.create();
axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.baseURL = BASE_API_URL;

let isRefreshing = false;

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => {
    // If the response was successful, there's no need to do anything
    return response;
  },
  async error => {
    const {
      config,
      response: {status},
    } = error;
    const originalRequest = config;

    const hasRefreshedToken = sessionStorage.getItem('hasRefreshedToken');

    if (hasRefreshedToken) {
      // If a refresh has already been attempted in this session,
      // don't try to refresh the token again
      return Promise.reject(error);
    }

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        sessionStorage.setItem('hasRefreshedToken', 'true');

        // Refresh token call
        try {
          await axiosInstance.post('auth/refresh');
          return axiosInstance(originalRequest);
        } catch (e) {
          // handle the error, maybe redirect to login page
          // after catching this error
          console.error(e);
          return Promise.reject(e);
        } finally {
          isRefreshing = false;
        }
      }
    }

    // If the response had a different status code, reject the promise with the error
    return Promise.reject(error);
  }
);

export default axiosInstance;
