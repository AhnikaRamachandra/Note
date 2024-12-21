import React from 'react'
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
const Searchbar = ({value,onChange,handlesearch,onclearsearch}) => {
  return (
    <>
   <div className='w-80 flex items-center px-4 bg-slate-100 rounded-md'>
    <input type="text" placeholder='Search notes' className='w-full  text-xs bg-transparent py-[11px] outline-none'
    value={value}
    onChange={onChange}
     />
     {value&&(<IoMdClose className='text-xl cursor-pointer'onClick={onclearsearch} />) }
     <FaSearch className='text-slate-500 cursor-pointer hover:text-black' onClick={handlesearch} />
     
   </div>
    </>
  )
}

export default Searchbar