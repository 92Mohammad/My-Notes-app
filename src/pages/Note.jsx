import React from 'react'
import SideBar from '../components/SideBar'
import Window from '../components/Window'
import Editor from '../components/Editor'
import '../css/note.css'
import { useState, useEffect } from 'react'
import { FaJournalWhills } from 'react-icons/fa'
// 1) if tab.length == 0 then this is current tab otherwise current tab will be one that the user will click



export default function Note() {
    const [notes, setNotes] = useState([]);
    const [editor, setEditor] = useState([])
    const [isTabOpen, setIsTabOpen] = useState(false)

 
    const [tabs, setTabs] = useState([])
    
    const openEditor = (Title, Id) => {
        setEditor((prevEditor) => [...prevEditor, {}])
    }
    
    const getAllOpenTab = async() => {
        try {
            const response = await fetch('http://localhost:8000/getAllOpenTab', {
                method : 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.status === 200){
                const data = await response.json();
                setTabs(data);
            }
        }
        catch(error){
            console.log(error);
        }
    } 
    useEffect(() => {
        // calling the getAllOpenTab functio to get the open tab list
        getAllOpenTab();
    }, [])

    useEffect(() => {
        const token = localStorage.getItem("jwtToken")
        if (!token) {
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
            <SideBar notes={notes}  openNewNoteEditor = {openEditor} />
            <div className='rigth-section'>
                <div className='window-container'>
                    {tabs.map((tab, index) => {
                        return <Window key={index} noteId = {tab.note_id} title={tab.note_title} currentTab = {tab.currentTab}/>
                    })}
                </div>
                <div className='Writes-and-edit-notes-contianer'>
                    {/* {isTabOpen ? <Editor /> : <EditorBackground />} */}
                    <Editor/>

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


