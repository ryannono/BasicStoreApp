import axios from 'axios';

const urls = [
  {baseURL: 'https://tastetrove.up.railway.app/api'},
  {baseURL: 'http://localhost:4000/api'},
];
export default axios.create({
  baseURL: 'https://tastetrove.up.railway.app/api',
});
