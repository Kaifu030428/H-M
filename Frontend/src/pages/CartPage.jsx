
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Trash2, Plus, Minus } from "lucide-react";

const CartPage = () => {
  const { cart, removeFromCart, updateCartItem, fetchCart } = useCart();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [updatingItems, setUpdatingItems] = useState({});

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (product_id, newQuantity, size, color) => {
    if (newQuantity < 1) {
      handleRemoveItem(product_id, size, color);
      return;
    }

    try {
      setUpdatingItems((prev) => ({
        ...prev,
        [product_id]: true,
      }));
      await updateCartItem(product_id, newQuantity, size, color);
      await fetchCart(); // Refresh cart after updating
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Failed to update quantity");
    } finally {
      setUpdatingItems((prev) => ({
        ...prev,
        [product_id]: false,
      }));
    }
  };

  const handleRemoveItem = async (product_id, size, color) => {
    try {
      await removeFromCart(product_id, size, color);
      await fetchCart(); // Refresh cart after removing
      toast.success("Item removed from cart");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-white py-6 sm:py-8 md:py-12">
        <div className="max-w-400 mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-12 uppercase tracking-wide">Shopping Bag</h1>
          <div className="text-center py-12 sm:py-16 md:py-20">
            <p className="text-lg sm:text-xl text-gray-600 mb-4 sm:mb-6">Your shopping bag is empty</p>
            <button
              onClick={() => navigate("/")}
              className="bg-black text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-bold uppercase tracking-wider hover:bg-gray-800 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-6 sm:py-8 md:py-12">
      <div className="max-w-400 mx-auto px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-12 uppercase tracking-wide">Shopping Bag</h1>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cart.items.map((item, index) => {
                const productId = item.product_id?._id || item.product_id || `item-${index}`;
                return (
                  <div key={`${productId}-${item.size}-${item.color}`} className="border border-gray-200 p-3 sm:p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
                      {/* Product Image */}
                      <div className="w-full sm:w-24 h-48 sm:h-32 bg-gray-100 shrink-0">
                        {item.images && item.images[0] && (
                          <img
                            src={item.images[0]}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-3">
                        <div className="flex-1">
                          <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">{item.productName}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4">
                            Size: <span className="font-medium">{item.size || "M"}</span> | Color:{" "}
                            <span className="font-medium">{item.color || "Black"}</span>
                          </p>
                          <p className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">₹{(item.price || 0)?.toFixed(2)}</p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-4">
                            <div className="flex items-center border border-gray-300">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    productId,
                                    (item.quantity || 1) - 1,
                                    item.size || "M",
                                    item.color || "Black"
                                  )
                                }
                                disabled={updatingItems[productId]}
                                className="p-2 hover:bg-gray-100 disabled:opacity-50"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-4 py-2 font-medium">{item.quantity || 1}</span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    productId,
                                    (item.quantity || 1) + 1,
                                    item.size || "M",
                                    item.color || "Black"
                                  )
                                }
                                disabled={updatingItems[productId]}
                                className="p-2 hover:bg-gray-100 disabled:opacity-50"
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() =>
                                handleRemoveItem(
                                  productId,
                                  item.size || "M",
                                  item.color || "Black"
                                )
                              }
                              className="p-2 text-red-600 hover:bg-red-50"
                              aria-label="Remove item"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                        
                        {/* Item Total */}
                        <div className="text-left sm:text-right">
                          <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Item Total</p>
                          <p className="text-lg sm:text-xl font-bold">
                            ₹{((item.price || 0) * (item.quantity || 1))?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white border border-gray-200 p-4 sm:p-6 md:p-8 sticky top-20 sm:top-24">
              {!user && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
                  <p className="text-sm text-blue-900 font-semibold mb-3">Login to complete your purchase</p>
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 font-bold uppercase text-sm tracking-wider rounded transition-all"
                  >
                    Login Now
                  </button>
                </div>
              )}
              
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 uppercase tracking-wide">Summary</h2>

              <div className="space-y-4 mb-6 py-4 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{(cart.totalAmount || 0)?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (18%)</span>
                  <span>₹{((cart.totalAmount || 0) * 0.18)?.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold mb-6 sm:mb-8">
                <span>Total</span>
                <span>₹{((cart.totalAmount || 0) + (cart.totalAmount || 0) * 0.18)?.toFixed(2) || "0.00"}</span>
              </div>

              <button
                onClick={() => {
                  if (!user) {
                    toast.error("Please login to proceed with checkout");
                    navigate("/login");
                    return;
                  }
                  navigate("/checkout");
                }}
                className="w-full bg-black text-white py-4 font-bold uppercase tracking-wider hover:bg-gray-800 transition-all mb-3"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full border border-black text-black py-4 font-bold uppercase tracking-wider hover:bg-gray-50 transition-all"
              >
                Continue Shopping
              </button>

              <p className="text-xs text-gray-600 text-center mt-6">
                Free returns within 30 days for items in original condition
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
