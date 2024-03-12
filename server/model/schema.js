const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    owner: String,
    vehicle: String,
    model: String,
    year: String,
    price: Number,//per hour
    registration: String,//img,
    address: String,
    pincode: String,
    contact: String,
    email: String,
    vehicleImg: [{type: String}],
    ownerImg: [{type: String}]
})

const rentModel = mongoose.model("rent", Schema)
const saleModel = mongoose.model("sale", Schema)
module.exports = {rentModel, saleModel}