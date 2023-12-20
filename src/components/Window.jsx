import '../css/window.css'
import { RxCross2 } from "react-icons/rx";
import { useState, useEffect } from 'react';

export default function Window(props){
    const [currentTab, setCurrentTab] = useState({})
    // for every open tab there will be a current tab property and all of them only one will be currentTab(means value is true or 1) and rest of open tab will be nonCurrentTab(means vlaue will be false or 0)

    
    const closeOpenTab = async (noteId) => {
        try {
            const response = await fetch('http://localhost:8000/closeOpenTab', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    note_id: noteId
                })
            })
            if (response.status === 200){ 
                window.location.href = '/notes'
            }
        }
        catch (error){
            console.log(error);
        }
    }

    const setAsCurrentTab = async(noteId) => {
        try{
            const response = await fetch('http://localhost:8000/setCurrentTab', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    note_id: noteId
                })
            })
            if (response.status === 200){ 
                window.location.href = '/notes'
                // getCurrentTab();// call this function to get the new currentTab
            }
        }
        catch(error){
            console.log(error);
        }
    }


    const getCurrentTab = async() => {
        try{
            const response = await fetch('http://localhost:8000/getCurrentTab', {
                method: "GET",
            })
            const data = await response.json();
            setCurrentTab(data)
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        getCurrentTab();
    }, [])


    return (
        // if props.noteId = currentTab.note_id then give a class name current-tab
        <div className={ currentTab.note_id === props.noteId ? "current-tab" : "window"} onClick={() => setAsCurrentTab(props.noteId)}>
            <span className="title">{props.title}</span>
            <div  className={ currentTab.note_id === props.noteId ? "current-tab-close-btn" : "close-btn"} ><RxCross2 onClick={() => closeOpenTab(props.noteId)}/></div>
        </div>
    )
    // close-btn
}