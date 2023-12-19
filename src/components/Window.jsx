import '../css/window.css'
import { RxCross2 } from "react-icons/rx";
import { useState } from 'react';

export default function Window(props){
    const [currentTab, setCurrentTab] = useState(false)

    const style = {
        borderBottom:  "3px solid rgb(255, 255, 201)",
        borderTopRightRadius: "8px",
        borderTopLefttRadius: "8px",
        backgroundColor: "rgb(254, 254, 235)"
    }

    
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

    return (
        <div style = {style} className={currentTab ? "current-tab" : "window"} onClick={() => setCurrentTab((prevCurrentTab) => !prevCurrentTab)}>
            <span className="title">{props.title}</span>
            <div  className='close-btn'><RxCross2 onClick={() => closeOpenTab(props.noteId)}/></div>
        </div>
    )
}