const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    owner: String,
    vehicle: String,
    model: String,
    vehicleType: String,//4 wheelers, 2 wheelers
    year: Number,
    price: Number,//per hour
    rc: String,//img
    vehicleImg: String,//img
    contact: String,
    ownerImg: String,//img
    vehicleNo: String
})

const rentModel = mongoose.model("rent", Schema)
const saleModel = mongoose.model("sale", Schema)
module.exports = {rentModel, saleModel}