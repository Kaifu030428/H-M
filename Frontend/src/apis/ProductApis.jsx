import { axiosInstance } from "../config/axiosInstance";

export const getProductByCategory = async (category) => {
  try {
    const res = await axiosInstance.get(`/products/${category}`);
    if (res && res.data) {
      return res.data;
    }
    throw new Error("No data received from server");
  } catch (error) {
    console.error("Error fetching products:", error);
    // Return empty data structure instead of throwing to prevent UI errors
    if (error.code === 'ERR_NETWORK' || !error.response) {
      // Network error - return empty structure
      return {
        productsData: [],
        message: "Cannot connect to server",
      };
    }
    // Re-throw other errors so React Query can handle them
    throw error;
  }
};

export const searchProducts = async (query, category = null) => {
  try {
    const params = new URLSearchParams({ query });
    if (category) {
      params.append("category", category);
    }
    const res = await axiosInstance.get(`/products/search?${params.toString()}`);
    if (res && res.data) {
      return res.data;
    }
    throw new Error("No data received from server");
  } catch (error) {
    console.error("Error searching products:", error);
    // Return empty structure for network errors
    if (error.code === 'ERR_NETWORK' || !error.response) {
      return {
        productsData: [],
        message: "Cannot connect to server",
      };
    }
    throw error;
  }
};