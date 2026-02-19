import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, NavLink } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
function NavBar() {
  const [isOpen,setIsOpen] = useState(false);
  const [isToken,setisToken] = useState();
  useEffect(()=>{
    const Token = localStorage.getItem('token');
    if(Token){
      try{
        const DecodedToken = jwtDecode(Token);
        setisToken(DecodedToken);
      }catch(err){
        console.log("Error while decoding the Token",err)
      }
    }
  },[])
  async function handleLogout(){
    try{
      const result = await fetch('http://localhost:8001/logout',{
      method:"GET",
      credentials:'include',
    })
    if(result.ok){
      const DeletionConformation = await result.json();
      const DeletionCompleted = localStorage.removeItem('token');
      setisToken(null);
      console.log("Deletion of the token completed")
    }else{
      console.log("Error while deleting the cookie")
    }}catch(err){
      console.log("Error in fetching the data");
    }}
  return (
    <div className='h-[10vh] bg-linear-270 from-black to-slate-900 text-white'>
      <div className='flex justify-between px-15 py-5'>
        <div className='flex items-center gap-2'>
          <img src='/image.png' alt='Logo of the web application'className='h-10 bg-yellow-300 rounded-full'/>
          <p className='md:text-2xl md:font-bold text-2xl'>Resonify</p>
        </div>
        <div className='md:flex md:justify-center  md:gap-10 hidden'>
          <div className='flex items-center gap-2 justify-center cursor-pointer'>
            <p>Home</p>
          </div>
          <div className='flex items-center gap-2 justify-center cursor-pointer'>
            <p>About</p>
          </div>
          <div className='relative flex items-center gap-2 justify-center'>
            <button onClick={()=>setIsOpen(!isOpen)} className='cursor-pointer'>Service</button><MdKeyboardArrowDown/>
            {isOpen &&
            <div className={`absolute top-full left-0 transition-opacity duration-300  ${isOpen ? 'opacity-100' : 'opacity-0'}`}> 
              <div className='border mt-3 ml-10 w-[20vw] cursor-pointer bg-linear-270 from-black to-slate-900 text-white px-5 rounded-2xl py-2'>
                <li>Upload Your Own Music</li>
                <li>Listen with your frinds</li>
                <li>Export Your Songs from different platfoms</li>
              </div>
            </div>}
          </div>
          <div className='flex items-center gap-2 justify-center cursor-pointer'>
            <p>Advisor</p>
          </div>
        </div>
        {isToken ? <div className='flex items-center'> <p className='text-[18px] mt-2 text-violet-500'>Welcome {isToken.Name}</p>
          <button className='border px-3 py-1 mt-3 ml-4 bg-red-600 rounded-2xl font-bold cursor-pointer' onClick={handleLogout}>Log Out</button>
        </div> : <div className='flex justify-center items-center gap-8'>
          <Link to='/signin'><button className='cursor-pointer'>Sign In</button></Link>
          <Link to='/login'><button className='border px-5 py-2 rounded-2xl cursor-pointer bg-green-500 text-black border-white'>Sign Up</button></Link>
        </div>}
      </div>
    </div>
  )
}
export default NavBar