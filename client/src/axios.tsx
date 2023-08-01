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

export const BASE_API_URL = 'https://tastetrove.up.railway.app/api';

const axiosInstance = axios.create();
axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.baseURL = BASE_API_URL;

export default axiosInstance;
