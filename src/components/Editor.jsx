import "../css/editor.css";

import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Editor() {
  const [comment, setComment] = useState('');
  console.log(comment)

  const handleChange = (value) => {
    setComment(value);
  };



  return (
    <>
      <div className="editor-container">
        <ReactQuill
          contentEditable = "false"
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
