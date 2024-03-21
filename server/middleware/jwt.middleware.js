const jwt = require("jsonwebtoken");
const user= require("../model/userSchema");
require("dotenv").config()
const verifyToken = async (req, res, next) => {
    console.log(req.body)
    try {
        console.log("Headers", req.headers);
        const token1 = req.headers['authorization'].replace("Bearer ", "");
        console.log("token", token1);
        if (!token1) {
            return res.status(403).send("A token is required for authentication");
        }
        const decoded = jwt.verify(token1, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    next();
};


module.exports = verifyToken