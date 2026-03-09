const express = require("express");
const router = express.Router();
const MusicModel = require("../Models/MusicModel");
// Function exported from different files
const handleCreateUser = require("../Controllers/HandleCreateUser");
const handleverifyuser = require("../Controllers/HandleVerifyUser");
const handleUpgradeUserRole = require("../Controllers/HandleUpgradeRole");
const handleEmailSend = require("../Controllers/EmailSend");
const handleOtpVerificationOfTheUser = require("../Controllers/HandleOtpVerificationOfTheUser");
const CheckTheEmailbeforeTheOtpGeneration = require("../Middleware/CheckTheEmailBeforeTheOtpGeneration");
const handleMusicPlaylistCreation = require("../Controllers/HandleMusicModel");
const checkforauthentication = require("../Middleware/CheckForAuthentication");
const handleAddOfMusicIntoPlaylist = require('../Controllers/handleAddOfMusicIntoPlaylist')
// Route for the connection between the Server and Database
router.post("/create", handleCreateUser); // signup
router.post("/login", handleverifyuser); // login
router.post(
  "/emailverification",
  CheckTheEmailbeforeTheOtpGeneration,
  handleEmailSend,
);
router.post("/verifiy", handleOtpVerificationOfTheUser);
router.get("/getmusic", async (req, res) => {
  try {
    const MusicModelInfo = await MusicModel.find();
    res.json(MusicModelInfo);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
});
const MusicIntoPlaylistModel = require('../Models/MusicIntoPlaylist')
router.post("/addtoplaylist",handleAddOfMusicIntoPlaylist);
router.get('/customplaylistdetails', async (req,res)=>{
  try{
    const MusicDetails = await MusicIntoPlaylistModel.find();
    res.status(200).json(MusicDetails);
  }catch(err){
    res.status(500).json({status:'Error while fetching the details from the database'});
  }
})
// This is a protected routes
router.post("/upgrade", checkforauthentication, handleUpgradeUserRole);
router.post(
  "/createmusic",
  checkforauthentication,
  handleMusicPlaylistCreation,
);
module.exports = router;
