const MusicIntoPlaylistModel = require('../Models/MusicIntoPlaylist')
async function handleAddOfMusicIntoPlaylist(req,res){
    console.log(NameOfSong,NameOfPlaylist);
    if(!NameOfSong || !NameOfPlaylist){
        return res.status(400).json({status:"Invalid Data from the frontend"});
    }
    const EntryDetails = await MusicIntoPlaylistModel.create({
        SongDetailsInDataBase : NameOfSong,
        NameOfPlaylistInDataBase : NameOfPlaylist,
    })
    if(!EntryDetails){
        return res.status(500).json({status:"Internal Server Error in Creating a new Entry for the database"});
    }
    console.log("Successfully added the data")
    return res.status(201).json({status:"Successfully Entered the Data into the database"});
}
module.exports = handleAddOfMusicIntoPlaylist