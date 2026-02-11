const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    price: {
      amount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        enum: ["INR", "USD", "EUR"],
        default: "INR",
      },
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    images: [String], // ✅ fixed

    sizes: {
      type: String,
      enum: ["S", "M", "L", "XL", "XXL"], // ✅ fixed
      default: "M",
    },

    colors: [
      {
        type: String,
      },
    ],

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;