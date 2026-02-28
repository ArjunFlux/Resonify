const mongoose = require('mongoose')
// the schema for the music model
const MusicSchema = mongoose.Schema({
    NameOfPlaylist : {
        type:String,
        required:true,
    },
    Author:{
        type:String,
        required:true,
    },
    Discription:{
        type:String,
        required:true,
    }
},{timestamp:true})
// Music Model creation 
const MusicModel = mongoose.model("MusicModel",MusicSchema);
module.exports = MusicModel;