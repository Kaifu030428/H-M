const imagekit = require("imagekit")

const storageInstance = new imagekit({
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL,
})

const sendFiles = async(  file , fileName)=>{
    return await storageInstance.upload({
        file,
        fileName,
        folder:"HM"
    })
}

module.exports = sendFiles;