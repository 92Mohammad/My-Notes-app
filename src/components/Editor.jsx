import "../css/editor.css";

// import {
//   FaBold,
//   FaItalic,
//   FaUnderline,
//   FaListUl,
//   FaListOl,
// } from "react-icons/fa";
//  1) use readOnly property in text area
//  2) use defaultValue => which is similiar to placeholder
import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Editor() {
  const [comment, setComment] = useState('');

  const handleChange = (value) => {
    setComment(value);
  };

  console.log(comment)


  return (
    <>
      <div className="editor-container">
        <ReactQuill
          className="editor"        
          value={comment}
          onChange={handleChange}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"],
            ],
          }}
          formats={[
            "header",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "bullet",
            "link",
            "image",
          ]}
        />
      </div>
    </>
  );
}
