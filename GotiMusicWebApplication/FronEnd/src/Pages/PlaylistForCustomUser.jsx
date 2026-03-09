import React, { useEffect, useState } from "react";
import { RiHomeLine } from "react-icons/ri";
import { BsPerson } from "react-icons/bs";
import { RiPlayListLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineExplore } from "react-icons/md";
import { TbMusicDollar } from "react-icons/tb";
import { MdPlaylistAddCheck } from "react-icons/md";
import { FaRegPlayCircle } from "react-icons/fa";
import { MdCloseFullscreen } from "react-icons/md";
function PlaylistForCustomUser() {
  const [isPlaylistCreated, setisPlaylistCreated] = useState(false);
  const [SavedSongDetails, setSavedSongDetails] = useState([]);
  const [CurrentUserName, setCurrentUserName] = useState("");
  const [SongToBePlayed, setSongToBePlayed] = useState(""); // this is the react variable for the song to be played
  const [ShowAudioTag, setShowAudioTag] = useState(false); // This is the react variable for the display of the audio tag
  const [SongAudioDisplay, setSongAudioDisplay] = useState([]);
  const [SongId, setSongId] = useState();
  async function handleOnClickToPlaySong(Song) {
    setSongToBePlayed(Song.SongDetailsInDataBase.downloadUrl[1].url);
    setShowAudioTag((prev) => !prev);
    setSongAudioDisplay(Song.SongDetailsInDataBase);
    setSongId(Song.SongDetailsInDataBase.id);
  }
  function handleClick() {
    setShowAudioTag((prev) => !prev);
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
  useEffect(() => {
    const MusicDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:8001/user/customplaylistdetails",
          {
            method: "GET",
          },
        );
        if (response.ok) {
          const MusicResponse = await response.json();
          setSavedSongDetails(MusicResponse);
        } else {
          console.log(
            "Error while fetching the details of the song from the backend",
          );
        }
      } catch (err) {
        console.log("Error in the try block of the CustomPlaylist part");
      }
    };
    MusicDetails();
  }, []);
  const location = useLocation();
  const { name, discription } = location.state || {};
  useEffect(() => {
    const userNameLocalstroage = async () => {
      const UserNameFromLocalStorage = localStorage.getItem("PlaylistCreated");
      setCurrentUserName(UserNameFromLocalStorage);
    };
    userNameLocalstroage();
  }, []);
  return (
    <div className="bg-linear-110 from-black flex to-slate-900 min-h-screen text-white overflow-y-hidden">
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
      <div className="mt-10">
        <div className="ml-20 flex">
          <div>
            <img
              src="/image copy.png"
              alt="Photo of the Playlist"
              className="h-20 rounded-full"
            />
          </div>
          <div className="mt-3 ml-5">
            <p className="text-2xl font-semibold">{name}</p>
            <p className="text-[12px]">{discription}</p>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-80 mt-10 ml-40 font-semibold text-xl">
            <p>Title</p>
            <p>Ablum</p>
            <p>Duration</p>
          </div>
          <hr className="mt-5 ml-32 text-gray-700"/>
          {SavedSongDetails.map((SavedSong) => (
            <div key={SavedSong.id}>
              {CurrentUserName == SavedSong.NameOfPlaylistInDataBase.Author &&
              name == SavedSong.NameOfPlaylistInDataBase.NameOfPlaylist ? (
                <div className="flex justify-between items-center text-gray-400 ml-20 mt-10 gap-40">
                  <div>
                    <div className="flex items-center gap-5">
                      <div className="group">
                        <img
                          src={SavedSong.SongDetailsInDataBase.image[2].url}
                          alt="Photo of the Ablum"
                          className="h-20 rounded-full relative group-hover:brightness-70"
                        />
                        <FaRegPlayCircle
                          className="absolute -mt-13 ml-6 opacity-0 group-hover:opacity-100 cursor-pointer"
                          size={30}
                          onClick={() => handleOnClickToPlaySong(SavedSong)}
                        />
                      </div>
                      <div className="text-gray-400 text-[12px]">
                        <p>
                          {SavedSong.SongDetailsInDataBase.name
                            .split("(")[0]
                            .trim()}
                        </p>
                        <div>
                          <p>
                            {
                              SavedSong.SongDetailsInDataBase.artists.primary[0]
                                .name
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p> {SavedSong.SongDetailsInDataBase.album.name}</p>
                  <p>
                    {Math.floor(SavedSong.SongDetailsInDataBase.duration / 60)}:
                    {(SavedSong.SongDetailsInDataBase.duration % 60)
                      .toString()
                      .padStart(2, "0")}
                  </p>
                  {ShowAudioTag &&
                    SavedSong.SongDetailsInDataBase.id == SongId && (
                      <div className="border border-gray-800 absolute top-0 right-15 -mr-10 h-80 w-80 backdrop-blur-3xl rounded-2xl">
                        {SongAudioDisplay && (
                          <div>
                            <div>
                              <img
                                src={
                                  SavedSong.SongDetailsInDataBase.image[1]
                                    .url || "/placeholder.png"
                                }
                                className="h-45 ml-15 mt-3 rounded-full"
                              />
                              <div>
                                <p className="text-center font-bold mt-5">
                                  {SavedSong.SongDetailsInDataBase.album.name
                                    .split("(")[0]
                                    .trim()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-10 px-5 mt-5">
                              <audio
                                controls
                                autoPlay
                                loop
                                src={SongToBePlayed}
                              />
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
                    )}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlaylistForCustomUser;
