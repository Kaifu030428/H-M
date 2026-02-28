const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized access, no token found",
      });
    }

    let decode;
    try {
      decode = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        message: "Invalid token",
        error: err.message,
      });
    }

    if (!decode || !decode.id) {
      return res.status(401).json({
        message: "Invalid token payload",
      });
    }

    const user = await userModel.findById(decode.id);
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized access, user not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Error in auth middleware",
      error: error.message,
    });
  }
};

module.exports = authMiddleware;