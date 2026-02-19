import React from 'react'
import { useNavigate } from 'react-router-dom'
function VerifiyTheCodeAndChangePassword() {
  const navigate = useNavigate();
    async function handlesubmit(e){
        e.preventDefault();
        const formData = {
          VerificationCode : e.target.VerificationCode.value,
          NewPassword : e.target.NewPassword.value
        }
        try{
          const VerificationData = await fetch('http://localhost:8001/user/verifiy',{
          method:"POST",
          credentials:'include',
          headers:{"Content-type":"application/json"},
          body:JSON.stringify(formData)
        })
        if(VerificationData.ok){
          const ResponseData = await VerificationData.json();
          console.log("Verification Successfully Completed",ResponseData.status)
          navigate('/login')
        }else{
          console.log("Unseccussful attempt for the verification, please try again")
        }
      }catch(err){
        console.log("Error in Verification : ",err)
      }
    }
  return (
    <div>
      <div className='h-screen bg-linear-130 from-slate-900 to-black text-white flex justify-center items-center'>
      <div className='relative h-screen w-[50vw]'>
        <img src='/download (1).jpg' alt='AD' className='h-full w-[90%] ml-[5%] py-5 drop-shadow-2xl drop-shadow-violet-400 rounded-full'/>
        <div className='absolute top-30.75 left-87.5 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-5'>
          <img src='/image.png' alt='Logo of the Website' className='h-[8vh] bg-yellow-400 rounded-full'/>
          <p className='text-3xl font-bold text-white'>Resonify</p>
        </div>
        <div className='absolute bottom-40 left-35 transform -translate-x-1 -translate-y-1'>
          <p className='text-5xl text-white font-bold'>Your Music Journey <br/>Continues</p>
          <p className='absolute top-28'>Ready to feel the rhythm again ?</p>
        </div>
      </div>
      <div className='h-screen w-[50vw]'>
        <form className='ml-[20%] mt-[30%]' onSubmit={handlesubmit} action={`http://localhost:8001/user/create`} method='POST'>
          <p className='font-extrabold text-4xl'>Continue Your Journey <br/></p>
          <p className='ml-7 font-semibold mt-2'>Forget Password Don't Worry we have your back</p>
          <input placeholder='Enter the verification code here : ' type='text' name='VerificationCode' className='border w-[70%] rounded-2xl mt-8 p-3'/>
          <input placeholder='Enter Your New password here : ' type='text' name='NewPassword' className='border w-[70%] rounded-2xl mt-8 p-3'/>
          <button type='submit' className='border mt-5 text-center px-10 ml-35 cursor-pointer py-2 bg-green-400 text-black font-bold rounded-2xl'>Submit</button>
        </form>
      </div>
    </div>
    </div>
  )
}
export default VerifiyTheCodeAndChangePassword
