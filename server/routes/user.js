const mongoose = require('mongoose')
const userSchema = require('../model/userSchema')
const express = require('express')
const user = express()
require("dotenv").config();

user.use(express.json())

mongoose.connect(process.env.Mongoose_URL, {
    dbName : "Capstone"
})

user.get("/user", async (req, res)=>{
    try {
        userSchema.find({}).then((data)=>{
            res.send(data)
        })  
    } catch (error) {
        console.log(error);
    }
})

user.post("/user/insert", async (req, res)=>{
    try {
        const newUser = new userSchema(req.body)
        await newUser.save()
        res.send(newUser)
    }
    catch (error) {
        console.log(error);
    }
})

user.get("/user/:id", async (req, res)=>{
    try {
        const id = req.params.id
        const user = await userSchema.findById(id)
        res.send(user)
    }
    catch (error) {
        console.log(error);
    }
})
user.put("/user/update/:id", async (req, res)=>{
    try {
        const updateUser = await userSchema.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.send(updateUser)
    } catch (error) {
        console.log(error);
    }
})
module.exports = user