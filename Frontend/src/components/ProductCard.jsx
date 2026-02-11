
import React from "react";
import { axiosInstance } from "../config/axiosInstance";

const ProductCard = ({ product }) => {
  const handlePurchase = async () => {
    try {
      let details = {
        amount: product.price?.amount || product.price,
        currency: product.price?.currency || "INR",
      };

      const res = await axiosInstance.post("/payment/process", details);
      if (res && res.data.orders) {
        let order_id = res.data.orders.id;

        const options = {
          key: "rzp_test_RcrhVVOcN3Xr0N", // From Razorpay Dashboard
          amount: res.data.orders.amount,
          currency: res.data.orders.currency,
          name: "H&M Store",
          description: product.productName || "Product Purchase",
          image: product.images?.[0] || "",
          order_id: order_id,
          handler: async function (response) {
            try {
              const verifyRes = await axiosInstance.post("/payment/verify", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                product_id: product._id,
              });

              if (verifyRes.data.message === "Payment successfull") {
                alert("Payment successful! Thank you for your purchase.");
              } else {
                alert("Payment verification failed. Please contact support.");
              }
            } catch (error) {
              console.error("Payment verification error:", error);
              alert("Payment verification failed. Please contact support.");
            }
          },
          prefill: {
            name: "Customer",
            email: "customer@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#ec4899",
          },
        };
        const razorpayScreen = new window.Razorpay(options);
        razorpayScreen.open();
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert(error.response?.data?.message || "Failed to process payment. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-sm mx-auto border">
      <img
        className="w-full h-64 object-cover"
        src={product?.images?.[0] || "https://via.placeholder.com/300"}
        alt={product?.productName || "Product"}
      />
      <div className="p-5">
        <span className="text-xs text-pink-600 font-bold uppercase">
          {product?.category}
        </span>
        <h3 className="text-xl font-semibold mt-2">{product?.productName}</h3>
        <div className="text-gray-900 font-bold text-lg my-2">
          {product?.price?.currency || "INR"} {product?.price?.amount || product?.price}
        </div>
        <p className="text-gray-600 text-sm mb-4">{product?.description}</p>
        {product?.colors && product.colors.length > 0 && (
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xs font-medium text-gray-700">Colors:</span>
            {product.colors.map((color) => (
              <span
                key={color}
                className="w-4 h-4 rounded-full border border-gray-300 mr-1"
                style={{ background: color }}
              />
            ))}
          </div>
        )}
        {product?.sizes && product.sizes.length > 0 && (
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-xs font-medium text-gray-700">Sizes:</span>
            {product.sizes.map((size) => (
              <span
                key={size}
                className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 rounded text-xs font-semibold"
              >
                {size.toUpperCase()}
              </span>
            ))}
          </div>
        )}
        <button
          onClick={handlePurchase}
          className="bg-pink-500 hover:bg-pink-600 text-white w-full py-2 rounded-lg shadow text-base font-semibold transition-all"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
