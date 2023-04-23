import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) =>{

const host = "http://localhost:5000"
const notesInitial = []

const [notes, setNotes] = useState(notesInitial);

//Get all Note
    const getNotes = async() =>{
      //API Call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "token" : localStorage.getItem('token'),
        }
      });
      const json = await response.json();
      // console.log(json)

      setNotes(json);
    }


    //Add a Note
    const addNote = async(title, description, tag) =>{
      //API Call
      // eslint-disable-next-line
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "token" : localStorage.getItem('token'),
        },
        body: JSON.stringify({title, description, tag}),
      });

      //Logic
        const note = await response.json();
        setNotes(notes.concat(note));
    }

    //Edit Note
    const editNote = async(id, title, description, tag) =>{
      //API Call
      // eslint-disable-next-line
      const response = await fetch(`${host}/api/notes/update/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "token" : localStorage.getItem('token'),
        },
        body: JSON.stringify({title, description, tag}),
      });

      //we can't change state that's why storing the edited value to show update it in live  
      let newNotes = JSON.parse(JSON.stringify(notes))
      //Logic to edit client
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if(element._id === id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes)
    }

    // Delete note
    const deleteNote = async(id) =>{
      //API Call
      // eslint-disable-next-line
      const response = await fetch(`${host}/api/notes/delete/${id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "token" : localStorage.getItem('token'),
        },
      });

      const newNotes = notes.filter((note) =>{return note._id !== id});
      setNotes(newNotes);
    }


    return(
      // passed the value as a context API
        <noteContext.Provider value = {{notes, addNote, editNote, deleteNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
} 

export default NoteState