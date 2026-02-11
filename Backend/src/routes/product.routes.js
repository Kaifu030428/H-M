const express  = require("express");
const upload = require("../config/multer")
const { createProductController, getAllProductController, updateProductController, deleteProductController } = require("../controllers/product.controllers");
const sellerMiddleware = require("../middlewares/seller.middleware")

const router  = express.Router()

router.post("/create" ,upload.array("images" , 5) , createProductController)
router.get("/:category" , getAllProductController)
router.put("/update/:id" , sellerMiddleware ,upload.array("images" , 5), updateProductController)
router.delete("/delete/:id" , sellerMiddleware , deleteProductController)

module.exports = router;