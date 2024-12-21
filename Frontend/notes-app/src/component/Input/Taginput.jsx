import React, { useState } from 'react'
import {MdAdd,MdClose} from 'react-icons/md'
const Taginput = ({tags,settags}) => {
  const[inputvalue,setinputvalue]=useState()
  const handleinputchange=(e)=>{
setinputvalue(e.target.value)
  }
const addnewtag=()=>{
  if(inputvalue.trim()!==""){
    settags([...tags,inputvalue.trim()]);
    setinputvalue("")
  }
}
const handlekeydown=(e)=>{
  if(e.key==="Enter"){
addnewtag()
  }
}

const handleremovetag=(tagremove)=>{
settags(tags.filter((tag)=>tag!==tagremove))
}

  return (
    <div >
{
       tags.length>0 &&( <div className='flex items-center gap-2 flex-wrap mt-2'>
        {tags.map((tag,index)=>(
          <span key={index} className='flex items-center gap-2 text-sm rounded text-slate-900 bg-slate-100  px-3 py-2'>#{tag}
           <button  onClick={()=>{handleremovetag(tag)}}><MdClose/></button>
          </span>
         
        ))}
          </div>
)}
      
      <div className='flex items-center gap-4 mt-3'>
       <input value={inputvalue}  type="text" onChange={handleinputchange}
       className='border text-sm bg-transparent py-2  rounded px-3' 
       placeholder='Add tags' onKeyDown={handlekeydown} />
       <button className='w-8 h-8 flex items-center justify-center rounded border'
       onClick={()=>{
        addnewtag();
       }}>
        <MdAdd className='text-2xl text-blue-700  hover:text-sky-950'/>
       </button>
        </div>  
    </div>
  )
}

export default Taginput