const mongoose = require('mongoose')
const userSchema = require('../model/userSchema')
const express = require('express');
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
require("dotenv").config();
const user = express()
const verifyToken = require("../middleware/jwt.middleware.js")
const loginMiddleware = require("../middleware/login.middleware.js")
user.use(express.json())
user.use(cookieParser())
mongoose.connect(process.env.Mongoose_URL, {
    dbName: "Capstone"
})

user.get("/user", async (req, res) => {
    try {
        userSchema.find({}).then((data) => {
            res.send(data)
        })
    } catch (error) {
        console.log(error);
    }
})

user.post("/user/insert", async (req, res) => {
    try {
        const existData = await userSchema.findOne({ email: req.body.email })
        // console.log(existData);
        if (!existData) {
            console.log("1+");
            await userSchema.create(req.body)
        }
    }
    catch (error) {
        console.log(error);
    }
})

user.get("/user/:id", async (req, res) => {
    try {
        const id = req.params.id
        const user = await userSchema.findById(id)
        res.send(user)
        // console.log("update");
    }
    catch (error) {
        console.log(error);
    }
})
user.put("/user/update/:id", async (req, res) => {
    try {
        const updateUser = await userSchema.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.send(updateUser)
        // console.log("update");
    } catch (error) {
        console.log(error);
    }
})

user.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!(name && email && password)) {
            res.status(400).send("All input is required")
        }
        const exist = await userSchema.findOne({ email })
        if (exist) {
            res.status(400).send("User Already Exist. Please Login")
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = await userSchema.create({
                name,
                email,
                password: hashedPassword
            })
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
            console.log(token);
            user.password = undefined
            res.status(201).json(user)
        }
    } catch (error) {
        console.log(error);
    }
})


user.post('/login', async (req, res) => {
    // console.log(req.body, req.headers)
    try {
        const { email, password } = req.body
        if (!(email && password)) {
            return res.status(400).send("All input is required")
        }
        const existUser = await userSchema.findOne({ email })
        if (existUser && (await bcrypt.compare(password, existUser.password))) {
            const token = jwt.sign(
                {
                    id: existUser._id,
                    email: existUser.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h"
                }
            )
            existUser.token = token
            existUser.password = undefined
            // console.log("server",token);
            res.status(200).send(token)
        }
        else {
            res.status(400).send("Invalid Credentials")
        }
    }
    catch (error) {
        console.log(error);
    }
})

module.exports = user