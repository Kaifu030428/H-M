const express = require("express")
const { registerSellerController, loginSellerController, sellerProfileController } = require("../controllers/sellerAuth.controller")
const sellerMiddleware  = require("../middlewares/seller.middleware")




const router = express.Router()

router.post("/register" ,registerSellerController )
router.post("/login" , loginSellerController)
router.get("/profile" ,sellerMiddleware , sellerProfileController)

module.exports = router