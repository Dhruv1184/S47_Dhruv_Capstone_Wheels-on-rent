const express = require("express");
const mongoose = require("mongoose");
const {rentModel} = require("../model/schema");
const  {validData} = require("../model/validation")
const rent = express()
const {upload} = require("../middleware/rentImage.middleware.js")
const verifyToken = require("../middleware/jwt.middleware.js");
const { log } = require("console");
require("dotenv").config();
rent.use(express.json());

mongoose.connect(process.env.Mongoose_URL, {
    dbName : "Capstone"
}).then(()=>{
    console.log("Connected to Database")
}).catch((err)=>{
    console.log(err)
}) 

rent.get("/ping",(req, res)=>{
    res.send("Pong")
})

rent.get("/rent/data",verifyToken,async (req, res) => {
    try {
        const data = await rentModel.find({})
        // console.log("rent Data");
        user = res.locals.user
        res.json({"Data":data,"user":user})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }   
})

rent.post("/rent/insert" ,upload.fields([{name: "ownerImg", maxCount: 1},{name: "vehicleImg", maxCount: 1}]),async (req, res) => {
    const newData = req.body
    // console.log(req.body);
    // console.log(req.files);
    let ownerImg = []
    let vehicleImg = []
    if(req.files && req.files.ownerImg && req.files.vehicleImg && Array.isArray(req.files.ownerImg) && Array.isArray(req.files.vehicleImg)){
        for(let i = 0; i < req.files.ownerImg.length; i++){
            ownerImg.push(req.files.ownerImg[i].path)
        }
        for(let i = 0; i < req.files.vehicleImg.length; i++){
            vehicleImg.push(req.files.vehicleImg[i].path)
        }
        newData.ownerImg = ownerImg
        newData.vehicleImg = vehicleImg
    }

    try {
        const {error} = validData(req.body)
        if(error) return res.json({message:error.message})
        console.log(newData)
        // console.log(req.body)
        await rentModel.create(newData)
        res.json(newData)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
})

rent.get("/rent/:id", async (req, res) => {
    try {
        const id = req.params.id
        const data = await rentModel.findById(id)
        res.json(data)
    } catch (error) {
        console.log(error) 
        res.status(500).json({message: error.message})
    }
})
rent.put("/rent/:id",async (req, res) => {
    try {
        const id = req.params.id
        const updatedData = req.body
        await rentModel.findByIdAndUpdate(id, updatedData)
        res.json(updatedData)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
})

rent.delete("/rent/delete/:id",async (req, res) => {
    try {
        const id = req.params.id
        await rentModel.findByIdAndDelete(id)
        res.json({message: "Deleted Successfully"})
    } catch (error) {
        console.log(error)
    }
})
module.exports = rent