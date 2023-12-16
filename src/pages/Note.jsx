import React from 'react'
import SideBar from '../components/SideBar'
import Window from '../components/Window'   
import Editor from '../components/Editor'
import '../css/note.css'
import { useState, useEffect } from 'react'


export default function Note() {
    const [notes, setNotes] = useState([]);
  
    const [windows, setWindows] = useState([])
    const [isTabOpen, setIsTabOpen] = useState(false)

    function openWindow(Title, Id, setIsOpen){
        setWindows(prevWindow => [...prevWindow, {title: Title, id: Id}])
        setIsOpen((prevOpen) => !prevOpen)
    }

    useEffect(() => {
      
    })

    useEffect(() => {
        const token = localStorage.getItem("jwtToken")
        if (!token){
            window.location.href = "/login"
        }
    }, [])


    const getAllNotes = async () => {
        try {
          const res = await fetch("http://localhost:8000/notes", {
            method: "GET",
            headers: {
              authorization: localStorage.getItem("jwtToken"),
            },
          });
    
          if (res.status === 200) {
            const data = await res.json();
            setNotes(data);
          }
        } catch (error) {
          console.log(error.message);
        }
      };
    
      useEffect(() => {
        getAllNotes();
      }, []);
    
    return (
      <main>
        <SideBar notes = {notes} openWindow = {openWindow}/>
        <div className='rigth-section'>
            <div className='window-container'>
                {windows.map((window, index) => {
                    return  <Window  key = {index} title = {window.title}/>
                })}
            </div>
            <div className='Writes-and-edit-notes-contianer'>
                {isTabOpen ? <Editor/> : <EditorBackground/>}
           
            </div>
        </div>
      </main>
    )
}


function EditorBackground() {
    return (
        <>
            <div className='default-page-with-no-editor'>
                <h1>Write your thoughts</h1>
            </div>
        
        
        
        </>


    )
}


