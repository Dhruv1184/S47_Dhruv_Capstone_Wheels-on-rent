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
    vehicleImg: [{type: String}],//img
    ownerImg: [{type: String}],//img
    // vehicleNo: String
    // vehicleType: String,//4 wheelers, 2 wheelers
})

const rentModel = mongoose.model("rent", Schema)
const saleModel = mongoose.model("sale", Schema)
module.exports = {rentModel, saleModel}