const express = require("express")
const { registerController, loginController } = require("../controllers/auth.controllers")
const userSchemaValidationApi = require("../middlewares/authentication.middleware")

const router = express.Router()

router.post("/register" ,userSchemaValidationApi , registerController)
router.post("/login" , loginController)

module.exports = router