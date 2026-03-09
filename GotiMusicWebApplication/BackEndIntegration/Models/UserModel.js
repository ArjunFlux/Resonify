const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://parth_123:xdparth3010@resonifyclusters.if5b0hx.mongodb.net/MusicWebApplication?retryWrites=true&w=majority')
  .then(() => console.log("Connection established"))
  .catch(err => console.error("Error while connecting to the Database", err));
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