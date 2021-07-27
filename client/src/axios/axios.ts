import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000'
});

instance.interceptors.request.use((request) => {
  if (
    localStorage.getItem('profile') &&
    JSON.parse(localStorage.getItem('profile') as string) !== null
  ) {
    request.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile') as string).token
    }`;
  }
  return request;
});
export default instance;
