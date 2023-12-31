import React from 'react'
import SideBar from '../components/SideBar' // this is child2
import Window from '../components/Window'   // this is child1 
import Editor from '../components/Editor'
import '../css/note.css'
import { useState, useEffect } from 'react'



export default function Note() {
    const [editor, setEditor] = useState([])

    const [tabs, setTabs] = useState([])

    const [content , setContent] = useState('');
    const handleChange = (value) => {
        setContent(value);  
      };
    
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

    const saveContent = async() => {
        try{
            // first find the note_id of the current tab
            const currentTab = tabs.filter((tab) => tab.currentTab === 1)
            const noteIdOfCurrentTab = currentTab[0].note_id;


            const response = await fetch('http://localhost:8000/saveContent', {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    noteContent: content,
                    noteId: noteIdOfCurrentTab
                })
            })
        }
        catch(error){
            console.log(error)
        }
    }


    
  const getContent = async() => {
    try {
      const response = await fetch('http://localhost:8000/getContent', {
        method: "GET"
      })
      if (response.status === 200){
        const contentData = await response.json();
        const noteContent = contentData.note_content;
        setContent(noteContent);
      }
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    getContent();
  }, [])



  

    return (
        <main>
            <SideBar getAllOpenTab = {getAllOpenTab} openNewNoteEditor = {openEditor} />
            <div className='rigth-section'>
                <div className='tabs-and-save-btn'>
                    <div className='window-container'>
                        {tabs.map((tab, index) => {
                            return <Window key={index} noteId = {tab.note_id} title={tab.note_title} currentTab = {tab.currentTab} getAllOpenTab = {getAllOpenTab} getContent = {getContent} />
                        })}
                    </div>
                    <div className='save-content-btn-div'><button onClick = {saveContent}className='save-content-btn'>Save</button></div>
                </div>
                <div className='Writes-and-edit-notes-contianer'>
                    {/* {isTabOpen ? <Editor /> : <EditorBackground />} */}
                    <Editor content = {content} handleChange = {handleChange}/>

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


