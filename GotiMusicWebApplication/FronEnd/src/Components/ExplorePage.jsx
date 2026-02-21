import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiHomeLine } from "react-icons/ri";
import { BsPerson } from "react-icons/bs";
import { RiPlayListLine } from "react-icons/ri";
import { MdOutlineExplore } from "react-icons/md";
import { TbMusicDollar } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa";
import { RiPlayListAddLine } from "react-icons/ri";
function ExplorePage() {
  const [SongForDisplay, setSongsForDisplay] = useState([]);
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch("/api/showMore?q=Bollywood");
        const songs = await res.json();
        console.log("Songs for the explre sections:", songs);
        setSongsForDisplay(songs.data.results);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    fetchSongs();
  }, []);
  const [FirstSong , SecondSong , ThirdSong , ForurthSong ] = SongForDisplay;
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
        </div>
      </div>
      {/* This is the main content of this page */}
      <div>
        <div className="leading-10">
          <p className="mt-10 text-2xl font-bold">Explore Page</p>
        </div>
        <div>
          <div className="flex items-center gap-5 cursor-pointer">
            <p className="mt-5 font-bold text-3xl text-orange-500">
              Refreshing Bollywood Playlist
            </p>
            <FaArrowRight className="mt-5 text-orange-500" />
          </div>
          <div className="absolute mt-5 text-white">
            <div className="flex justify-between items-center gap-15">
              <Link
                to="/playlist"
                state={{
                  name: "PlayList 1",
                  songs: SongForDisplay.slice(1,10),
                  // ArtistName : SongForPlaylist.results[2].artists.all[0].name,
                  PlaylistType: "Favaroite",
                }}
              >
                <div className="mt-5 p-5 bg-linear-160 from-orange-600 to-red-900 rounded-2xl cursor-pointer">
                  <img
                    src="/OIP.webp"
                    alt="Playlist 1 "
                    className="h-40 w-30 rounded-[50%] hover:scale-105"
                  />
                  <p className="font-bold text-center">Golden Days</p>
                  <p className="text-center">Favaroite</p>
                </div>
              </Link>
              <Link
                to="/playlist"
                state={{
                  name: "PlayList 2",
                  songs: SongForDisplay.slice(11,22),
                  PlaylistType: "Favaroite",
                }}
              >
                <div className="mt-5 p-5 bg-linear-140 from-blue-500 to-violet-800 rounded-2xl cursor-pointer">
                  <img
                    src="/1200x1200bf-60.jpg"
                    alt="Playlist 2"
                    className="h-40 w-30 rounded-[50%] hover:scale-105"
                  />
                  <p className="font-bold text-center">Fading Horizan</p>
                  <p className="text-center">TimePass</p>
                </div>
              </Link>
              <Link
                to="/playlist"
                state={{
                  name: "PlayList 3",
                  songs: SongForDisplay.slice(22,33),
                  PlaylistType: "Favaroite",
                }}
              >
                <div className="mt-5 p-5 bg-linear-160 from-slate-700 to-blue-800 rounded-2xl cursor-pointer">
                  <img
                    src="/1200x1200bf-60 (1).jpg"
                    alt="Playlist 1 "
                    className="h-40 w-30 rounded-[50%] hover:scale-105"
                  />
                  <p className="font-bold text-center">Waves Of Time</p>
                  <p className="text-center">Favaroite</p>
                </div>
              </Link>
              <Link
                to="/playlist"
                state={{
                  name: "PlayList 4",
                  songs: SongForDisplay.slice(30,40),
                  PlaylistType: "Favaroite",
                }}
              >
                <div className="mt-5 p-5 bg-linear-160 from-green-700 to-cyan-500 rounded-2xl cursor-pointer">
                  <img
                    src="/OIP (1).webp"
                    alt="Playlist 1 "
                    className="h-40 w-30 rounded-[50%] hover:scale-105"
                  />
                  <p className="font-bold text-center">Electric Dreams</p>
                  <p className="text-center">Favaroite</p>
                </div>
              </Link>
              <div className="mt-5 p-5 hover:bg-amber-50 hover:rounded-2xl hover:text-black cursor-pointer rounded-2xl">
                <RiPlayListAddLine size={40} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ExplorePage;
