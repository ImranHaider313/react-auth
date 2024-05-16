import axios, { AxiosError } from 'axios';

const axiosOptions = {
  baseURL: 'http://localhost:3000/',
};
const instance = axios.create(axiosOptions);

export default instance;
export { AxiosError };
