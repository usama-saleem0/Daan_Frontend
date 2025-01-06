import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookContext } from "../context/BookContext";
import { CloudinaryUpload } from "../cloudinaryupload/CloudinaryUpload";
import { useDispatch } from "react-redux";
import { changeStatus } from "../Redux/Features/QuestionsSlice";

const SampleSidebar = () => {
  const navigate = useNavigate();
  const { generatepdf } = useContext(BookContext);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState(null);
  const generatepdfhandler = () => {
    if (generatepdf) {
      generatepdf();
    } else {
      console.error("generatePDF function is not available.");
    }
  };
  const handleCoverImage = async (e) => {
    e.preventDefault();
    try {
      const files = Array.from(e.target.files);

      for (const file of files) {
        const image = await CloudinaryUpload(file);
        console.log(image, "Image");
        if (image) {
          localStorage.setItem("image", image);
          dispatch(changeStatus());
        }
      }
    } catch (error) {
      console.error("Error uploading the image:", error);
    }
  };
  const handleButtonClick = (button) => {
    setActiveButton(button); // Update the active button
    if (button === "chooseCover") {
      fileInputRef.current.click(); // Trigger file input if the button is "Choose cover"
    }
  };

  return (
    <div className="sidebar-ar">
      <div className="siebar-top-div">
        <button onClick={() => navigate("/")} className="head-btn-ar">
          To Questions
        </button>
        <button className="head-btn-ar active-heading-btn">Sample book</button>
      </div>
      <div className="sidebar-bottom-chapters-div-ar">
        <h5>Select Preference</h5>

        <div className="chapters-name-div-ar">
          <div className="sample-book-sidebar-btns-ar">
            <button
              onClick={() => handleButtonClick("changeFont")}
              className={
                activeButton === "changeFont" ? "sample-book-active-ar" : ""
              }
            >
              Change font
            </button>
            <button
              onClick={() => handleButtonClick("changeStyle")}
              className={
                activeButton === "changeStyle" ? "sample-book-active-ar" : ""
              }
            >
              Change writing style
            </button>
            <button
              onClick={() => handleButtonClick("onlyQA")}
              className={
                activeButton === "onlyQA" ? "sample-book-active-ar" : ""
              }
            >
              Only Q&A
            </button>
            <button
              onClick={() => handleButtonClick("chooseCover")}
              className={
                activeButton === "chooseCover" ? "sample-book-active-ar" : ""
              }
            >
              Choose cover
            </button>
            <button
              onClick={() => {
                handleButtonClick("orderBook");
                generatepdfhandler();
              }}
              className={
                activeButton === "orderBook" ? "sample-book-active-ar" : ""
              }
            >
              Order Book
            </button>
          </div>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleCoverImage}
      />
    </div>
  );
};

export default SampleSidebar;
