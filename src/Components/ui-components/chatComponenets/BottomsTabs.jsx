import React from "react";
import { FaImage, FaMicrophone, FaSpellCheck, FaSave, FaComment } from "react-icons/fa";

const BottomsTabs = ({ handleImageUpload, addTextArea,hendelSaveData }) => {
  return (
    <div className="Qustionchat-btn-box">
      {/* Image Upload */}
      <button onClick={() => document.getElementById("image-upload").click()}>
        <span>
          <FaImage />
          Add Image
        </span>
      </button>
      <input
        type="file"
        id="image-upload"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleImageUpload}
      />

      {/* Add Text */}
      <button onClick={addTextArea}>
        <span>
          <FaComment />
          Add Text
        </span>
      </button>

      {/* Voice Input */}
      <button>
        <span>
          <FaMicrophone />
          Add by Voice
        </span>
      </button>

      {/* Spell Checker */}
      <button>
        <span>
          <FaSpellCheck />
          Spell Check
        </span>
      </button>

      {/* Save Stories */}
      <button onClick={hendelSaveData}>
        <span>
          <FaSave />
          Save Stories
        </span>
      </button>
    </div>
  );
};

export default BottomsTabs;
