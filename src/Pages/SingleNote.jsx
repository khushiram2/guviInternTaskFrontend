import PropTypes from "prop-types"
import "../Styles/singlenote.css"
import { FaPen } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineDone } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../AxiosInstance/axiosinstance";
import { API } from "../GlopbalApi/GlobalApi";
import { toast } from "react-toastify";
import { useNoteContext } from "../Context/CustomuseContexthook";




export const SingleNote = ({data}) => {
    const navigate=useNavigate()
    const {setnoteschanged,noteschanged}=useNoteContext()
    const {userId}=useParams()


    const date=new Date(data.updatedAt)

    const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      });
      const endTime= new Date(data.endTime)
      const formatedendTime= endTime.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })

    const handleEdit=()=>{
        console.log("ahahhaaa")
        navigate(`/${userId}/${data._id}`)
    }

    const handleDelete = async() => {
        const res=await axiosInstance.delete(`${API}/note/delete/${data._id}`)
        if(res.data.successStatus===true){
            toast.success("deleted sucessfully",{autoClose:5000,closeOnClick:true})
            setnoteschanged(!noteschanged)
        }else{
            toast.error("couldn't delete try again",{autoClose:5000,closeOnClick:true})
        }
    }

    const handleDone=async()=>{
try {
    const res= await axiosInstance.put(`${API}/note/completed/${data._id}`)
    if(res.data.successStatus){
        toast.success("task marked as complete")
        setnoteschanged(!noteschanged)

    }else{
        toast.error("couldn't mark completed, try again",{autoClose:5000,closeOnClick:true})

    }
} catch (error) {
    
}
    }

  return (
    <div className="note">
        <header>

        <h3>{data.title}</h3>
       <div className="actions">
        <FaPen onClick={handleEdit} />
        <MdOutlineDone onClick={handleDone} />
        </div> 
        </header>
        <div className="note-content">
        <p>{data.content}</p>

        </div>
        <footer>
            <div className="dateContainer">

            <p>
       updated : {formattedDate}
            </p>
            <p>
            end time: {formatedendTime}
            </p>
            </div>
        <FaRegTrashCan onClick={handleDelete} />
        </footer>
        
        
        </div>
  )
}


SingleNote.propTypes={
    data:PropTypes.object
}
