const express = require("express");
const mongoose = require("mongoose");
const {rentModel} = require("../model/schema");

const rent = express()


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

rent.get("/rent", (req, res) => {
    rentModel.find({})
    .then((data)=>{
        res.json(data)
    }).catch((err)=>{
        console.log(err)
    })     
    
})

rent.post("/rent",  (req, res) => {
    const newData = req.body
    rentModel.create(newData)
    .then(()=>{
        res.json(newData)
    }).catch((err)=>{
        console.log(err)
    })

})

rent.get("/rent/:id", (req, res) => {
    const id = req.params.id
    rentModel.findById(id)
    .then((data)=>{
        res.json(data)
    }).catch((err)=>{
        console.log(err)
    })
})
rent.put("/rent/:id",(req, res) => {
    const id = req.params.id
    const updatedData = req.body
    rentModel.findByIdAndUpdate(id, updatedData)
    .then(()=>{
        res.json(updatedData)
    }).catch((err)=>{
        console.log(err)
    })
})

module.exports = rent