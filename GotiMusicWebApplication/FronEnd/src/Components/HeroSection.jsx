import React from 'react'
import { SiPolestar } from "react-icons/si";
import { GoArrowRight } from "react-icons/go";
import { GiPapers } from "react-icons/gi";
import { BsParagraph } from "react-icons/bs";
import { CgShapeSquare } from "react-icons/cg";
import { HiMiniSquare3Stack3D } from "react-icons/hi2";
import { Link } from 'react-router-dom';
function HeroSection() {
    const RandomNumber = Math.floor(Math.random()*(1000 - 100 + 1)) + 100;
    const RandomNumber2 = Math.floor(Math.random()*(50 - 10 + 1)) + 10;
  return (
    <div className='bg-linear-270 from-black to-slate-900 h-[90vh] text-white overflow-hidden'>
      <div>
        <div className='px-[4%] pt-[3%]'>
            <p className='text-gray-200 text-[4.8rem] leading-24 font-sans font-semibold'>Music Is The Shorthand <br/><span className='text-gray-500'> Of Emotion</span></p>
            <p className='pt-8 leading-8 text-[1.2rem] text-gray-500'>Its our mission at Musikalis to give you the oppertunities <br/>to take your music as far as you want to go</p>
        </div>
        <div className='flex'>
            <div className='flex items-center gap-5 bg-violet-500 text-black rounded-2xl border w-fit px-7 py-3 mt-10 ml-15'>
                <Link to={`/mainpage`}><button className='cursor-pointer font-bold'>Get Started</button></Link> <GoArrowRight/>
            </div>
            <div className='flex items-center gap-5 text-gray-300 rounded-2xl w-fit px-7 py-3 mt-10 ml-15'>
                <button className='cursor-pointer'>See More</button> <GoArrowRight/>
            </div>
        </div>
        <div className='flex gap-10 px-[4%] py-13'>
            <div className='h-[15vh] w-[13%] rounded-2xl bg-linear-200 from-blue-950 to-slate-900'> <p className='text-center text-3xl text-gray-400 mt-5 '>{RandomNumber}K <br/>Customer</p> </div>
            <div className='h-[15vh] w-[13%] rounded-2xl bg-linear-200 from-blue-950 to-slate-900'> <p className='text-center text-3xl text-gray-400 mt-5 '>{RandomNumber2}+<br/>Tracks</p> </div>
        </div>
      </div>
      <div className='-mt-120 ml-200 -rotate-2  rounded-full w-72 h-106 overflow-hidden'>
        <img src='./beautiful-woman-with-long-hair-braids-listening-music-with-headphones_93675-140333-removebg-preview.png' alt='Photo of the girl' className='object-cover w-full h-full -ml-5 relative'/>
      </div>
      <div>
        <p className='border rounded-full w-fit p-6 bg-violet-500 text-black ml-260 font-bold -mt-40 absolute'>Special<br/> Edition</p>
        <SiPolestar className='ml-189 -rotate-15 -mt-90 z-10 absolute text-violet-500' size={80}/>
      </div>
      <div className='h-70 w-60 rounded-full overflow-hidden -mt-130 ml-280 bg-linear-90 from-blue-300 to-blue-600'>
        <img src='/OIP-removebg-preview (1).png' alt='Photo of the Headphone' className='mt-7 -rotate-15'/>
      </div>
      <div className='h-40 w-40 pt-7 text-white ml-300 mt-15 text-center rounded-full overflow-hidden bg-linear-270 from-gray-500 to-gray-700'>
        <p><span className='text-2xl font-bold text-green-500'>97%</span> <br/>People in the World <br/>love to listen to <br/>Music</p>
      </div>
      <div className='flex justify-between items-center font-bold'>
        <div className='flex items-center text-2xl text-gray-600 mt-20 m-20'><p>Dorfus</p></div>
        <div className='flex items-center text-2xl text-gray-600 mt-20 m-20'><GiPapers/><p>PAPERZ</p></div>
        <div className='flex items-center text-2xl text-gray-600 mt-20 m-20'><BsParagraph/><p>Partino</p></div>
        <div className='flex items-center text-2xl text-gray-600 mt-20 m-20'><CgShapeSquare/><p>square</p></div>
        <div className='flex items-center text-2xl text-gray-600 mt-20 m-20'><HiMiniSquare3Stack3D/><p>Gobona</p></div>
      </div>
    </div>
  )
}
export default HeroSection
