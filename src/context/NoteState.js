import noteContext from "./noteContext";

const NoteState = (props) =>{
    const s1 = {
        "name" : "Guru",
        "class" : "10A"
    }
    
    return(
        <noteContext.Provider value = {{}}>
            {props.children}
        </noteContext.Provider>
    )
} 

export default NoteState