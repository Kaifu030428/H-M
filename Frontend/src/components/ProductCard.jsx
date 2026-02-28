import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "react-toastify";
import { axiosInstance } from "../config/axiosInstance";
import { isRazorpayLoaded } from "../config/razorpayInstance";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, addToFavorites, removeFromFavorites, isFavorite, fetchCart, fetchFavorites } = useCart();
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "M");
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "Black");
  const [isAdding, setIsAdding] = useState(false);
  const [isFavoriting, setIsFavoriting] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [isPurchased, setIsPurchased] = useState(product?.payment_status === "success");
  const [razorpayReady, setRazorpayReady] = useState(false);

  const productId = product?._id ?? product?.id;
  const favorite = isFavorite(productId);

  // Check if Razorpay is loaded
  useEffect(() => {
    const checkRazorpay = () => {
      if (isRazorpayLoaded()) {
        setRazorpayReady(true);
      } else {
        // Retry after a short delay if script is still loading
        setTimeout(() => {
          if (isRazorpayLoaded()) {
            setRazorpayReady(true);
          }
        }, 500);
      }
    };

    checkRazorpay();
    // Also check on window load
    window.addEventListener('load', checkRazorpay);
    return () => window.removeEventListener('load', checkRazorpay);
  }, []);

  if (!product || productId == null) {
    return null;
  }

  const getUserId = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?._id || user?.id;
    } catch {
      return null;
    }
  };

  const handleProductClick = () => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      await addToCart(product._id, 1, selectedSize, selectedColor);
      await fetchCart(); // Refresh cart after adding
      toast.success("Added to bag!");
      navigate("/cart");
    } catch (error) {
      toast.error(error.message || "Please login to add items to cart");
    } finally {
      setIsAdding(false);
    }
  };

  const handleFavoriteToggle = async (e) => {
    e.stopPropagation();
    try {
      setIsFavoriting(true);
      if (favorite) {
        await removeFromFavorites(productId);
        await fetchFavorites(); // Refresh favorites after removing
        toast.success("Removed from favourites");
      } else {
        const result = await addToFavorites(productId);
        await fetchFavorites(); // Refresh favorites after adding
        if (result?.alreadyExists) {
          toast.info("Already in favourites");
        } else {
          toast.success("Added to favourites");
        }
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Could not update favourites";
      toast.error(errorMsg);
    } finally {
      setIsFavoriting(false);
    }
  };

  const handleBuyNow = async () => {
    const userId = getUserId();
    if (!userId) {
      toast.error("Please login to purchase");
      navigate("/login");
      return;
    }

    // Check if Razorpay is loaded
    if (!razorpayReady && !isRazorpayLoaded()) {
      toast.error("Payment system is loading. Please wait a moment and try again.");
      return;
    }

    setIsBuying(true);
    try {
      const amount = product.price?.amount || product.price || 0;
      if (amount <= 0) {
        throw new Error("Invalid product price");
      }

      const currency = product.price?.currency || "INR";

      // Create Razorpay order
      const orderResponse = await axiosInstance.post("/payment/process", {
        amount,
        currency,
        user_id: userId,
      });

      if (!orderResponse.data.status || !orderResponse.data.order) {
        throw new Error(orderResponse.data.message || "Failed to create order");
      }

      const { order, razorpay_key_id } = orderResponse.data;

      if (!razorpay_key_id) {
        throw new Error("Razorpay key not received from server");
      }

      // Initialize Razorpay
      const options = {
        key: razorpay_key_id,
        amount: order.amount,
        currency: order.currency,
        name: "H&M",
        description: product.productName || "Product Purchase",
        image: product.images?.[0] || "",
        order_id: order.id,
        handler: async (response) => {
          try {
            // Verify payment
            const verifyResponse = await axiosInstance.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              user_id: userId,
              product_id: product._id,
            });

            if (verifyResponse.data.status) {
              setIsPurchased(true);
              toast.success("Payment successful! Product purchased.");
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error(error.response?.data?.message || "Payment verification failed");
          } finally {
            setIsBuying(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsBuying(false);
            toast.info("Payment cancelled");
          },
        },
        theme: {
          color: "#000000",
        },
      };

      if (!window.Razorpay) {
        throw new Error("Razorpay is not loaded. Please refresh the page.");
      }

      const rpay = new window.Razorpay(options);
      rpay.on('payment.failed', function (response) {
        console.error("Payment failed:", response.error);
        toast.error(`Payment failed: ${response.error.description || "Unknown error"}`);
        setIsBuying(false);
      });
      rpay.open();
    } catch (error) {
      console.error("Buy Now error:", error);
      toast.error(error.response?.data?.message || error.message || "Failed to process payment");
      setIsBuying(false);
    }
  };

  return (
    <div className="group relative bg-white w-full">
      {/* Product Image */}
      <div className="relative overflow-hidden aspect-[3/4] bg-gray-100 cursor-pointer" onClick={handleProductClick}>
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          src={product?.images?.[0] || "https://via.placeholder.com/300"}
          alt={product?.productName || "Product"}
        />
        
        {/* Purchased Badge */}
        {isPurchased && (
          <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 text-xs font-bold uppercase z-20">
            Purchased
          </div>
        )}
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteToggle}
          disabled={isFavoriting}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-all disabled:opacity-50 z-10"
          aria-label={favorite ? "Remove from favourites" : "Add to favourites"}
        >
          <Heart
            size={18}
            fill={favorite ? "currentColor" : "none"}
            className={favorite ? "text-red-600" : "text-gray-600"}
          />
        </button>

        {/* Action Buttons - Mobile: Always visible, Desktop: On hover */}
        <div className="absolute bottom-0 left-0 right-0 bg-black text-white font-bold uppercase tracking-wider text-xs sm:text-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <div className="flex flex-col sm:flex-row">
            <button
              onClick={handleAddToCart}
              disabled={isAdding || isPurchased}
              className="flex-1 py-2.5 sm:py-3 px-4 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ShoppingBag size={16} />
              <span>{isAdding ? "Adding..." : "Add to Bag"}</span>
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isBuying || isPurchased}
              className="flex-1 py-2.5 sm:py-3 px-4 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed border-t sm:border-t-0 sm:border-l border-gray-700"
            >
              {isBuying ? "Processing..." : isPurchased ? "Purchased" : "Buy Now"}
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-2 sm:mt-3 px-1">
        <h3 className="text-xs sm:text-sm font-medium mb-1 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] cursor-pointer hover:text-blue-600" onClick={handleProductClick}>
          {product?.productName}
        </h3>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="text-xs sm:text-sm font-bold">
            ₹{product?.price?.amount || product?.price || "0"}
          </div>
          {product?.colors && product.colors.length > 1 && (
            <div className="flex gap-1">
              {product.colors.slice(0, 4).map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(color)}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 transition-all ${
                    selectedColor === color ? "border-black scale-110" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          )}
        </div>
        {/* Size Selection - Mobile */}
        {product?.sizes && product.sizes.length > 0 && (
          <div className="mt-2 flex gap-1 flex-wrap">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`text-xs px-2 py-1 border transition-all ${
                  selectedSize === size
                    ? "border-black bg-black text-white"
                    : "border-gray-300 hover:border-black"
                }`}
              >
                {size.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;