const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    img: String,
    contact : String,
    address: String,
    pincode: String,
    token: String,
    password: String
})

module.exports = mongoose.model('user', UserSchema)