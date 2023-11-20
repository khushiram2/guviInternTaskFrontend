import { Button, FormControl, InputGroup, Modal, ModalBody, ModalHeader } from "react-bootstrap"
import { SingleNote } from "../Pages/SingleNote"
import "../Styles/noteContainer.css"
import InputGroupText from "react-bootstrap/esm/InputGroupText"
import { IoMenu, IoSearchCircle } from "react-icons/io5"
import { useNoteContext } from "../Context/CustomuseContexthook"
import { useState } from "react"
import { useNavigate } from "react-router-dom"




export const NoteContainer = () => {
const {allNotes,setallNotes}=useNoteContext()
const navigate=useNavigate()
const [show, setshow] = useState(false)

const handleSearch = (e) => {
  const filteredNotes = allNotes.filter((note) =>
    note.content.toLowerCase().includes(e.target.value.toLowerCase())
  );
    setallNotes(filteredNotes)
};
const handleLogout=()=>{
  window.localStorage.clear()
navigate("/login")
setshow(false)
}
const handleClose = () => {
  setshow(false)
}
return(
    <div className="home-main-container" >
        <div className="search-bar" >
        <InputGroup >
        <InputGroupText><IoSearchCircle /> </InputGroupText>
        <FormControl
          placeholder="Search"
          aria-label="search"
          onChange={handleSearch}
        />
           <InputGroupText><IoMenu onClick={()=>setshow(true)}/></InputGroupText>
      </InputGroup>
      <Modal show={show} onHide={handleClose}>
        <ModalHeader> you want to log out?  </ModalHeader>
        <ModalBody>

        <Button  onClick={handleLogout}>Logout</Button>
        </ModalBody>
      </Modal>
      
      <div className="App-name">
        <h2>Notes</h2>
      </div>
        </div>
    <div className="all-note-container" >
      {allNotes.map((e, i) => (
          <SingleNote key={i} data={e} />
          ))}
    </div>  
    </div>
)
}
