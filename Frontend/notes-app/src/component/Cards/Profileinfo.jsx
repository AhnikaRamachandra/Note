import React from 'react'
import { getIntials } from '../../utils/helper'
const Profileinfo = ({onLogout,userInfo}) => {
  if (!userInfo) {
    return null; // Return nothing if userInfo is null
  }   
  return (
   <>
   <div className='flex items-center gap-3'>
    <div className='w-12 h-12 flex items-center justify-center rounded-full text-white font-medium bg-slate-500'>
       {getIntials(userInfo.fullName)}
    </div>
    <div>
        <p className='text-sm font-medium'>{userInfo.fullName}</p>
        <button className='text-sm hover:underline ' onClick={onLogout}>Logout</button>
   
    </div>
   </div>
   </>
  )
}

export default Profileinfo