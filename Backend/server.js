require("dotenv").config()
const express = require("express")
const connectDB = require("./src/config/db")
const authRoutes = require("./src/routes/auth.routes")
const sellerRoutes = require("./src/routes/sellerauth")
const productRoutes = require("./src/routes/product.routes")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true, // Allow cookies
}));

app.use(cookieParser())
app.use(express.json())

connectDB()

app.use("/api/auth" , authRoutes)
app.use("/api/auth/seller" ,sellerRoutes )
app.use("/api/products" , productRoutes)

const port = process.env.PORT || 4500

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})