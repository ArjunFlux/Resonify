const mongoose = require('mongoose')
// the schema for the music model
const MusicSchema = mongoose.Schema({
    NameOfSong : {
        type:String,
        required:true,
    },
    ArtistName:{
        type:String,
        required:true,
    },
    UserName:{
        type:String,
        required:true,
    },
    Duration:{
        type:Number,
        required:true,
    }
},{timestamp:true})
// Music Model creation 
const MusicModel = mongoose.model("MusicModel",MusicSchema);
module.exports = MusicModel;