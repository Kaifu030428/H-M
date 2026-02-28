const productModel = require("../models/products.model");
const sendFiles = require("../services/storage.services");

const createProductController = async (req, res) => {
  try {
    const seller_id = req.seller;

    if (!req.files || req.files.length === 0) {
      return res.status(422).json({
        message: "At least one image is required",
      });
    }

    const uploadImgs = await Promise.all(
      req.files.map(async (val) => await sendFiles(val.buffer, val.originalname))
    );

    const { title, amount, currency, description, size, color, category } = req.body;

    if (!title || !amount || !currency || !description || !size || !color || !category) {
      return res.status(422).json({
        message: "All fields are required",
      });
    }

    const newProduct = await productModel.create({
      title,
      price: {
        amount,
        currency,
      },
      description,
      sizes: size,
      colors: color,
      category,
      images: uploadImgs.map((val) => val.url),
    });

    return res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
      seller: seller_id,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAllProductController = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await productModel.find({
      category: { $regex: new RegExp(`^${category}$`, "i") },
    });

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "No products found for the specified category",
      });
    }

    return res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    const product_id = req.params.id;

    if (!product_id) {
      return res.status(404).json({
        message: "Product ID not found",
      });
    }

    const { title, amount, currency, description, size, color } = req.body;

    const uploadImgs = req.files
      ? await Promise.all(
          req.files.map(async (val) => await sendFiles(val.buffer, val.originalname))
        )
      : [];

    const updatedProduct = await productModel.findByIdAndUpdate(
      product_id,
      {
        title,
        description,
        price: {
          amount,
          currency,
        },
        sizes: size,
        colors: color,
        images: uploadImgs.map((val) => val.url),
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const product_id = req.params.id;

    if (!product_id) {
      return res.status(404).json({
        message: "Product ID not found",
      });
    }

    const deletedProduct = await productModel.findByIdAndDelete(product_id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { createProductController, getAllProductController, updateProductController, deleteProductController };
