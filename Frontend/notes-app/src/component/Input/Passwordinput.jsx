import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
const Passwordinput = ({value,onChange,placeholder}) => {
  const [showpassword,setshowpassword]=useState(false);
  const toggleShowpassword=()=>{
    setshowpassword(!showpassword)
  }
  return (
    <div className='flex items-center  bg-transparent border-[1.5px] px-5  rounded mb-3 outline-none'>
      <input type={showpassword?"text":"password"} value={value} onChange={onChange} placeholder={placeholder||"Password"} className='w-full text-sm bg-transparent py-3 mr-3 rounded outline-none' />
   {
    showpassword?  
    <FaRegEye size={22} className="text-primary cursor-pointer" onClick={()=>toggleShowpassword()}/>
    :<FaRegEyeSlash size={22} className="text-slate-400 cursor-pointer" onClick={()=>toggleShowpassword()}/>
   }
    </div>
  )
}

export default Passwordinput