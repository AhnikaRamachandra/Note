import React, { useState } from 'react'
import Navbar from '../../component/Navbar/Navbar'
import Passwordinput from '../../component/Input/Passwordinput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance'
const Signup = () => {
  const[name,setname]=useState('');
  const[email,setemail]=useState('');
  const[password,setpassword]=useState('');
  const[error,seterror]=useState(null)
  const navigate=useNavigate()

  const handleSignup=async(e)=>{
    e.preventDefault();
    if(!name){
      seterror("enter the name")
      return;
    }
    if(!validateEmail(email)){
      seterror("enter the email");
      return;
    }
    if(!password){
      seterror("enter the password");
      return;
    }
    seterror("")

    //signup api
    try {
     
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });
  
     
      if (response.data && response.data.error) {
        seterror(response.data.message); 
        return;
      }
  
     
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate('/dashboard');
      }
    } catch (error) {
      
      if (error.response && error.response.data && error.response.data.message) {
        seterror(error.response.data.message);
      } else {
        seterror("An unexpected error occurred. Please try again.");
      }
    
    }
    
      
  }
  return (
    <>
    <Navbar/>
  <div className='flex items-center justify-center mt-28'>
    <div className='w-96 border rounded bg-white px-7 py-10'>
     
   <form onSubmit={handleSignup}>

    <h4 className='text-2xl mb-7'>Signup</h4>

    <input type="text" placeholder='Name'
    className='input-box'
    value={name} 
    onChange={(e)=>setname(e.target.value)} 
    />

   <input type="email" placeholder='Email'
    className='input-box'
    value={email} 
    onChange={(e)=>setemail(e.target.value)} 
    />

   <Passwordinput value={password} onChange={(e)=>setpassword(e.target.value)}/>

   {error && <p className='text-red-600 text-xs pb-1'>{error}</p>}
<button type='submit' className='btn-primary'>Signup</button>

<p className='text-sm text-center mt-4'>Already have account? <Link to='/login' className='font-medium text-primary underline'>Login</Link></p>
     
      </form>
    </div>
  </div>
    </>
  )
}

export default Signup