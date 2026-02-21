import React from "react";
import { MdOutlineExplore } from "react-icons/md";
import { TbMusicDollar } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useState } from "react";
import { RiHomeLine } from "react-icons/ri";
import { TbCategory2 } from "react-icons/tb";
import { BsPerson } from "react-icons/bs";
import { RiPlayListLine } from "react-icons/ri";
import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { CiPlay1 } from "react-icons/ci";
import { MdCloseFullscreen } from "react-icons/md";
function ArtistPage() {
  const [SongForDisplay, setSongsForDisplay] = useState([]); // this is the react variable for the song display
  const [SongToBePlayed, setSongToBePlayed] = useState(""); // this is the react variable for the song to be played
  const [ShowAudioTag, setShowAudioTag] = useState(false); // This is the react variable for the display of the audio tag
  const [SongIdMatch, setSongIdMatch] = useState(null);
  const [isLoadin, setisLoading] = useState(false);
  const [SongName, setSongName] = useState("");
  const [UserSongPlay, setUserSongPlay] = useState([]);
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch("/api/show?q=Bollywood");
        const songs = await res.json();
        console.log("Songs from backend:", songs);
        setSongsForDisplay(songs.data.results);
        setisLoading(true);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    fetchSongs();
  }, []);
  async function handleOnClickToPlaySong(Song) {
      setSongToBePlayed(Song.downloadUrl[2].url);
      setShowAudioTag((prev) => !prev);
      setSongIdMatch(Song.id);
  }
  function handleClick() {
    setShowAudioTag((prev) => !prev);
  }
  async function handlefilterSong(e) {
    const UserChoice = e.target.textContent; // to read the value of an tag use this not .value , it is used for the input tag
    if (UserChoice == "Bollywood" || UserChoice == "Hollywood") {
      try {
        const ResponseData = await fetch(`/api/show?q=${UserChoice}`);
        const responseData = await ResponseData.json();
        console.log("User Selected song is : ", responseData);
        setSongsForDisplay(responseData.data.results);
        setisLoading(true);
      } catch (err) {
        console.log("Error in fetching the user selected song : ", err);
      }
    } else if (UserChoice == "Hindi" || UserChoice == "English") {
      try {
        const ResponseData = await fetch(`/api/language?q=${UserChoice}`);
        const responseData = await ResponseData.json();
        console.log("User Selected song is : ", responseData);
        setSongsForDisplay(responseData.data.results);
        setisLoading(true);
      } catch (err) {
        console.log("Error in fetching the user selected song : ", err);
      }
    }
  }
  const handleSubmitForArtistName = async (e) => {
    e.preventDefault();
    const songname = SongName;
    console.log("Song Name Entered by the user is : ", songname);
    try {
      const SongResponse = await fetch(`/api/song?q=${songname}`);
      const SongResponseBack = await SongResponse.json();
      console.log("User Entered Song Details are : ", SongResponseBack);
      setUserSongPlay(SongResponseBack.data.results);
    } catch (err) {
      console.log("Error while fetiching the details", err);
    }
  };
  return (
    <div>
      <div className="bg-linear-110 from-black flex to-slate-900 h-screen text-white overflow-y-auto">
        {/* This is the sidebar  */}
        <div>
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
            </div>
          </div>
        </div>
        {/* This is the main content of this page */}
        <div className="w-[80vw]">
          <form onSubmit={handleSubmitForArtistName}>
            <div className="flex items-center gap-10">
              <input
                type="text"
                value={SongName}
                onChange={(e) => {
                  setSongName(e.target.value);
                }}
                placeholder="Enter the Song name here : "
                className="border border-gray-600 w-[40vw] px-5 py-3 mt-10 ml-10"
              />
              <button
                className="px-5 py-2 mt-10 bg-green-500 cursor-pointer"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="flex justify-between items-center px-10 mt-5">
            <p
              className="border px-5 py-2 bg-gray-900 border-gray-800 rounded-2xl cursor-pointer"
              onClick={(e) => {
                handlefilterSong(e);
              }}
            >
              Bollywood
            </p>
            <p
              className="border px-5 py-2 bg-gray-900 border-gray-800 rounded-2xl cursor-pointer"
              onClick={(e) => {
                handlefilterSong(e);
              }}
            >
              Hollywood
            </p>
            <p
              className="border px-5 py-2 bg-gray-900 border-gray-800 rounded-2xl cursor-pointer"
              onClick={(e) => {
                handlefilterSong(e);
              }}
            >
              Hindi
            </p>
            <p
              className="border px-5 py-2 bg-gray-900 border-gray-800 rounded-2xl cursor-pointer"
              onClick={(e) => {
                handlefilterSong(e);
              }}
            >
              English
            </p>
            <p
              className="border px-5 py-2 bg-gray-900 border-gray-800 rounded-2xl cursor-pointer"
              onClick={(e) => {
                handlefilterSong(e);
              }}
            >
              Pop
            </p>
            <p
              className="border px-5 py-2 bg-gray-900 border-gray-800 rounded-2xl cursor-pointer"
              onClick={(e) => {
                handlefilterSong(e);
              }}
            >
              Rap
            </p>
          </div>
          {/* This is to show few Songs from the fetch data */}
          {isLoadin ? (
            <div className="overflow-y-hidden">
              <div>
                {UserSongPlay == 0 ? (
                  <div className="grid grid-cols-4 gap-10 mt-10 ml-10">
                    {SongForDisplay.map((song) => (
                      <div key={song.id}>
                        <div>
                          <div className=" group gap-10">
                            <div className="group-hover:brightness-30 ">
                              <img
                                src={song.image[1].url || "/placeholder.png"}
                                className="h-25 rounded-2xl"
                              />
                            </div>
                            <div className="absolute text-[11px] opacity-0"></div>
                            <div className="absolute">
                              <CiPlay1
                                size={40}
                                className="ml-8 -mt-16 cursor-pointer opacity-0 group-hover:opacity-100"
                                onClick={() => {
                                  handleOnClickToPlaySong(song);
                                }}
                              />
                            </div>
                            <div>
                              {ShowAudioTag && song.id === SongIdMatch && (
                                <div className="border border-gray-800 absolute bottom-5 right-5 h-80 w-80 backdrop-blur-3xl rounded-2xl">
                                  <div>
                                    <img
                                      src={
                                        song.image[2].url || "/placeholder.png"
                                      }
                                      className="h-45 ml-15 mt-3 rounded-full"
                                    />
                                    <div>
                                      <p className="text-center font-bold mt-5">
                                        {song.album.name.split("(")[0].trim()}
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
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-10 mt-10 ml-10">
                    {UserSongPlay.map((songs) => (
                      <div key={songs.id}>
                        <div>
                          <div className=" group gap-10">
                            <div className="group-hover:brightness-30 ">
                              <img
                                src={
                                  songs.image[2].url ||
                                  "placeholder-image-url.jpg"
                                }
                                className="h-25 rounded-2xl"
                              />
                            </div>
                            <div className="absolute text-[11px] opacity-0"></div>
                            <div className="absolute">
                              <CiPlay1
                                size={40}
                                className="ml-8 -mt-16 cursor-pointer opacity-0 group-hover:opacity-100"
                                onClick={() => {
                                  handleOnClickToPlaySong(songs);
                                }}
                              />
                            </div>
                            <div>
                              {ShowAudioTag && songs.id === SongIdMatch && (
                                <div className="border border-gray-800 absolute bottom-5 right-5 h-80 w-80 backdrop-blur-3xl rounded-2xl">
                                  <div>
                                    <img
                                      src={
                                        songs.image[2].url || "/placeholder.png"
                                      }
                                      className="h-45 ml-15 mt-3 rounded-full"
                                    />
                                    <div>
                                      <p className="text-center font-bold mt-5">
                                        {songs.album.name.split("(")[0].trim()}
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
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center mt-20 text-3xl text-red-500">
              <p>Loading the songs</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArtistPage;
