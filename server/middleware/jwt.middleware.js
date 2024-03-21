const jwt = require("jsonwebtoken");
const user= require("../model/userSchema");
// const {auth} = require('express-oauth2-jwt-bearer')
require("dotenv").config()


const verifyToken = async (req, res, next) => {
    console.log("Headers", req.headers);
    try {
        console.log("try statement");
        const authToken = req.headers['authorization']
        console.log("verifying-token", authToken);
        if (!authToken) {
            return res.status(403).send("A token is required for authentication");
        }
        let token
        if(authToken.startsWith("Bearer ")){
            token = authToken.replace("Bearer ", "");
        }else{
            token = authToken
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("user", decoded);
        res.locals.user=decoded
        // req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    next();
};


module.exports = verifyToken