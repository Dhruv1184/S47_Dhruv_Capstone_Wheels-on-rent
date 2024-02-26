const express = require("express");
const mongoose = require("mongoose");
const app = express()
require("dotenv").config();
const port = 7000;
URI = process.env.Mongoose_URL
const Data = require("./Data.json");
app.use(express.json());
mongoose.connect(URI, {
    dbName : "Capstone"
})

app.get("/", (req, res) => {
    res.send(Data)
})

app.post("/", (req, res) => {
    const newData = req.body
    Data.push(newData)
    console.log(newData)
    res.json(newData)
})

app.put("/:id", (req, res) => {
    const id = req.params.id
    const updatedData = req.body
    Data[id] = updatedData
    res.json(updatedData)
})

app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})
