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
        <label>Lettertypefamilie:</label>
        <select
          onChange={(e) => updateStyle("fontFamily", e.target.value)}
        >
          <option value="Arial">Ariaal
          </option>
          <option value="Times New Roman" > Times New Roman</option>
          <option value="Courier New">
          Koerier Nieuw</option>
          <option value="Verdana">Verdana</option>
        </select>

        <label>
        Lettergrootte:</label>
        <input
          type="number"
          value={styles.fontSize}
          onChange={(e) =>
            updateStyle("fontSize", `${e.target.value}px`)
          }
        />

        <button onClick={() => toggleStyle("fontWeight")}>Vetgedrukt</button>
        <button onClick={() => toggleStyle("fontStyle")}>Cursief</button>
        <button onClick={() => toggleStyle("textDecoration")}>
        Onderstrepen
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
   
Dit is bewerkbare inhoud. Verander zijn stijl!
      </div>
    </div>
  );
};

export default FontCustomizer;
