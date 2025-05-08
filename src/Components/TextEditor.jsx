import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the Quill editor styles

const RichTextEditor = ({ initialHTML, onSave }) => {
  const [editorContent, setEditorContent] = useState(initialHTML);

  const handleContentChange = (content) => {
    setEditorContent(content); // Update the state when the content changes
  };

  const handleSave = () => {
    onSave(editorContent); // Call the save function with updated content
  };

  return (
    <div>
      <ReactQuill
        value={editorContent}
        onChange={handleContentChange}
        modules={{
          toolbar: [
            ["bold", "italic", "underline", "strike"], // Basic formatting
            [{ header: [1, 2, 3, false] }], // Headers
            [{ list: "ordered" }, { list: "bullet" }], // Lists
            ["link", "image"], // Links and images
            ["clean"], // Remove formatting
          ],
        }}
        formats={[
          "header",
          "bold",
          "italic",
          "underline",
          "strike",
          "list",
          "bullet",
          "link",
          "image",
        ]}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default RichTextEditor;
