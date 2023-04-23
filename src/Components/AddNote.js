import React, {useContext} from 'react'
import noteContext from '../context/noteContext';
import { useState } from 'react';


const AddNote = (props) => {
    const context = useContext(noteContext);
    // Use of context API... Fetching the values from parent classes to children class
    // Like we are accesing notes, getNotes, and editNotes which we have passed in NoteState
    const {addNote} = context;

    //Initially the value of note is empty
    const [note, setNote] = useState({title : "" , description: "", tag:""});

    // Sets the value or adds the note while clicking on the add note
    const handleClick = (e) =>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        props.alert("Added Succesfully", "success");
        setNote({title : "" , description: "", tag:""});
    }

    // Shows the value while typing
    const onchange = (e) =>{
        setNote({...note, [e.target.name] : e.target.value})
    }

  return (
    <div>
      <h1>Add a Note</h1>
        <form className="mb-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input type="text" className="form-control" required id="title" name="title" aria-describedby="emailHelp" onChange={onchange} value={note.title}/>

          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input
              type="text"
              required
              className="form-control"
              id="description"
              onChange={onchange} value={note.description} name='description'
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              onChange={onchange} value={note.tag} name='tag'
            />
          </div>

          <button disabled={note.title.length < 1 || note.description.length < 1} type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
    </div>
  )
}

export default AddNote
