import '../css/window.css'
import { RxCross2 } from "react-icons/rx";
export default function Window(props){
    // console.log('this is inside the window component: ', props)
    return (
        <div className="window">
            <span className="title">{props.title}</span>
            <div  className='close-btn'><RxCross2/></div>
        </div>
    )
}