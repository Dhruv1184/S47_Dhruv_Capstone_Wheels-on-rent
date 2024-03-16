const mongoose = require('mongoose')
const userSchema = require('../model/userSchema')
const express = require('express');
const { log } = require('console');
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
        const existData = await userSchema.findOne({email: req.body.email})
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

user.get("/user/:id", async (req, res)=>{
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
user.put("/user/update/:id", async (req, res)=>{
    try {
        const updateUser = await userSchema.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.send(updateUser)
        // console.log("update");
    } catch (error) {
        console.log(error);
    }
})
module.exports = user