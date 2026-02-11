import { axiosInstance } from "../config/axiosInstance";

const API = {
  get: (url) => axiosInstance.get(url),
  post: (url, data, config) => axiosInstance.post(url, data, config),
  put: (url, data) => axiosInstance.put(url, data),
  delete: (url) => axiosInstance.delete(url),
};

export default API;