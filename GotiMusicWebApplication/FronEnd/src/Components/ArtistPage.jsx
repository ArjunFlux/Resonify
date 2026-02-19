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
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch("/api/show?q=Bollywood");
        const songs = await res.json();
        console.log("Songs from backend:", songs);
        setSongsForDisplay(songs.data.results);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    fetchSongs();
  }, []);
  async function handleOnClickToPlaySong(SongId) {
    try {
      const res = await fetch(`/api/play?q=${SongId}`);
      const SongPLay = await res.json();
      console.log("The details for the song : ", SongPLay);
      setSongToBePlayed(SongPLay.downloadUrl[1].url);
      setShowAudioTag((prev) => !prev);
      setSongIdMatch(SongId);
    } catch (err) {
      console.log("Error incurrented : ", err);
    }
  }
  function handleClick(){
    setShowAudioTag((prev)=>!prev)
  }
  return (
    <div>
      <div className="bg-linear-110 from-black flex to-slate-900 h-screen text-white overflow-y-auto">
        {/* This is the sidebar  */}
        <div className="h-[87vh] w-[32vh] mx-10 rounded-2xl my-5 bg-gray-900">
          <div className="flex items-center">
            <img
              src="/image.png"
              alt="Logo of the Website"
              className="rounded-full h-12 bg-orange-500 m-5"
            />
            <p className="text-2xl font-bold text-orange-500">Resonify</p>
          </div>
          <div className="flex-col items-center mt-8 ml-10 text-[18px]">
            <Link to={`/mainpage`}>
              <div className="flex items-center  mt-10 gap-3 cursor-pointer">
                <RiHomeLine size={32} />
                <p>Home</p>
              </div>
            </Link>
            <Link to={`/artist`}>
              <div className="flex items-center  mt-10 gap-3 cursor-pointer">
                <BsPerson size={32} />
                <p>Artist's</p>
              </div>
            </Link>
            <Link to={`/addyourmuisc`}>
              <div className="flex items-center  mt-10 gap-3 cursor-pointer">
                <TbMusicDollar size={32} />
                <p>Add Your Music</p>
              </div>
            </Link>
            <div className="flex items-center  mt-10 gap-3 cursor-pointer">
              <MdOutlineExplore size={32} />
              <p>Explore</p>
            </div>
            <div className="relative flex items-center mt-10 gap-3 cursor-pointer">
              <RiPlayListLine size={32} className="cursor-pointer" />
              <p>Chat With Friends</p>
            </div>
          </div>
        </div>
        {/* This is the main content of this page */}
        <div className="w-[80vw]">
          <form>
            <div className="flex items-center gap-10">
              <input
                type="text"
                // value={ArtiestName}
                // onChange={handlechange}
                placeholder="Enter the Song name here : "
                className="border border-gray-600 w-[40vw] px-5 py-3 mt-10 ml-10"
              />
              <button className="px-5 py-2 mt-10 bg-green-500 " type="submit">
                Submit
              </button>
            </div>
          </form>
          {/* This is to show few Songs from the fetch data */}
          <div className="overflow-y-hidden">
            <div className="grid grid-cols-4 gap-10 mt-10 ml-10">
              {SongForDisplay.map((song) => (
                <div key={song.id}>
                  <div>
                    <div className=" group gap-10">
                      <div className="group-hover:brightness-30 ">
                        <img
                          src={song.image[2].url || "/placeholder.png"}
                          className="h-25 rounded-2xl"
                        />
                      </div>
                      <div className="absolute text-[11px] opacity-0"></div>
                      <div className="absolute">
                        <CiPlay1
                          size={40}
                          className="ml-8 -mt-16 cursor-pointer opacity-0 group-hover:opacity-100"
                          onClick={() => {
                            handleOnClickToPlaySong(song.id);
                          }}
                        />
                      </div>
                      <div>
                        {ShowAudioTag && song.id === SongIdMatch && (
                          <div className="border border-gray-800 absolute bottom-5 right-5 h-80 w-80 backdrop-blur-3xl rounded-2xl">
                            <div>
                              <img src={song.image[2].url || "/placeholder.png"} className="h-45 ml-15 mt-3 rounded-full"/>
                              <div>
                                <p className="text-center font-bold mt-5">{song.album.name.split('(')[0].trim()}</p>
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
                                onClick={()=>{handleClick()}}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistPage;
