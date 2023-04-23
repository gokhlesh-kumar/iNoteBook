import React, {useContext} from 'react'
import noteContext from '../context/noteContext';


const NotesItem = (props) => {
    const context = useContext(noteContext);
    // Use of context API... Fetching the values from parent classes to children class
    // Like we are accesing notes, getNotes, and editNotes which we have passed in NoteState
    const {deleteNote} = context;

    // props passed in Notes.js
    const {note, updateNote} = props;
  return (
    <>
    <div className="col-md-3">
        <div className="card my-3">
            <div className="card-body">
                <div className="d-flex align-items-center">
                    <h5 className="card-title flex-grow-1">{note.title}</h5>
                    <i className="fa-solid fa-trash-can mx-2" onClick={() => {deleteNote(note._id);
                         props.alert("Notes Deleted Succesfully", "success");}}></i>
                    <i className="fa-regular fa-pen-to-square mx-2" onClick={updateNote}></i>
                </div>
                <p className="card-text">{note.description}</p>
                <p className="card-text">{note.tag}</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default NotesItem
