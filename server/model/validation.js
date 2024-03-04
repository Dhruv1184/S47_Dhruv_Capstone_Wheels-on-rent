const joi = require('joi')

const Validator = (schema)=>(payload)=>schema.validate(payload,{abortEarly:false})

const schema = joi.object({
    owner: joi.string().min(3).required(),
    vehicle: joi.string().required(),
    model: joi.string().required(),
    year: joi.string().required(),
    price: joi.number().required(),
    registration: joi.string().required(),
    address: joi.string().required(),
    pincode: joi.string().pattern(/^[0-9]{6}$/,"pincode").required(),
    contact: joi.string().length(10).required(),
    ownerImg: joi.array().required(),
    vehicleImg: joi.array().required()
})

exports.validData = Validator(schema)