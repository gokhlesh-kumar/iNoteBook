import React, {useContext, useEffect, useRef, useState} from 'react'
import noteContext from "../context/noteContext";
import NotesItem from './NotesItem';
import AddNote from './AddNote';
import { useNavigate} from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    // Use of context API... Fetching the values from parent classes to children class
    // Like we are accesing notes, getNotes, and editNotes which we have passed in NoteState
    const {notes, getNotes,editNote} = context;

    let navigate = useNavigate();

    useEffect(() => {
      if(localStorage.getItem('token')){
        console.log(localStorage.getItem('token'))
        getNotes()
      }
      else{
        console.log("falseeeee")
        navigate("/login")
      }
      // eslint-disable-next-line
    },[]);

    
    const ref = useRef(null);
    const refClose = useRef(null);
    
    const [note, setNote] = useState({id: "", etitle :"" , edescription: "", etag:""});
    
    //Upadte function to upadte the edited note
    const updateNote = (currentNote) =>{
      ref.current.click();
      setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
    }

    // Sets the value or adds the note while clicking on the add note
    const handleClick = (e) =>{
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        // console.log("upadting")
        props.alert("Notes Updated Succesfully", "success");
        refClose.current.click();
    }

    // Updates the value concurrently while typing
    const onchange = (e) =>{
        setNote({...note, [e.target.name] : e.target.value})
    }

  return (
    <>
    <AddNote alert={props.alert} />
    
    {/* Modal starts here */}
    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>

    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            
          {/* Form Sterts here modal copied from addnote */}
          <form className="mb-3">
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">
              Title
            </label>
            <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onchange}/>

          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              id="edescription"
              value={note.edescription}
              onChange={onchange} name='edescription'
            />
          </div>

          <div className="mb-3">
            <label htmlFor="etag" className="form-label">Tag</label>
            <input
              type="text"
              className="form-control"
              id="etag"
              value={note.etag}
              onChange={onchange} name='etag'
            />
          </div>
        </form>
        {/* Form Closes Here */}

          </div>
          <div className="modal-footer">
            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button disabled={note.etitle.length < 1 || note.edescription.length < 1} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
          </div>
        </div>
      </div>
    </div>



    <div className="row my-3">
        <h1>Your Note</h1>
        {notes.map((note) =>{
            return <NotesItem key={note._id} alert={props.alert} updateNote={() => {updateNote(note)}} note ={note}/>
        })}
    </div>
    </>
  )
}

export default Notes
