import React, { useState } from 'react'
import Navbar from '../../component/Navbar/Navbar'
import { Link,  useNavigate } from 'react-router-dom'
import Passwordinput from '../../component/Input/Passwordinput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosinstance'
const Login = () => {
  const[email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const[error,seterror]=useState(null)
  const navigate=useNavigate()
  const handleLogin=async(e)=>{
e.preventDefault()
if(!validateEmail(email)){
  seterror("please enter valid email");
  return;
}
if(!password){
  seterror("enter your password");
  return;
}
seterror("");
//login api call
try {
  const response=await axiosInstance.post("/login",{
    email:email,
    password:password
  })
  if(response.data&&response.data.accessToken){
    localStorage.setItem("token",response.data.accessToken);
    navigate('/dashboard')
  }
} catch (error) {
  if(error.response&&error.response.data&&error.response.data.message){
    seterror(error.response.data.message)
  }
  else{
    seterror("an unexpected error has occured")
  }
}

  }
  return (
  <>
  <Navbar/>
  <div className='flex items-center justify-center mt-28'>
    <div className='w-96 border rounded bg-white px-7 py-10'>
      <form onSubmit={handleLogin}>
    <h4 className='text-2xl mb-7'>Login</h4>
    <input type="email" placeholder='Email' className='input-box' value={email} onChange={(e)=>setemail(e.target.value)} />
    <Passwordinput value={password} onChange={(e)=>setpassword(e.target.value)}/>
      {error && <p className='text-red-600 text-xs pb-1'>{error}</p>}
    <button type='submit' className='btn-primary'>Login</button>
    <p className='text-sm text-center mt-4'>Not register yet? <Link to='/signup' className='font-medium text-primary underline'>Create an account</Link></p>
      </form>
    </div>
  </div>
  </>
  )
}

export default Login
