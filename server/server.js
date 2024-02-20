const express = require("express");
const mongoose = require("mongoose");
const app = express()
require("dotenv").config();
const port = 7000;
URI = process.env.Mongoose_URL
const Data = require("./Data.json");
mongoose.connect(URI, {
    dbName : "Capstone"
})

app.get("/", (req, res) => {
    res.send(Data)
})

app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})
