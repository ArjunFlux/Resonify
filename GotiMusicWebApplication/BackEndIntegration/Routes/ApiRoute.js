const express = require("express");
const router = express.Router();
// Using the API requesting to get the data desired by the user 
router.get("/show", async (req, res) => {
  const Song = req.query.q;
  try{
    const responce = await fetch(`https://saavn.sumit.co/api/search/songs?query=${Song}&limit=16&page=1`);
    if(!responce){
      return res.status(400).json({status:`Error in getting the response from the Subjected URL`})
    }
    const responceData = await responce.json();
    if(!responceData){
      return res.status(500).json({status:`Couldn't get the Response Data from the Given URL`})
    }
    return res.status(201).json(responceData);
  }catch(err){
    console.log("Error which cann't be subjected to anything knwon : ",err);
  }
})
// this is to show more
router.get("/showMore", async (req, res) => {
  const Song = req.query.q;
  try{
    const responce = await fetch(`https://saavn.sumit.co/api/search/songs?query=${Song}&limit=100&page=1`);
    if(!responce){
      return res.status(400).json({status:`Error in getting the response from the Subjected URL`})
    }
    const responceData = await responce.json();
    if(!responceData){
      return res.status(500).json({status:`Couldn't get the Response Data from the Given URL`})
    }
      return res.status(201).json(responceData);
  }catch(err){
    console.log("Error which cann't be subjected to anything knwon : ",err);
  }
})
// this is to play music
router.get('/language',async (req,res)=>{
  const languageType = req.query.q;
  console.log(languageType);
  const response = await fetch(`https://saavn.sumit.co/api/search/songs?query=${languageType}&limit=16&page=1`)
  if(!response){
    return res.status(500).json({status:`Error in getting the response back from the api`})
  }
  console.log(response);
  const responceData = await response.json();
  if(!responceData){
    return res.status(500).json({status:`Error in getting the json response from the api`});
  }
  return res.status(200).json(responceData);
})
router.get('/song',async (req,res)=>{
  const SongName = req.query.q;
  console.log("Artist Name is : ",SongName);
  try{
    const ArtistResponse = await fetch(`https://saavn.sumit.co/api/search/songs?query=${SongName}`);
    const ArtistResponseData = await ArtistResponse.json();
    if(!ArtistResponseData){
      return res.status(503).json({status:`Error Occured : `})
    }
    console.log("Artist Details are : ",ArtistResponseData);
    return res.status(200).json(ArtistResponseData);
  }catch(err){
    console.log("Error while fetching the data : ",err);
  }
})
module.exports = router;
