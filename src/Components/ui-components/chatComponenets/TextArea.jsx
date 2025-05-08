import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";

const TextArea = ({
  handleEdit,
  isEditing,
  handleDelete,
  textareas,
  handleChange,
}) => {
  return (
    <div className="input-container">
      <textarea
        className="message-div-ar"
        placeholder="Type your answer"
        value={textareas}
        onChange={handleChange}
        style={{
          width: "100%",
          height: "auto",
          maxHeight: "700px",
          resize: "none",
        }}
      />
      <div className="textarea-actions">
        <button onClick={handleEdit} className="icon-button">
          <BiEdit size={20} color={isEditing ? "#4CAF50" : "#888"} />
        </button>
        <button onClick={handleDelete} className="icon-button">
          <BiTrash size={20} color="#FF5252" />
        </button>
      </div>
    </div>
  );
};

export default TextArea;
