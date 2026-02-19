import React from 'react'
import {Link, useNavigate } from 'react-router-dom'
function Login() {
  const navigate = useNavigate ()
  async function handlesubmit(events){
    events.preventDefault();
    const formData = { // note that the value of the form data , like Name and Email should be same as that for the database name and the name in the form otherise there will be error
      Email : events.target.Email.value,
      Password : events.target.Password.value
    }
      try { // this is send to the backend 
        const response = await fetch('http://localhost:8001/user/login',{
        method:"POST", // this is the how we want to send the data to the backend 
        credentials:'include',
        headers:{"Content-type":"application/json"}, // what is the type of the data 
        body:JSON.stringify(formData)// we use stringify when we have to add/send the data and we use praser when we want to read the data
      })
      if(response.ok){ // this is the response
        const ReturnResponse = await response.json();
        localStorage.setItem('token',ReturnResponse.token); // note the localstorage.setitem while not work on the backend 
        navigate('/mainpage');
      }else{
        console.log('Error while login ',response.status)
      }
    }catch(err){
      console.log("Something went worng",err);
    }
  }
  return (
    <div className='h-screen bg-linear-130 from-slate-900 to-black text-white flex justify-center items-center'>
      <div className='relative h-screen w-[50vw]'>
        <img src='/download (1).jpg' alt='AD' className='h-full w-[90%] ml-[5%] py-5 drop-shadow-2xl drop-shadow-violet-400 rounded-full'/>
        <div className='absolute top-30.75 left-87.5 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-5'>
          <img src='/image.png' alt='Logo of the Website' className='h-[8vh] bg-yellow-400 rounded-full'/>
          <p className='text-3xl font-bold text-white'>Resonify </p>
        </div>
        <div className='absolute bottom-40 left-35 transform -translate-x-1 -translate-y-1'>
          <p className='text-5xl text-white font-bold'>Your Music Journey <br/>Continues</p>
          <p className='absolute top-28'>Ready to feel the rhythm again ?</p>
        </div>
      </div>
      <div className='h-screen w-[50vw]'>
        {/* Note that the onSubmit function works on the forms */}
        <form className='ml-[20%] mt-[30%]' method='post' onSubmit={handlesubmit} action={`http://localhost:8001/user/create`}>
          <p className='font-extrabold text-4xl'>Continue Your Journey</p>
          <input placeholder='Enter Your Email here : ' type='email' name='Email' className='border w-[70%] rounded-2xl mt-8 p-3'/>
          <input placeholder='Enter Your Password here : ' type='password' name='Password' className='border w-[70%] rounded-2xl mt-8 p-3'/><br/>
          <div className='flex gap-20'>
            <Link to={`/signin`}><p className='ml-3 mt-5 text-blue-400'>Don't have an account ? </p></Link>
            <Link to={`/forgetpassword`}><p className='ml-2 mt-5 text-blue-400'>Forget Password ? </p></Link>
          </div>
          <button type='submit' className='border mt-5 text-center px-10 ml-35 cursor-pointer py-2 bg-green-400 text-black font-bold rounded-2xl'>Submit</button>
        </form>
      </div>
    </div>
  )
}
export default Login
