import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiHomeLine } from "react-icons/ri";
import { TbCategory2 } from "react-icons/tb";
import { BsPerson } from "react-icons/bs";
import { RiPlayListLine } from "react-icons/ri";
import { MdOutlineExplore } from "react-icons/md";
import { TbMusicDollar } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
import { FaRegPlayCircle } from "react-icons/fa";
import { MdCloseFullscreen } from "react-icons/md";
function PopularSongs() {
  const location = useLocation();
  const {
    name,
    songs = [],
    PlaylistType,
    ArtistName = [],
  } = location.state || {};
  const [isOpen, setisOpen] = useState(false);
  const LengtOfThePlaylist = songs?.length || 0;
  const [SongToBePlayed, setSongToBePlayed] = useState(""); // this is the react variable for the song to be played
  const [ShowAudioTag, setShowAudioTag] = useState(false); // This is the react variable for the display of the audio tag
  const [SongIdMatch, setSongIdMatch] = useState(null);
  const [SongForDisplay, setSongsForDisplay] = useState([]);
  async function handleOnClickToPlaySong(Song) {
      setSongsForDisplay(Song);
      setSongToBePlayed(Song.downloadUrl[1].url);
      setShowAudioTag((prev) => !prev);
      setSongIdMatch(Song.id);
  }
  function handleClick() {
    setShowAudioTag((prev) => !prev);
  }
  return (
    <div className="flex bg-linear-110 from-black to-slate-900 h-[200vh] text-white">
      <div>
        <div className="h-[87vh] w-[30vh] mx-10 rounded-2xl my-5 bg-gray-900">
          <div className="flex items-center">
            <img
              src="/image.png"
              alt="Logo of the Website"
              className="rounded-full h-13 bg-orange-500 m-5"
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
            <div
              className="relative flex items-center mt-10 gap-3 cursor-pointer"
              onClick={() => setisOpen(!isOpen)}
            >
              <RiPlayListLine size={32} className="cursor-pointer" />
              <p>Chat With Friends</p>
            </div>
          </div>
        </div>
      </div>
      {/* This is the main part of the Popular playlist */}
      <div>
        <div className="mt-10 ml-20 flex">
          <img
            src={"/61ygTdD3mDL._SL1280_.jpg"}
            alt="Photo of the Playlist"
            className="h-50 rounded-2xl"
          />
          <div>
            <p className=" text-3xl font-semibold mt-10 ml-15">{name}</p>
            <p className="ml-15 text-[13px] mt-3 text-gray-400">
              Got some rad stuff you should listen to immediately. Find your{" "}
              <br /> Favaroite, discover the hottest new beats and give me a
              follow
            </p>
            <p className="ml-15 mt-3 font-semibold">
              {PlaylistType} || {LengtOfThePlaylist}{" "}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-10 ml-68 -mt-5">
          <button className="cursor-pointer px-7 bg-red-500 rounded-2xl text-black py-2">
            Play
          </button>
          <button className="cursor-pointer">Add to Playlist</button>
        </div>
        {/* THis is the total Track which can be played */}
        <div className="ml-10">
          <table>
            <thead>
              <tr>
                <th className="pt-10">Image</th>
                <th className="pt-10">Track</th>
                <th className="pt-10">Artist</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song, index) => (
                <tr key={index}>
                  <td className="pt-10 px-4 py-2 group">
                    <img
                      src={song.image[2].url}
                      alt={song.name}
                      className=" h-15 w-15 relative group-hover:brightness-70"
                    />
                    <FaRegPlayCircle
                      className="absolute -mt-10 ml-4 opacity-0 group-hover:opacity-100 cursor-pointer"
                      size={25}
                      onClick={() => handleOnClickToPlaySong(song)}
                    />
                  </td>
                  <td className="px-4 pl-30 py-2">
                    {song.name.split("(")[0].trim()}
                  </td>
                  {ArtistName.length == 0 ? (
                    <div>
                      <p className="px-4 pl-30 mt-8 py-2">
                        Loading The Artistname
                      </p>
                    </div>
                  ) : (
                    <td className="px-4 pl-30 py-2">{ArtistName}</td>
                  )}
                  <td>
                    <IoMdAdd
                      className="hover:border hover:rounded-full ml-25 hover:bg-gray-600 cursor-pointer hover:text-black"
                      size={25}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
              {ShowAudioTag && SongForDisplay.id === SongIdMatch && (
                <div className="border border-gray-800 absolute top-0 right-15 -mr-10 h-80 w-80 backdrop-blur-3xl rounded-2xl">
                  <div>
                    <img
                      src={SongForDisplay.image[2].url || "/placeholder.png"}
                      className="h-45 ml-15 mt-3 rounded-full"
                    />
                    <div>
                      <p className="text-center font-bold mt-5">
                        {SongForDisplay.album.name.split("(")[0].trim()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-10 px-5 mt-5">
                    <audio controls autoPlay loop src={SongToBePlayed} />
                    <MdCloseFullscreen
                      size={30}
                      className="-ml-5 hover:text-red-400 cursor-pointer"
                      onClick={() => {
                        handleClick();
                      }}
                    />
                  </div>
                </div>
              )}
        </div>
      </div>
    </div>
  );
}
export default PopularSongs;
