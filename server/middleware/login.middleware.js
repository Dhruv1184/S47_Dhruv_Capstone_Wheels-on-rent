const jwt = require("jsonwebtoken");
const userSchema = require("../model/userSchema");
require("dotenv").config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
mongoose.connect(process.env.Mongoose_URL, {
    dbName: "Capstone"
})

const loginMiddleware = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!(email && password)) {
            return res.status(400).send("All input is required")
        }
        const user = await userSchema.findOne({ email })
        if (user && (bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h"
                }
            )
            user.token = token
            user.password = undefined
            res.status(200).json(token)
        }
        else {
            res.status(400).send("Invalid Credentials")
        }
    }
    catch (error) {
        console.log(error);
    }
    next()
}

module.exports = loginMiddleware