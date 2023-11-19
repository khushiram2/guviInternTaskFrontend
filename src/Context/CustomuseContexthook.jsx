import { useContext } from "react"
import { NoteContext } from "./context"





export const useNoteContext=()=>{
    return useContext(NoteContext)
}