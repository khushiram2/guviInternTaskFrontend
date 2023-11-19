import { createContext,useState } from "react";
import PropTypes from "prop-types"



export const NoteContext=createContext()

export const NoteContextProvider=({children})=>{
    const [allNotes, setallNotes] = useState([])
    const[noteschanged , setnoteschanged]=useState(true)
    return(
        <NoteContext.Provider value={{allNotes,setallNotes,noteschanged,setnoteschanged}}  >
            {children}
        </NoteContext.Provider>
    )
}

NoteContextProvider.propTypes={
    children:PropTypes.any
}


