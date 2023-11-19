import { useEffect, useState } from 'react';
import "../Styles/writenotepage.css"
import { Container, FormControl, InputGroup } from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import axiosInstance from '../AxiosInstance/axiosinstance';
import { API } from '../GlopbalApi/GlobalApi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const WriteNotePage = () => {
  const [noteData, setNoteData] = useState({
    title:"",
    content:""
  });
  const [fontColor, setFontColor] = useState('#000000'); // Default to black
  const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // Default to white
const {noteId,userId}=useParams()
const navigate=useNavigate()
  const handleNoteChange = (e) => {
    setNoteData({
        ...noteData,
[e.target.name]:e.target.value
    });
  };

  const handleFontColorChange = (e) => {
    setFontColor(e.target.value);
  };

  const handleBackgroundColorChange = (e) => {
    setBackgroundColor(e.target.value);
  };

  useEffect(()=>{
const getnotebyid=async()=>{
    const {data}= await  axiosInstance.get(`${API}/note/${noteId}`)
    if(data.successStatus===true){
        setNoteData({
            title:data.note.title,
            content:data.note.content
        })
        setBackgroundColor(data.note.styles.backgroundColor)
        setFontColor(data.note.styles.fontColor)
    }

}  
    getnotebyid()
  },[noteId])

  const handleSaveNote = async() => {
      try {
    const styles={
        fontColor:fontColor,
        backgroundColor:backgroundColor
    }
    const datatobesent={
        id:noteId,
        notedata:{
            userId:userId,
            title:noteData.title,
            content:noteData.content
        },
        styles:styles
    }
    const {data}= await axiosInstance.put(`${API}/note/edit`,datatobesent)
    if(data.successStatus===true){
        toast.success("note updated sucessfully",{autoClose:5000,closeOnClick:true})
        navigate(`/${userId}/home`)
    }else{
        toast.error("couldn't update note try again",{autoClose:5000,closeOnClick:true})
    }
} catch (error) {
    toast.error("couldn't update note try again",{autoClose:5000,closeOnClick:true})
}
  };

  return (
    <Container className='write-note-container' >
      <div className="color-selectors">
        <label>Font Color:</label>
        <input type="color" value={fontColor} onChange={handleFontColorChange} />
        <label>Background Color:</label>
        <input type="color" value={backgroundColor} onChange={handleBackgroundColorChange} />
      </div>
      <InputGroup>
      <InputGroupText>Title </InputGroupText>
      <FormControl name='title' value={noteData.title} onChange={handleNoteChange} />
      </InputGroup>
      <FormControl 
      className='textarea'
      as="textarea"
      name='content'
      value={noteData.content}
      style={{ color: fontColor, backgroundColor }}
      onChange={handleNoteChange}
        />
      <button onClick={handleSaveNote}>Save Note</button>
    </Container>
  );
};





