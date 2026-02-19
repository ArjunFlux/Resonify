const mongoose = require('mongoose')
// Schema of the Opt :
const OptSchema = mongoose.Schema({
    Email:{
        type:String,
        required:true
    },
    Otp:{
        type:Number,
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: 300
    }
},{timestamp:true})
// Model Creation 
const OtpModel = mongoose.model("OptModel",OptSchema)
module.exports = OtpModel;