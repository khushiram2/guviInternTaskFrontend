import PropTypes from "prop-types"
import "../Styles/singlenote.css"
import { FaPen } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
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
  return (
    <div className="note">
        <FaPen onClick={handleEdit} />

        <header>

        <h3>{data.title}</h3>
        </header>
        <div className="note-content">
        <p>{data.content}</p>

        </div>
        <footer>
            <p>

        {formattedDate}
            </p>
        <FaRegTrashCan onClick={handleDelete} />
        </footer>
        
        
        </div>
  )
}


SingleNote.propTypes={
    data:PropTypes.object
}
