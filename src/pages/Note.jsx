import React from 'react'
import SideBar from '../components/SideBar' // this is child2
import Window from '../components/Window'   // this is child1 
import Editor from '../components/Editor'
import '../css/note.css'
import { useState, useEffect } from 'react'



export default function Note() {
    const [editor, setEditor] = useState([])

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


    
    return (
        <main>
            <SideBar getAllOpenTab = {getAllOpenTab} openNewNoteEditor = {openEditor} />
            <div className='rigth-section'>
                <div className='tabs-and-save-btn'>
                    <div className='window-container'>
                        {tabs.map((tab, index) => {
                            return <Window key={index} noteId = {tab.note_id} title={tab.note_title} currentTab = {tab.currentTab} getAllOpenTab = {getAllOpenTab} />
                        })}
                    </div>
                    <div className='save-content-btn-div'><button className='save-content-btn'>Save</button></div>
                </div>
                <div className='Writes-and-edit-notes-contianer'>
                    {/* {isTabOpen ? <Editor /> : <EditorBackground />} */}
                    <Editor />

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


