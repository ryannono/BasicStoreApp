import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const urls = [
  {baseURL: 'https://tastetrove.up.railway.app/api'},
  {baseURL: 'http://localhost:4000/api'},
];

export const BASE_URL = 'http://localhost:4000';
export const BASE_API_URL = 'https://tastetrove.up.railway.app/api';

const axiosInstance = axios.create();
axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.baseURL = BASE_API_URL;

export default axiosInstance;
