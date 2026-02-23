import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiHomeLine } from "react-icons/ri";
import { BsPerson } from "react-icons/bs";
import { RiPlayListLine } from "react-icons/ri";
import { MdOutlineExplore } from "react-icons/md";
import { TbMusicDollar } from "react-icons/tb";
function PlaylistSongs() {
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
      <div>
        <input placeholder="Enter the name of your playlist :" className="border w-120 border-t-0 border-l-0 border-r-0 h-10 mt-10 px-5 border-gray-800"/>
      </div>
    </div>
  )
}

export default PlaylistSongs
