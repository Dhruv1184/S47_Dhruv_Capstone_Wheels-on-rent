const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './images/saleImage')
    },
    filename: (req, file, cb)=>{
        const name =  Date.now() + "_" + file.originalname
        cb(null, name)
    }
})

exports.saleUpload = multer({storage: storage})