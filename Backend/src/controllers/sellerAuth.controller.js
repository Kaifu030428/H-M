const sellerModel = require("../models/seller.model");
const jwt = require("jsonwebtoken");

const registerSellerController = async (req, res) => {
  try {
    let { sellerName, sellerPhone, sellerEmail, sellerAdhaar, sellerPassword } =
      req.body;

    let existinSeller = await sellerModel.findOne({ sellerEmail });

    if (existinSeller)
      return res.status(422).json({
        message: "email has already taken",
      });

    let newSeller = await sellerModel.create({
      sellerName,
      sellerPhone,
      sellerEmail,
      sellerAdhaar,
      sellerPassword,
    });

    if (!newSeller)
      return res.status(400).json({
        message: "something went wrong",
      });

    let sellerToken = jwt.sign(
      { seller_id: newSeller._id },
      process.env.JWT_SELLER_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("sellerToken", sellerToken);

    return res.staus(201).json({
      message: "seller id created",
      seller: newSeller,
    });
  } catch (error) {
    console.log("error in seller register api->", error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

const loginSellerController = async (req, res) => {
  try {
    const { sellerEmail, sellerPassword } = req.body;

    let seller = await sellerModel.findOne({ sellerEmail });
    if (!seller)
      return res.status(422).json({
        message: "email not found , Register first",
      });

      let cp = seller.comparePass(sellerPassword)

      if(!cp)return res.status(422).josn({
        message:"invalid credentials"
      })

      return res.status(200).json({
        message:"user logged in successfully",
        sellerUser : seller
      })
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

const sellerProfileController = async(req, res)=>{
  try {

    let sellerProfile = req.seller;
    if(!sellerProfile)return res.status(404).json({
        message:"seller profile not found"
    })
     return res.status(200).json({
        message:"seller profile fetched",
        profile: sellerProfile
     })
  } catch (error) {
    return res.status(500).json({
        message: "internal server error",
      });
  }
}

module.exports = { registerSellerController, loginSellerController , sellerProfileController };
