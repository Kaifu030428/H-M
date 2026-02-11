const productModel = require("../models/products.model");
const sendFiles = require("../services/storage.services")

const createProductController = async (req, res) => {
  try {
    let seller_id = req.seller;

    if (!req.files)
      return res.status(422).json({
        message: "image is required",
      });

    const uploadImgs = await Promise.all(
      req.files.map(async (val) => await sendFiles(val.buffer, val.orignalname))
    );
    const { title, amount, currency, description, size, color , category } = req.body;

    if (!title || !amount || !currency || !description || !size || !color  || !category)  {
      return res.status(422).json({
        message: "all fields are required",
      });
    }

    let newProducts = await productModel.create({
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
      message: "product created",
      product: newProducts,
      seller: seller_id,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getAllProductController = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await productModel.find({
      category: { $regex: new RegExp(`^${category}$`, "i") }
    });

    return res.status(200).json({
      message: "Products fetched successfully",
      productsData: products   
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    let product_id = req.params.id;

    if (!product_id)
      return res.status(404).json({
        message: "product id not found",
      });

    let { title, amount, currency,description, size, color } = req.body;

    let uploadImgs = await Promise.all(
      req.files.map(async (val) => await sendFiles(val.buffer, val.orignalName))
    );

    let updateProducts = await productModel.findByIdAndUpdate(
      { _id: product_id },
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
      }
    );

    await updateProducts.save();

if(!updateProducts)
  return res.status(400).json({
message:"something went wrong"})

return res.status(200).json({
  message:"product updates"
})

  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const deleteProductController = async (req, res) => {
  try {

    if (!req.seller)
      return res.status(401).json({
        message: "Unauthorized"
      });

    let product_id = req.params.id;

    if (!product_id)
      return res.status(404).json({
        message: "product id not found"
      });

    let delProduct = await productModel.findByIdAndDelete(product_id);

    if (!delProduct)
      return res.status(404).json({
        message: "product not found"
      });

    return res.status(200).json({
      message: "product deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};

module.exports = { createProductController, getAllProductController , updateProductController ,deleteProductController};
