import { axiosInstance } from "../config/axiosInstance";

export const getProductByCategory = async (category) => {
  if (!category || typeof category !== "string") {
    return { productsData: [], message: "No category" };
  }
  const categorySlug = category.trim().toLowerCase();
  try {
    const res = await axiosInstance.get(`/products/${categorySlug}`);
    const data = res?.data;
    const list = Array.isArray(data?.productsData) ? data.productsData : [];
    return {
      productsData: list,
      message: data?.message || (list.length ? "Products fetched" : "No products found"),
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      productsData: [],
      message:
        error.code === "ERR_NETWORK" || !error.response
          ? "Cannot connect to server"
          : error.response?.data?.message || "No products found",
    };
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