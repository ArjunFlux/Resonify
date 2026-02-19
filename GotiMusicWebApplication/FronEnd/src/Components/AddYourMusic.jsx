import React, { useEffect } from "react";
import { RiHomeLine } from "react-icons/ri";
import { BsPerson } from "react-icons/bs";
import { RiPlayListLine } from "react-icons/ri";
import { MdOutlineExplore } from "react-icons/md";
import { TbMusicDollar } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useState } from "react";
// Importing modules
function AddYourMusic() {
  return (
    <div>
      <div className="bg-linear-110 from-black flex to-slate-900 h-screen text-white overflow-y-hidden">
        {/* This is the sidebar  */}
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
        <div>
          <div className="leading-7">
            <p className="text-2xl font-bold mt-10 ">Add Your Music</p>
            <p className="text-gray-400 text-[12px]">
              Add your very own personal Favaroite songs on the website and
              listen them anytime your want
            </p>
          </div>
          {/* This is to show the content which has been uploaded */}
          <div>
            <form>
              <input
                type="file"
                accept="audio/*"
                className="px-5 py-2 bg-gray-900 rounded-2xl mt-5 cursor-pointer"
              />
              <button
                type="submit"
                className="ml-3 px-5 py-1 bg-green-400 text-black rounded-xl cursor-pointer"
              >
                Submit
              </button>
            </form>
          </div>
          <hr className="text-gray-600 mt-10" />
          <div></div>
        </div>
      </div>
    </div>
  );
}
export default AddYourMusic;
