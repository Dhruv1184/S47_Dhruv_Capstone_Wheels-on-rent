const express = require("express");
const mongoose = require("mongoose");
const {saleModel} = require("../model/schema");

const sale = express()


require("dotenv").config();
sale.use(express.json());

mongoose.connect(process.env.Mongoose_URL, {
    dbName : "Capstone"
}).then(()=>{
    console.log("Connected to Database")
}).catch((err)=>{
    console.log(err)
})

sale.get("/ping",(req, res)=>{
    res.send("Pong")
})

sale.get("/sale", (req, res) => {
    saleModel.find({})
    .then((data)=>{
        res.json(data)
    }).catch((err)=>{
        console.log(err)
    })     
    
})

sale.post("/sale",  (req, res) => {
    const newData = req.body
    saleModel.create(newData)
    .then(()=>{
        res.json(newData)
    }).catch((err)=>{
        console.log(err)
    })

})

sale.get("/sale/:id", (req, res) => {
    const id = req.params.id
    saleModel.findById(id)
    .then((data)=>{
        res.json(data)
    }).catch((err)=>{
        console.log(err)
    })
})
sale.put("/sale/:id",(req, res) => {
    const id = req.params.id
    const updatedData = req.body
    saleModel.findByIdAndUpdate(id, updatedData)
    .then(()=>{
        res.json(updatedData)
    }).catch((err)=>{
        console.log(err)
    })
})

module.exports = sale