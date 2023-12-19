import { MdEdit, MdDelete } from "react-icons/md";
import "../css/sidebar.css";
import { useState } from 'react'



export default function Notes(props) {
  const [isOpen , setIsOpen] = useState(true)

  const postNewOpenTab = async(noteId) => {
    console.log('inside open new tab : ', noteId)
    try {
      const response = await fetch('http://localhost:8000/postNewOpenTab' ,{
        method: "POST",
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          note_id: noteId})
      })  
      if (response.status === 200){
        window.location.href = '/notes'
      }
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <>
      <div className="note-container">
        <div
          className="left-part"
          onClick={() => isOpen && postNewOpenTab(props.noteId)}
        >
          <MdEdit />
          <p className="note-title">{props.title}</p>
        </div>
        <MdDelete
          className="delete-btn"
          onClick={async () => {
            try {
              const response = await fetch("http://localhost:8000/deleteNote", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  authorization: localStorage.getItem("jwtToken")
                },
                body: JSON.stringify({
                  noteId: props.noteId,
                  title: props.title,
                }),
              });

              // const data = await response.json();
              if (response.status === 201) {
                // means that notes deleted successfully
                //so navigate the user again on the /note page so that react re-render the side bar with upddated notes
                window.location.href = "/notes";
              }
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </div>
    </>
  );
}
