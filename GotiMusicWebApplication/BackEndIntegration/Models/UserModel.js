const mongoose = require('mongoose');
  // Schema Creation 
const UserSchema = mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
        unique:true,
    },
    Password:{
        type:String,
        required:true,
        unique:true,
    },
    Roles:{
        type:String,
        required:true,
        enum:['Admin','Normal'],
        default:"Normal",
    }
},{timestamp:true})

// Model Creation 
const UserModel = mongoose.model("UserDetails",UserSchema);
module.exports = UserModel;