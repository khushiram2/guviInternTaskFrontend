import { useEffect, useState } from "react"
import { FormModal } from "../Components/Modal"
import { NoteContainer } from "../Components/NoteContainer"
import { Sidebar } from "../Components/Sidebar"
import "../Styles/home.css"
import axiosInstance from "../AxiosInstance/axiosinstance"
import { API } from "../GlopbalApi/GlobalApi"
import { useNoteContext } from "../Context/CustomuseContexthook"
import { toast } from "react-toastify"


export const Home = () => {
const [show, setshow] = useState(false)
const {setallNotes,noteschanged}=useNoteContext()
const handleClose = () => {
    setshow(false)
}
const handleShow = () => {
    setshow(true)
}


useEffect(()=>{
    const getAllNotes=async ()=>{
        const {data}= await axiosInstance.get(`${API}/note/allnotes`)
        if(data.successStatus===true){
            setallNotes(data.notes)
        }else{
            toast.error("couldn't get all notes")
        }
    
    }
    getAllNotes()
    },[setallNotes,noteschanged])
    
    

  return (
    <div className="home" >
        <FormModal show={show} handleClose={handleClose}  />
        <Sidebar handleShow={handleShow}  />
        <NoteContainer/>
    </div>
  )
}
