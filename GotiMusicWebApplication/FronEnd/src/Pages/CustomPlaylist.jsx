import React, { useEffect, useState } from "react";
import { RiHomeLine } from "react-icons/ri";
import { BsPerson } from "react-icons/bs";
import { RiPlayListLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineExplore } from "react-icons/md";
import { TbMusicDollar } from "react-icons/tb";
import { MdPlaylistAddCheck } from "react-icons/md";
function CustomPlaylist() {
  const [isPlaylistCreated, setisPlaylistCreated] = useState(false);
  const [MusicModelInfo, setMusicModelInfo] = useState([]);
  const [UserName, setUserName] = useState("");
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
  useEffect(() => {
    const MusicModelDetails = async () => {
      const MusicInfo = await fetch("http://localhost:8001/user/getmusic", {
        method: "GET",
      });
      if (MusicInfo.ok) {
        const MusicInfoResponse = await MusicInfo.json();
        setMusicModelInfo(MusicInfoResponse);
      } else {
        console.log("Error in fetching the data from the backend");
      }
    };
    MusicModelDetails();
  }, []);
  useEffect(() => {
    const userNameLocalstroage = async () => {
      const UserNameFromLocalStorage = localStorage.getItem("PlaylistCreated");
      setUserName(UserNameFromLocalStorage);
    };
    userNameLocalstroage();
  }, []);
  return (
    <div className="bg-linear-110 from-black  to-slate-900 h-screen text-white overflow-y-hidden">
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
      <div className="grid grid-cols-2 gap-10 w-[70%] ml-90 -mt-180">
        {MusicModelInfo.map((Playlist, id) => (
          <div key={id}>
            {Playlist.Author == UserName ? (
              <div>
                <Link to={`/userplaylist`} state={{
                  name:Playlist.NameOfPlaylist,
                  discription:Playlist.Discription
                }}>
                  <div className="bg-linear-to-r from-blue-800 rounded-2xl to-slate-700 flex gap-10 items-center cursor-pointer py-2 px-5">
                    <div>
                      <img
                        src="/image copy.png"
                        alt="Photo of the Playlist"
                        className="h-20 rounded-full"
                      />
                    </div>
                    <div>
                      <p className="text-2xl">{Playlist.NameOfPlaylist}</p>
                      <p>{Playlist.Discription}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
export default CustomPlaylist;
