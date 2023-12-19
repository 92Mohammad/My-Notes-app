// BiSolidUserCircle
import { BiSolidUserCircle, BiChevronDown } from "react-icons/bi";
//
import { RiLogoutCircleRFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import Notes from "./Notes";
import "../css/sidebar.css";
import { React, useEffect, useState, useMemo } from "react";


export default function SideBar(props) {
  
  const [click, setClick] = useState({
    openInput: false,
    closeInput: true,
  });


  const [logout, setLogout] = useState(false);

  function openInputBox() {
    setClick((prevClick) => {
      return {
        ...prevClick,
        closeInput: !prevClick.closeInput,
        openInput: !prevClick.openInput,
      };
    });
  }

  const createNotes = async (Title) => {
    console.log("this is title from client side: ", Title);
    try {
      const response = await fetch("http://localhost:8000/postNotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("jwtToken"),
        },
        body: JSON.stringify({ title: Title }),
      });

      if (response.status === 200) {
        setClick((prevClick) => {
          return {
            ...prevClick,
            closeInput: !prevClick.closeInput,
            openInput: !prevClick.openInput,
          };
        });
        window.location.href = "/notes";
      }
    } catch (error) {
      console.log(error.message);
    }
  };

 

  function openDropdown() {
    setLogout((prevLogout) => !prevLogout);
  }

  const logOut = async () => {
    try {
      const response = await fetch("http://localhost:8000/logout", {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
      });
      if (response.status === 200) {
        //means that user successfully logout
        //  delete the token from localStorage
        localStorage.removeItem("JwtToekn");

        // navigate the user to home page
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <>
      <div className="side-bar">
        <div className="logo">
          <span className="logo-title">My Notes</span>
          <div className="user">
            <BiChevronDown className="down-arrow" onClick={openDropdown} />
            <BiSolidUserCircle className="user-icon" />
          </div>

          {logout && (
            <div className="drop-down-menu">
              <div className="my-user">
                <FaUserAlt className="current-user" />
                <span className="user-name">Emad</span>
              </div>
              <div className="logout-section">
                <RiLogoutCircleRFill className="logout-icon" />
                <span className="logout-btn" onClick={logOut}>
                  Log Out
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="create-btn-container">
          {click.openInput && <InputBox createNotes={createNotes} />}
          {click.closeInput && <CreateNoteButton openInputBox={openInputBox} />}
        </div>
        {props.notes.map((note, index) => (
          <Notes
            key={index}
            noteId={note.note_id}
            title={note.note_title}
            openNewNoteEditor = {props.openEditor}
            // define the function of opening a new editor associated with the current Note in side baar
          />
        ))}
      </div>
    </>
  );
}

function InputBox(props) {
  const [input, setInput] = useState("");
  function handleChange(event) {
    setInput(event.target.value);
  }
  return (
    <>
      <div className="input-title">
        <input placeholder="Note..." type="text" onChange={handleChange} />
        <button onClick={() => props.createNotes(input)}>+ Create</button>
      </div>
    </>
  );
}

function CreateNoteButton(props) {
  return (
    <>
      <button className="create-note-btn" onClick={props.openInputBox}>
        + Create New Note
      </button>
    </>
  );
}
