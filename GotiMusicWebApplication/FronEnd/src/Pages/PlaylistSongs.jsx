import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiHomeLine } from "react-icons/ri";
import { BsPerson } from "react-icons/bs";
import { RiPlayListLine } from "react-icons/ri";
import { MdOutlineExplore } from "react-icons/md";
import { TbMusicDollar } from "react-icons/tb";
import { MdPlaylistAddCheck } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
function PlaylistSongs() {
  const [isPlaylistCreated, setisPlaylistCreated] = useState(false);
  const [UserName , setUserName] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{
    const UserNameFunction = async ()=>{
      const LocalStorageToken = localStorage.getItem("token");
      try{
        if(LocalStorageToken){
          const DecodedToken = jwtDecode(LocalStorageToken);
          setUserName(DecodedToken);
        }else{
          console.log("Error in getting the token from the local storage");
        }
      }catch(err){
        console.log("Unkown Error Occured")
      }
    };
    UserNameFunction();
  },[])
  async function handleSubmit(e) {
    e.preventDefault();
    const FormData = {
      NameOfPlaylist: e.target.NameOfPlaylist.value,
      Author: e.target.Author.value,
      Discription: e.target.Discription.value,
    };
    try {
      const FetchtResponse = await fetch(
        "https://resonify-5.onrender.com/user/createmusic",
        {
          method: "POST", // this is the how we want to send the data to the backend
          credentials: "include",
          headers: { "Content-type": "application/json" }, // what is the type of the data
          body: JSON.stringify(FormData), // we use stringify when we have to add/send the data and we use praser when we want to read the data
        },
      );
      if (FetchtResponse.ok) {
        // this is the response
        const ReturnResponse = await FetchtResponse.json();
        localStorage.setItem("PlaylistCreated", UserName.Name);
        navigate("/mainpage");
      } else {
        console.log("Error while login ", response.status);
      }
    } catch (err) {
      console.log("Error while creating the playlist:", err);
    }
  }
  useEffect(() => {
    const CreatedPlaylist = async () => {
      const isPresnet = localStorage.getItem("PlaylistCreated");
      if (isPresnet) {
        setisPlaylistCreated((prev) => !prev);
      } else {
        setisPlaylistCreated(prev);
      }
    };
    CreatedPlaylist();
  }, []);
  return (
    <div className="bg-linear-110 from-black flex to-slate-900 h-screen text-white overflow-y-hidden">
      {/* This is the sidebar */}
      <div className="h-[87vh] w-[30vh] mx-10 rounded-2xl my-5 bg-gray-900">
        <div className="flex items-center">
          <img
            src="/image.png"
            alt="Logo of the Website"
            className="rounded-full h-12 bg-orange-500 m-5"
          />
          <p className="text-2xl font-bold text-orange-500">Resonify</p>
        </div>
        <div className="flex-col items-center mt-8 ml-10 text-[18px]">
          <div className="flex items-center  mt-10 gap-3 cursor-pointer">
            <RiHomeLine size={32} />
            <Link to={`/mainpage`}>
              <p>Home</p>
            </Link>
          </div>
          <div className="flex items-center  mt-10 gap-3 cursor-pointer">
            <BsPerson size={32} />
            <Link to={`/artist`}>
              <p>Artist's</p>
            </Link>
          </div>
          <div className="flex items-center  mt-10 gap-3 cursor-pointer">
            <TbMusicDollar size={32} />
            <Link to={`/addyourmuisc`}>
              <p>Add Your Music</p>
            </Link>
          </div>
          <div className="flex items-center  mt-10 gap-3 cursor-pointer">
            <MdOutlineExplore size={32} />
            <Link to={`/explore`}>
              <p>Explore</p>
            </Link>
          </div>
          <div className="relative flex items-center mt-10 gap-3 cursor-pointer">
            <RiPlayListLine size={32} className="cursor-pointer" />
            <p>Chat With Friends</p>
          </div>
          {isPlaylistCreated ? (
            <div className="relative flex items-center mt-10 gap-3 cursor-pointer">
              <MdPlaylistAddCheck size={32} className="cursor-pointer" />
              <p>Custom Playlist</p>
            </div>
          ) : null}
        </div>
      </div>
      <form className="flex gap-10" onSubmit={handleSubmit}>
        <img
          src="/61ygTdD3mDL._SL1280_.jpg"
          alt="Default photo of the playlist"
          className="h-50 mt-10"
        />
        <div>
          <input
            placeholder="Enter the name of this playlist :"
            className="border w-90 border-t-0 border-l-0 border-r-0 h-10 mt-10 px-5 border-gray-800"
            name="NameOfPlaylist"
          />
          <br />
          <input
            placeholder="Enter the Author of this playlist :"
            className="border w-90 border-t-0 border-l-0 border-r-0 h-10 mt-5 px-5 border-gray-800"
            name="Author"
          />
          <br />
          <input
            placeholder="Enter the Discription of this playlist :"
            className="border w-90 border-t-0 border-l-0 border-r-0 h-10 mt-5 px-5 border-gray-800"
            name="Discription"
          />
          <br />
          <button
            className="mt-10 ml-20 py-2 px-5 bg-green-600 cursor-pointer"
            type="submit"
          >
            Create a playlist
          </button>
        </div>
      </form>
    </div>
  );
}
export default PlaylistSongs;
