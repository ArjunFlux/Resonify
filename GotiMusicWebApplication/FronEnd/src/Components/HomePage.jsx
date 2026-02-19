import React, { useEffect, useState } from "react";
import { RiHomeLine } from "react-icons/ri";
import { TbCategory2 } from "react-icons/tb";
import { BsPerson } from "react-icons/bs";
import { RiPlayListLine } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { PiMusicNotesPlusLight } from "react-icons/pi";
import { IoSearchOutline } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";
import { CiHeart } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FaCirclePlay } from "react-icons/fa6";
import { RiPlayListAddLine } from "react-icons/ri";
import { MdOutlineExplore } from "react-icons/md";
import { TbMusicDollar } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { MdCloseFullscreen } from "react-icons/md";
// This is the import for the swiper effect
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import {
  EffectCube,
  EffectCoverflow,
  EffectFlip,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// data being imported from the json file
function HomePage() {
  const navigate = useNavigate();
  const [isToken, setisToken] = useState();
  const [SongForDisplay, setSongsForDisplay] = useState([]);
  const [SongForPlaylist, setSongForPlaylist] = useState([]); // this is to add songs in the playlist
  const [SongToBePlayed, setSongToBePlayed] = useState(""); // this is the react variable for the song to be played
  const [ShowAudioTag, setShowAudioTag] = useState(false); // This is the react variable for the display of the audio tag
  const [SongIdMatch, setSongIdMatch] = useState(null);
  useEffect(() => {
    const Token = localStorage.getItem("token");
    if (Token) {
      try {
        const DecodedToken = jwtDecode(Token);
        setisToken(DecodedToken);
      } catch (err) {
        console.log("Error while decoding the Token", err);
      }
    }
  }, []);
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
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch("/api/showMore?q=Bollywood");
        const songs = await res.json();
        console.log("Songs from backend:", songs);
        setSongForPlaylist(songs.data.results);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    fetchSongs();
  }, []);
  async function handleLogout() {
    try {
      const result = await fetch("http://localhost:8001/logout", {
        method: "GET",
        credentials: "include", // if there is any invole of the tokens or anyother things thing use this
      });
      if (result.ok) {
        const DeletionConformation = await result.json();
        const DeletionCompleted = localStorage.removeItem("token");
        setisToken(null);
        console.log("Deletion of the token completed");
      } else {
        console.log("Error while deleting the cookie");
      }
    } catch (err) {
      console.log("Error in fetching the data");
    }
  }
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
  function handleClick() {
    setShowAudioTag((prev) => !prev);
  }
  return (
    <>
      <div className="bg-linear-110 from-black flex to-slate-900 h-screen text-white overflow-hidden">
        {/* This  is the sidebar of the Website  */}
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
                <p>Home</p>
              </div>
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
              {isToken ? (
                <Link to={`/login`}>
                  <div
                    onClick={handleLogout}
                    className="flex items-center bottom-5 absolute mb-20 cursor-pointer hover:text-red-500"
                  >
                    <CiLogout className="mr-3" size={32} />
                    <p>Logout</p>
                  </div>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
        {/*This is the navbar && the scoll bar*/}
        <div className="mt-7">
          <Link to={`/artist`}>
            <div className="flex items-center">
              <input
                placeholder="Enter the Song Name here : "
                className="w-[40vw] px-5 py-3 rounded-2xl bg-gray-900"
              />
              <IoSearchOutline size={25} className="-ml-10" />
            </div>
          </Link>
          <div className="ml-200 -mt-12 relative">
            {isToken ? (
              <div className="flex  items-center gap-8">
                <div className="flex items-center">
                  <img
                    src="download.jpg"
                    alt="Image of user"
                    className="h-13 w-13 rounded-[100%]"
                  />
                  <p className="text-[15px] ml-2 ">
                    Welcome {isToken.Name}
                    <br />
                    <span className="border px-3 py-1 text-white rounded-full text-[10px]">
                      {isToken.Role}
                    </span>
                  </p>
                </div>
                <CiHeart
                  size={35}
                  className="px-1 rounded-full bg-gray-600 cursor-pointer"
                />
                <IoSettingsOutline
                  size={35}
                  className="px-1 rounded-full bg-gray-600 cursor-pointer"
                />
              </div>
            ) : (
              <div className="flex justify-center items-center gap-8">
                <Link to="/signin">
                  <button className="cursor-pointer">Sign In</button>
                </Link>
                <Link to="/login">
                  <button className="px-5 py-2 rounded-2xl cursor-pointer bg-green-500 text-black border-white">
                    Sign Up
                  </button>
                </Link>
                <CiHeart
                  size={35}
                  className="px-1 rounded-full bg-gray-600 cursor-pointer"
                />
                <IoSettingsOutline
                  size={35}
                  className="px-1 rounded-full bg-gray-600 cursor-pointer"
                />
              </div>
            )}
            {/* This is slider part  */}
            <div className="flex justify-center items-center px-10 w-[70vw] h-[45vh] -ml-190">
              <Swiper
                modules={[
                  Navigation,
                  Pagination,
                  EffectCube,
                  EffectFlip,
                  Autoplay,
                ]}
                spaceBetween
                slidesPerView={4}
                centeredSlides={true}
                loop={true}
                effect="EffectFlip"
                grabCursor={true}
                autoplay={{
                  delay: 4500,
                }}
                // pagination={{ clickable: true }}
                className="w-900 h-screen"
              >
                {SongForDisplay.slice(1, 20).map((song, index) => (
                  <SwiperSlide key={index}>
                    <div className="h-35 mt-20 w-[90%] group flex flex-col items-center justify-center">
                      <img
                        src={song.image[2].url}
                        // alt={song.artists.all[1]}
                        className="relative group-hover:blur-xs group-hover:brightness-40 duration-300 rounded-2xl h-45 object-contain hover:scale-125 transition-transform"
                      />
                      <div className="absolute opacity-0 group-hover:opacity-100 transition-transform duration-300">
                        <FaCirclePlay
                          size={75}
                          className="text-white ml-5 -mt-20 cursor-pointer"
                          onClick={() => {
                            handleOnClickToPlaySong(song.id);
                          }}
                        />
                      </div>
                      <div className="flex justify-between items-center gap-10">
                        <p className="font-semibold mt-5 text-center ml-3">
                          {song.album.name.split("(")[0].trim()}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      {/* This is for the playlist  */}
      <div className="absolute -mt-100 ml-105 text-white">
        <p className="font-bold text-2xl">Popular Playlist</p>
        <div className="flex justify-between items-center gap-15">
          <Link
            to="/playlist"
            state={{
              name: "PlayList 1",
              songs: SongForPlaylist.slice(1, 10),
              // ArtistName : SongForPlaylist.results[2].artists.all[0].name,
              PlaylistType: "Favaroite",
            }}
          >
            <div className="mt-5 p-5 bg-linear-160 from-orange-600 to-red-900 rounded-2xl cursor-pointer">
              <img
                src="/61ygTdD3mDL._SL1280_.jpg"
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
              songs: SongForPlaylist.slice(10, 20),
              PlaylistType: "Favaroite",
            }}
          >
            <div className="mt-5 p-5 bg-linear-140 from-blue-500 to-violet-800 rounded-2xl cursor-pointer">
              <img
                src="/71BKjYZejTL._SL1232_.jpg"
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
              songs: SongForPlaylist.slice(20, 30),
              PlaylistType: "Favaroite",
            }}
          >
            <div className="mt-5 p-5 bg-linear-160 from-slate-700 to-blue-800 rounded-2xl cursor-pointer">
              <img
                src="/download (1).jpg"
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
              songs: SongForPlaylist.slice(30, 40),
              PlaylistType: "Favaroite",
            }}
          >
            <div className="mt-5 p-5 bg-linear-160 from-green-700 to-cyan-500 rounded-2xl cursor-pointer">
              <img
                src="/One-Direction.jpg"
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
        {SongForDisplay.map((song) => (
          <div key={song.id}>
            {ShowAudioTag && song.id === SongIdMatch && (
              <div className="border border-gray-800 absolute -mt-60 right-0 -mr-10 h-80 w-80 backdrop-blur-3xl rounded-2xl">
                <div>
                  <img
                    src={song.image[2].url || "/placeholder.png"}
                    className="h-45 ml-15 mt-3 rounded-full"
                  />
                  <div>
                    <p className="text-center font-bold mt-5">
                      {song.album.name.split("(")[0].trim()}
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
        ))}
      </div>
    </>
  );
}
export default HomePage;
