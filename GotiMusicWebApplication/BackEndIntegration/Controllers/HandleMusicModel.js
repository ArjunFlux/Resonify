const MusicModel = require('../Models/MusicModel')
async function handleMusicModelCreation(req,res){
    const {NameOfSong , ArtistName , UserName , Duration} = req.body;
    if(!NameOfSong || !ArtistName || !UserName || !Duration ){
        return res.status(400).json({status:`Bad Request by the user`});
    }
    const MusicModelUpdated = await MusicModel.create({
        NameOfSong:NameOfSong,
        ArtistName:ArtistName,
        UserName:UserName,
        Duration:Duration,
    })
    if(!MusicModel){
        return res.status(500).json({status:`Internal Server error while creating user model`})
    }
    return res.status(200).json({status:`Successfully Created the Music Model`});
}
module.exports = handleMusicModelCreation