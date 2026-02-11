import axios from "axios";
import { toast } from "react-toastify";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 15000,
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
let networkErrorShown = false;

axiosInstance.interceptors.response.use(
  (response) => {
    // Reset network error flag on successful response
    networkErrorShown = false;
    return response;
  },
  (error) => {
    // Don't show toast for every error, only show meaningful ones
    if (error.code === 'ECONNABORTED') {
      if (!networkErrorShown) {
        toast.error("Request timeout. Please check your connection.");
        networkErrorShown = true;
      }
    } else if (error.code === 'ERR_NETWORK' || !error.response) {
      // Only show network error once per session
      if (!networkErrorShown) {
        // Don't show toast, let the BackendStatus component handle it
        networkErrorShown = true;
      }
    } else {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred";
      // Show toast for user-facing errors (but not 404s)
      if (error.response?.status !== 404 && error.response?.status !== 401) {
        toast.error(errorMessage);
      }
    }
    return Promise.reject(error);
  }
);