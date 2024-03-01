const express = require("express");
const mongoose = require("mongoose");
const app = express()
const port = 7000;

const Data = require("./Data.json");
const rent = require("./routes/rent");
const sale = require("./routes/sale");

app.use('/',rent);
app.use('/',sale);
app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})
