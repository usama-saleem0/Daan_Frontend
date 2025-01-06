import React, { useState } from "react";

const FontCustomizer = () => {
  const [styles, setStyles] = useState({
    fontFamily: "Arial",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "normal",
    textDecoration: "none",
  });

  const updateStyle = (key, value) => {
    setStyles((prevStyles) => ({ ...prevStyles, [key]: value }));
  };

  const toggleStyle = (key) => {
    setStyles((prevStyles) => ({
      ...prevStyles,
      [key]:
        prevStyles[key] === "normal" || prevStyles[key] === "none"
          ? key
          : "normal",
    }));
  };

  return (
    <div>
      <div>
        <label>Font Family:</label>
        <select
          onChange={(e) => updateStyle("fontFamily", e.target.value)}
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Verdana">Verdana</option>
        </select>

        <label>Font Size:</label>
        <input
          type="number"
          value={styles.fontSize}
          onChange={(e) =>
            updateStyle("fontSize", `${e.target.value}px`)
          }
        />

        <button onClick={() => toggleStyle("fontWeight")}>Bold</button>
        <button onClick={() => toggleStyle("fontStyle")}>Italic</button>
        <button onClick={() => toggleStyle("textDecoration")}>
          Underline
        </button>
      </div>

      <div
        contentEditable
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginTop: "20px",
          ...styles,
        }}
      >
        This is editable content. Change its style!
      </div>
    </div>
  );
};

export default FontCustomizer;
