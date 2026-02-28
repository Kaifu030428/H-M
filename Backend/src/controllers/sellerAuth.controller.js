const sellerModel = require("../models/seller.model");
const jwt = require("jsonwebtoken");

const registerSellerController = async (req, res) => {
  try {
    const { sellerName, sellerPhone, sellerEmail, sellerAdhaar, sellerPassword } = req.body;

    const existingSeller = await sellerModel.findOne({ sellerEmail });

    if (existingSeller) {
      return res.status(422).json({
        message: "Email is already taken",
      });
    }

    const newSeller = await sellerModel.create({
      sellerName,
      sellerPhone,
      sellerEmail,
      sellerAdhaar,
      sellerPassword,
    });

    const sellerToken = jwt.sign(
      { seller_id: newSeller._id },
      process.env.JWT_SELLER_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("sellerToken", sellerToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(201).json({
      message: "Seller account created successfully",
      seller: newSeller,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const loginSellerController = async (req, res) => {
  try {
    const { sellerEmail, sellerPassword } = req.body;

    const seller = await sellerModel.findOne({ sellerEmail });
    if (!seller) {
      return res.status(422).json({
        message: "Email not found. Please register first",
      });
    }

    const isMatch = await seller.comparePass(sellerPassword);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const sellerToken = jwt.sign(
      { seller_id: seller._id },
      process.env.JWT_SELLER_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("sellerToken", sellerToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      message: "Seller logged in successfully",
      seller,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const sellerProfileController = async (req, res) => {
  try {
    const sellerProfile = req.seller;
    if (!sellerProfile) {
      return res.status(404).json({
        message: "Seller profile not found",
      });
    }

    return res.status(200).json({
      message: "Seller profile fetched successfully",
      profile: sellerProfile,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { registerSellerController, loginSellerController, sellerProfileController };
