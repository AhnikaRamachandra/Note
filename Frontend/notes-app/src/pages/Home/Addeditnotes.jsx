import React, { useState } from 'react'
import Taginput from '../../component/Input/Taginput'
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosinstance';

const Addeditnotes = ({onclose,notedata,type,getAllNotes,showToastMessage}) => {
const [title,settile]=useState(notedata?.title||"")
const[content,setcontent]=useState(notedata?.content||"");
const [tags,settags]=useState(notedata?.tags||[])
const[error,seterror]=useState(null);
// addnote
const addnewnotes=async()=>{
try {
  const response=await axiosInstance.post("/add-note",{
    title,
    content,
    tags
  })
  if (response.data&&response.data.note) {
    showToastMessage("note added")
    getAllNotes()
    onclose()
  }
} catch (error) {
  if (error.response&&error.response.data&&error.response.data.message) {
    seterror(error.response.data.message)
  }
}
}
const editNote=async()=>{
  const noteID=notedata._id
  try {
    const response=await axiosInstance.put("/edit-note/"+noteID,{
      title,
      content,
      tags
    })
    if (response.data&&response.data.note) {
      showToastMessage("note updated")
      getAllNotes()
      onclose()
    }
  } catch (error) {
    if (error.response&&error.response.data&&error.response.data.message) {
      seterror(error.response.data.message)
    }
  }
  
}
const handleaddnote=()=>{
  if(!title){
    seterror("please enter the title");
    return;
  }
  if(!content){
    seterror("please enter the content")
    return;
  }
  seterror("")
  if(type==='edit'){
    editNote()
  }else{
    addnewnotes()
  }
}

  return (
    <>
    <div className='relative'>
      <button onClick={onclose} className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3'>
        <MdClose className='text-xl text-slate-400'/>
      </button>
        <div className='flex flex-col gap-2'>
            <label className='input-label'>Title :</label>
            <input type="text" className='text-2xl text-slate-950 border outline-none'
             placeholder='Excercise 30 mins'
              value={title} onChange={({target})=>settile(target.value)} />
        </div>
        <div className='flex flex-col gap-2 mt-4'>
    <label className='input-label'>Content :</label>
    <textarea type="text" className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
    placeholder='Content' rows={10}
    value={content} onChange={({target})=>setcontent(target.value)}>

    </textarea>
        </div>

        <div className='mt-3'>
    <label className='input-label ' >Tags :</label>
    <Taginput  tags={tags} settags={settags}/>
        </div>

        {error && <p className='text-xs pt-4 text-red-700'>{error}</p>}
        <button className='btn-primary font-medium mt-5 p-3'
         onClick={handleaddnote}>{type=="edit"?"UPDATE":'ADD'}</button>
    </div>
    </>
  )
}

export default Addeditnotes