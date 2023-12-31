import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";

import Note from "./pages/Note";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

import "./index.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/notes" element={<Note />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
