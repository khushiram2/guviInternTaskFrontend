import { Button, FormControl, Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap"
import  PropTypes  from "prop-types"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { API } from "../GlopbalApi/GlobalApi"
import { toast } from "react-toastify"
import axiosInstance from "../AxiosInstance/axiosinstance"
import { useNoteContext } from "../Context/CustomuseContexthook"

 const FormModal = ({show,handleClose}) => {
    const [title, setTitle] = useState("")
    const [timeItWillTake, setTimeItWillTake] = useState(0)
    const [endDateAndTime, setendDateAndTime] = useState("")
    const {userId}=useParams()
    const {noteschanged,setnoteschanged}=useNoteContext()
    const createNewNote = async () => {
        try {
            console.log(timeItWillTake);
            const {data}= await axiosInstance.post(`${API}/note/new`,{userId:userId,title:title,endTime:endDateAndTime,timeItWillTake:timeItWillTake})
            if(data.successStatus===true){
                toast.success("note created sucessfully",{autoClose:5000,closeOnClick:true})
                setnoteschanged(!noteschanged)
                setTitle("")
                setTimeItWillTake(0)
                setendDateAndTime("")
                handleClose()
            }else{
                toast.error("couldn't create new note please try again",{autoClose:5000,closeOnClick:true})
            }
        } catch (error) {
            console.log(error)
            toast.error("someError occured please try again",{autoClose:5000,closeOnClick:true})
        }
        
    }
  return (
    <Modal show={show} onHide={handleClose} >
        <ModalHeader>
            New Note
        </ModalHeader>
        <ModalBody>         
            <FormControl onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="please enter the title"   />
            <FormControl onChange={(e)=>setTimeItWillTake(e.target.value)} type="number" placeholder="please enter the time it will take to complete"   />
            <FormControl onChange={(e)=>setendDateAndTime(e.target.value)} type="datetime-local" />           
        </ModalBody>
        <ModalFooter>
            <Button onClick={createNewNote} >Create new note</Button>
        </ModalFooter>
    </Modal>
  )
}

FormModal.propTypes={
    show:PropTypes.bool.isRequired,
    handleClose:PropTypes.func.isRequired
}


export {FormModal}