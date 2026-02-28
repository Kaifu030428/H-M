import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../config/axiosInstance";

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
    totalAmount: 0,
    totalQuantity: 0,
  });
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get user ID from localStorage
  const getUserId = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?._id || user?.id;
    } catch {
      return null;
    }
  };

  // Calculate cart totals
  const calculateTotals = (items) => {
    const totalAmount = items.reduce((sum, item) => {
      return sum + (item.price || 0) * (item.quantity || 1);
    }, 0);
    const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    return { totalAmount, totalQuantity };
  };

  // Fetch cart
  const fetchCart = useCallback(async () => {
    const userId = getUserId();
    if (!userId) {
      setCart({ items: [], totalAmount: 0, totalQuantity: 0 });
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.get(`/cart/${userId}`);
      if (response.data.status) {
        const cartData = response.data.cart || { items: [] };
        const totals = calculateTotals(cartData.items || []);
        setCart({
          ...cartData,
          items: cartData.items || [],
          totalAmount: totals.totalAmount,
          totalQuantity: totals.totalQuantity,
        });
      } else {
        setCart({ items: [], totalAmount: 0, totalQuantity: 0 });
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      if (error.response?.status === 404) {
        setCart({ items: [], totalAmount: 0, totalQuantity: 0 });
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch favorites
  const fetchFavorites = useCallback(async () => {
    const userId = getUserId();
    if (!userId) {
      setFavorites([]);
      return;
    }

    try {
      const response = await axiosInstance.get(`/favorites/${userId}`);
      if (response.data.status) {
        setFavorites(response.data.favorites || []);
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      // Don't set empty array on error, keep existing favorites
      if (error.response?.status === 404) {
        setFavorites([]);
      }
    }
  }, []);

  // Add to cart
  const addToCart = async (productId, quantity = 1, size = "M", color = "Black") => {
    const userId = getUserId();
    if (!userId) {
      throw new Error("Please login to add items to cart");
    }

    try {
      const response = await axiosInstance.post("/cart/add", {
        user_id: userId,
        product_id: productId,
        quantity,
        size,
        color,
      });

      if (response.data.status) {
        const cartData = response.data.cart;
        const totals = calculateTotals(cartData.items || []);
        setCart({
          ...cartData,
          totalAmount: totals.totalAmount,
          totalQuantity: totals.totalQuantity,
        });
        return response.data;
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  };

  // Remove from cart
  const removeFromCart = async (productId, size = "M", color = "Black") => {
    const userId = getUserId();
    if (!userId) return;

    try {
      const response = await axiosInstance.delete("/cart/remove", {
        data: {
          user_id: userId,
          product_id: productId,
          size,
          color,
        },
      });

      if (response.data.status) {
        const cartData = response.data.cart;
        const totals = calculateTotals(cartData.items || []);
        setCart({
          ...cartData,
          totalAmount: totals.totalAmount,
          totalQuantity: totals.totalQuantity,
        });
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  };

  // Update cart item quantity
  const updateCartItem = async (productId, quantity, size = "M", color = "Black") => {
    const userId = getUserId();
    if (!userId) return;

    try {
      const response = await axiosInstance.put("/cart/update", {
        user_id: userId,
        product_id: productId,
        quantity,
        size,
        color,
      });

      if (response.data.status) {
        const cartData = response.data.cart;
        const totals = calculateTotals(cartData.items || []);
        setCart({
          ...cartData,
          totalAmount: totals.totalAmount,
          totalQuantity: totals.totalQuantity,
        });
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      throw error;
    }
  };

  // Clear cart
  const clearCart = async () => {
    const userId = getUserId();
    if (!userId) return;

    try {
      const response = await axiosInstance.delete("/cart/clear", {
        data: { user_id: userId },
      });

      if (response.data.status) {
        setCart({
          items: [],
          totalAmount: 0,
          totalQuantity: 0,
        });
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  };

  // Add to favorites
  const addToFavorites = async (productId) => {
    const userId = getUserId();
    if (!userId) {
      throw new Error("Please login to add favorites");
    }

    try {
      const response = await axiosInstance.post("/favorites/add", {
        user_id: userId,
        product_id: productId,
      });

      if (response.data.status) {
        setFavorites(response.data.favorites);
        // Return the response so caller can check if it already existed
        return response.data;
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      throw error;
    }
  };

  // Remove from favorites
  const removeFromFavorites = async (productId) => {
    const userId = getUserId();
    if (!userId) return;

    try {
      const response = await axiosInstance.delete("/favorites/remove", {
        data: {
          user_id: userId,
          product_id: productId,
        },
      });

      if (response.data.status) {
        setFavorites(response.data.favorites);
        return response.data;
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
      throw error;
    }
  };

  // Check if product is in favorites
  const isFavorite = (productId) => {
    return favorites.some(
      (fav) =>
        fav.product_id?.toString() === productId?.toString() ||
        fav.product_id?._id?.toString() === productId?.toString() ||
        fav._id?.toString() === productId?.toString()
    );
  };

  // Load cart and favorites on mount
  useEffect(() => {
    const userId = getUserId();
    if (userId) {
      fetchCart();
      fetchFavorites();
    } else {
      // Clear cart and favorites if user logs out
      setCart({ items: [], totalAmount: 0, totalQuantity: 0 });
      setFavorites([]);
    }
  }, []);

  // Watch for user changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const userId = getUserId();
      if (userId) {
        fetchCart();
        fetchFavorites();
      } else {
        setCart({ items: [], totalAmount: 0, totalQuantity: 0 });
        setFavorites([]);
      }
    };

    // Listen for storage changes (works across tabs and logout)
    window.addEventListener("storage", handleStorageChange);
    
    // Also create a custom event listener for same-tab logout
    window.addEventListener("user-changed", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("user-changed", handleStorageChange);
    };
  }, []);

  const value = {
    cart,
    favorites,
    loading,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    fetchCart,
    fetchFavorites,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};