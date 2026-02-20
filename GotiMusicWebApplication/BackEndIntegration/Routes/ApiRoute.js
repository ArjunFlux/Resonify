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
router.get('/play', async (req,res)=>{
  const SongId = req.query.q; // this q is the qureyed URL
  console.log("This is the requested Song id : ",SongId);
  try{
    const responce = await fetch("https://saavn.sumit.co/api/search/songs?query=Bollywood&limit=40&page=1")
    if(!responce){
      console.log("Error in fetching the particular song details")
      return res.status(500).json({status:`Error while fetching theh data to play the song `})
    }
    const responceData = await responce.json();
    const MatchSongDetails = responceData.data.results.find(items => String(items.id).trim() === String(SongId).trim());
    if(!MatchSongDetails){
      console.log("Invalid Song id for the search and couldn't fetch the details");
      return res.status(400).json({status:`Couldn't find the song details due to invalid song details`})
    }
    console.log
    return  res.status(200).json(MatchSongDetails);
  }catch(err){
    console.log("Error in the try block :",err)
    return res.status(500).json({status:`Error in the try block`})
  }
})
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
module.exports = router;
