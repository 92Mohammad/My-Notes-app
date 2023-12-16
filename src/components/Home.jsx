import NavBar from "./NavBar";

import "../css/home.css";
import background from "../images/student-study-table.jpg";
import { Link } from "react-router-dom";
export default function Home() {

  return (
    <>
      <NavBar isHome = {true}/>

      <main className="home-page">
        <div className="main-content">
          <div className="left-section">
            <h1>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error sed
              perferendis reprehenderit debitis, deleniti fuga itaque esse
              voluptas eaque illo!
            </h1>
            <Link to="/login">Create Notes</Link>
          </div>
          <div className="right-section">
            <img src={background} alt="student" />
          </div>
        </div>
      </main>
    </>
  );
}
