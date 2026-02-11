const userModel = require("../models/user.model");
const jwt  = require("jsonwebtoken")

const loginController = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found. Please register",
      });
    }

    const isMatch = await user.comparePass(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    let token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    const userData = user.toObject();
    delete userData.password;

    return res.status(200).json({
      message: "Login successfully",
      user: userData,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
const registerController = async (req, res) => {
  try {
    let { name, email, phone, password } = req.body;
    
    const existingUser = await UserModel.findOne({ email });

    console.log("exists--->", existingUser);

    if (existingUser)
      return res.status(400).json({
        message: "user already registered",
      });

    const newUser = await UserModel.create({
      name,
      email,
      phone,
      password,
    });

    let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token);

    return res.status(201).json({
      message: "user registered",
      user: newUser,
    });
  } catch (error) {
    console.log("error in reg->", error);
    return res.status(500).json({
      message: "internal server error",
      error: error,
    });
  }
};

module.exports = {loginController ,registerController };