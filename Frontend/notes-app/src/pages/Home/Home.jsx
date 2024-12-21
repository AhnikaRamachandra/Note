import React, { useEffect, useState } from 'react'
import Navbar from '../../component/Navbar/Navbar'
import Notecard from '../../component/Cards/Notecard'
import { MdAdd } from 'react-icons/md'
import Addeditnotes from './Addeditnotes'
import Modal from 'react-modal';
import EmptyCard from '../../component/Emptycard/EmptyCard'
import moment from "moment"
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosinstance'
import Toast from '../../component/Toastmessage/Toast'
Modal.setAppElement('#root');
import AddNoteImg from "../../assets/images/note.jpg"
import NewNoteImg from "../../assets/images/nonote.jpg"
const Home = () => {
  const[openaddmodal,setopenaddmodal]=useState({
    isshown:false,
    type:"add",
    data:null
  })
  const[showToastMsg,setshowToastMsg]=useState({
    isshown:false,
    type:"add",
    message:""
  })
  const[issearch,setissearch]=useState(false)
  const[allNotes,setallNotes]=useState([])
const [userInfo,setuserInfo]=useState(null)
const navigate=useNavigate();

const handleEdit=(noteDetails)=>{
setopenaddmodal({
  isshown:true,
  data:noteDetails,
  type:"edit"
})
}

const showToastMessage=(message,type)=>{
  setshowToastMsg({
    isshown:true,
    message,
    type
  });
  setTimeout(()=>{
    handleCloseToast()
  },3000)
}
const handleCloseToast=()=>{
  setshowToastMsg({
    isshown:false,
    message:"",
    type:''
  })
}

//getuser
const getUserInfo=async ()=>{
  try {
    const response=await axiosInstance.get("/get-user");
    if(response.data&&response.data.user){
      setuserInfo(response.data.user)
    }
  } catch (error) {
    if (error.response.status===401) {
      localStorage.clear();
      navigate("/login")
    }
  }
}

const getAllNotes=async()=>{
  try {
    const response=await axiosInstance.get("/get-all-notes");
    if(response.data&&response.data.notes){
      setallNotes(response.data.notes)
    }
  } catch (error) {
    console.log("error");
    
  }
}

const deleteNote = async (data) => {
  const noteId = data._id; 
  try {
    const response = await axiosInstance.delete("/delete-note/" + noteId);
    if (response.data && !response.data.error) {
      showToastMessage("note deleted", "delete");
      getAllNotes();
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log("error");
    }
  }
};

const onSearchNote=async (query) => {
  try {
    const response = await axiosInstance.get("/search-notes",{
      params:{query},
    });
    if(response.data&&response.data.notes){
      setissearch(true);
      setallNotes(response.data.notes)
    }
  } catch (error) {
    console.log(error);
    
  }
}
 const handleclearsearch=()=>{
  setissearch(false)
  getAllNotes()
 }

 const updateispinned=async(notedata)=>{
  const noteID=notedata._id
  try {
    const response=await axiosInstance.put("/update-note-pinned/"+noteID,{
     ispinned :!notedata.ispinned
    })
    if (response.data&&response.data.note) {
      showToastMessage("note updated")
      getAllNotes()
      
    }
  } catch (error) {
   console.log(error);
   
  }
 }
useEffect(()=>{
  getAllNotes();
getUserInfo();
return()=>{}
},[])
//get all notes

return (
   <>
   <Navbar userInfo={userInfo} handleclearsearch={handleclearsearch} onSearchNote={onSearchNote} />
   <div className='container mx-auto'>
    {allNotes.length>0?<div className='grid grid-cols-3 gap-4 mt-8'>
{allNotes.map((item,index)=>(
  <Notecard 
  key={item._id}
  title={item.title} 
  date={item.createdOn}
  content={item.content}
  
  tags={item.tags} 
  ispinned={item.ispinned}
  onedit={()=>handleEdit(item)}
  ondelete={()=>deleteNote(item)}
  onpinnote={()=>updateispinned(item)}
  />
  
))}


</div>:<EmptyCard imgSrc={issearch?NewNoteImg:AddNoteImg} message={issearch?"oops no data":"Start creating your Notes!"}/>}

   </div>
   <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-slate-500 hover:bg-blue-600 absolute right-10 bottom-10' 
   onClick={()=>{
    setopenaddmodal({
      isshown:true,
      type:"add",
      data:null
    })
   }}>
    <MdAdd className='text-[32px] text-white'/>
   </button>
   <Modal isOpen={openaddmodal.isshown}
   onRequestClose={()=>{}}
   style={{
    overlay:{
      backgroundColor:"rgba(0,0,0,0.2)",
    },
   }}
   contentLabel=""
   className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll "
   >
   <Addeditnotes type={openaddmodal.type} notedata={openaddmodal.data} onclose={()=>{
    setopenaddmodal({
      isshown:false,
      type:"add",
      data:null
    })
   }}
   getAllNotes={getAllNotes}
   showToastMessage={showToastMessage}
   />
   </Modal>
   
   <Toast isshown={showToastMsg.isshown} message={showToastMsg.message}type={showToastMsg.type}onClose={handleCloseToast}/>
   </>
  )
}

export default Home

