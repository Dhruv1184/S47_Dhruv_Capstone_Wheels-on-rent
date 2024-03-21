const jwt = require("jsonwebtoken");
const user= require("../model/userSchema");
const {auth}= require('express-oauth2-jwt-bearer')
require("dotenv").config()


const verifyToken = async (req, res, next) => {
    try {
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
        // Verification for JWT token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("JWT user:-", decoded);
            res.locals.user=decoded
            return next();
        } catch (error) {
            console.log('Jwt token failed');
        }

        // Verification for Auth0 token
        try {
            console.log("Auth");
            const decoded = auth({
                audience: process.env.AUTH0_AUDIENCE,
                issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
            })
            console.log("Auth0",decoded);
            next()
        } catch (error) {
            return res.status(401).send("Auth0 token failed");
        }
    }
    catch (err) {
        return res.status(401).send("Invalid Token");
    }
};
// }


module.exports = verifyToken