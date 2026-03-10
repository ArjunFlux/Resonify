const MusicModel = require('../Models/MusicModel')
async function handleMusicPlaylistCreation(req,res){
    const {NameOfPlaylist,Author,Discription} = req.body;
    console.log(NameOfPlaylist , Author , Discription);
    if(!NameOfPlaylist || !Author || !Discription){
        return res.status(400).json({status:`Bad Request by the user`});
    }
    const MusicModelUpdated = await MusicModel.create({
        NameOfPlaylist:NameOfPlaylist,
        Author:Author,
        Discription:Discription,
    })
    if(!MusicModelUpdated){
        return res.status(500).json({status:`Internal Server error while creating user model`})
    }
    console.log("Successfully Added a now music model")
    return res.status(200).json({status:`Successfully Created the Music Model`});
}
module.exports = handleMusicPlaylistCreation