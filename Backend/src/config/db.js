const mongoose = require("mongoose")

const connectDB =  async ()=>{
    try {
        let res = await mongoose.connect(process.env.MONGO_URL)
        if(res){
            console.log("db connected succesfully")
        }
    } catch (error) {
        console.log("error in connecting to db ", error)
    }
}

module.exports = connectDB;