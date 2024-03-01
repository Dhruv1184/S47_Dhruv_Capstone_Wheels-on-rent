const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './images/rentImage')
    },
    filename: (req, file, cb)=>{
        const name =  Date.now()+"_"+file.originalname
        cb(null, name)
    }
})

exports.upload = multer({storage: storage})

