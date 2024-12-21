import React, { useState } from 'react'
import Profileinfo from '../Cards/Profileinfo'
import {  useNavigate } from 'react-router-dom'
import Searchbar from '../Searchbar/Searchbar'

const Navbar = ({userInfo,onSearchNote,handleclearsearch}) => {
  const [search,setsearch]=useState("")
  const navigate=useNavigate()
  const onLogout=()=>{
    localStorage.clear()
    navigate("/login")
  }
 const handlesearch= ()=>{
  if(search){
    onSearchNote(search)
  }
  }
  const clearsearch=()=>{
    setsearch("");
    handleclearsearch()
  }
  return (
   <>
   <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
    <h2 className='text-xl font-bold py-2'>Note</h2>
    <Searchbar value={search} onclearsearch={clearsearch} handlesearch={handlesearch} onChange={({target})=>{setsearch(target.value)

    }}/>
    <Profileinfo userInfo={userInfo} onLogout={onLogout}/>

   </div>
   </>
  )
}

export default Navbar
