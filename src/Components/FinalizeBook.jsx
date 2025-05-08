import html2pdf from "html2pdf.js";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BookContext } from "../context/BookContext";
import { useDispatch } from "react-redux";
import { getFinalAnswers } from "../Redux/Features/UserSlice";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { togglemenu } from "../Redux/Features/QuestionsSlice";
import RichTextEditor from "./TextEditor";
import CustomIcon from "../svgsIcons/CustomIcon";
import MyBook from "./ExampleBook";
import { incrementstep, decrementstep } from "../Redux/Features/QuestionsSlice";
import ArrowLeftIcon from "../svgsIcons/ArrowLeftIcon";
import ArrowRightIcon from "../svgsIcons/ArrowRightIcon copy";
import ConsentForm from "./ConsentForm";
import SimpleFinalizebook from "./simpleFinalizebook";
import EnhanceBook from "../pages/EnhanceBook";
import EnhanceFinalizeBook from "../pages/EnhanceFinalizeBook";

const FinalizeBook = ({ value, valueSize }) => {
  console.log("achivee", valueSize);
  const pdfdata = useRef(null);

  const [IsConsentForm, setIsConsentForm] = useState(false);
  const [storyPreference, setstoryPreference] = useState(
    localStorage.getItem("storyPreference")
  );

  const dispatch = useDispatch();

  const activeStep = useSelector((state) => state.questionCounter.activeStep);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    dispatch(togglemenu());
  };

  const [coverimgurl, setCoverimgurl] = useState(
    "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1737048624/gvm6uaque86qkpjxkrwu.png"
  );
  const [showeditor, setShoweditor] = useState(false);
  const { loading, FinalResponse } = useSelector((state) => state.auth);

  const [gptresponse, setGPTresponse] = useState(FinalResponse?.gpt_response);
  const [fontSize, setfontSize] = useState(20);
  const [fontFamily, setfontFamily] = useState("");

  const status = useSelector((state) => state.questionCounter.uploadStatus);

  useEffect(() => {
    const imageurl = localStorage.getItem("image");
    if (imageurl) {
      setCoverimgurl(imageurl);
    }
  }, [status]);

  useEffect(() => {
    // dispatch(getFinalAnswers(user_id));

    const savedContent = localStorage.getItem("savedHTMLContent");

    const fontSize = localStorage.getItem("fontsize");
    const fontFamily = localStorage.getItem("fontfamily");

    console.log("Retrieved content:", savedContent);
    setGPTresponse(savedContent);
    setfontSize(fontSize);
    setfontFamily(fontFamily);
  }, []);

  const handleSave = (updatedHTML) => {
    console.log("Saved content:", updatedHTML);
    setGPTresponse(updatedHTML);

    setShoweditor(false);

    // Use the updated HTML as needed (e.g., send to backend, display elsewhere)
  };

  const processHTMLContent = (htmlContent, fontSize) => {
    console.log("fontSize", fontSize);
    if (!htmlContent) return "";

    // Add inline styles to <p> tags
    const styledContent = htmlContent.replace(
      /<p([^>]*)>/g,
      `<p$1 style="font-size:${fontSize}px !important;">`
    );

    // Add inline styles to <img> tags
    return styledContent.replace(
      /<img([^>]*)>/g,
      `<img$1 style="max-width:500px; min-width:500px; height:auto; padding-bottom:20px">`
    );
  };

  const modifyText = (text) => {
    // Example: Add a prefix to the text
    return `Modified: ${text}`;
  };

  const editresponse = () => {
    setShoweditor(true);
  };

  console.log(loading, FinalResponse, "FINAL");

  useEffect(() => {
    const hasConsented = localStorage.getItem("hasConsented");
    if (hasConsented) {
      setIsConsentForm(true); // If user already consented, don't show the modal
    }
  }, []);

  return (
    <div className="View-Book-sec">
      <div className="navigation--site">
        <button
          className="animated-button"
          onClick={() => dispatch(decrementstep())}
          disabled={activeStep === 0}
        >
          <svg
            viewBox="0 0 24 24"
            className="arr-2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
          <span className="text">Terug naar Omslag</span>
          <span className="circle"></span>
          <svg
            viewBox="0 0 24 24"
            className="arr-1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
        </button>
        <button
          className="animated-button"
          onClick={() => dispatch(incrementstep(4))}
          disabled={!coverimgurl || coverimgurl <= 0}
          style={{
            backgroundColor: !coverimgurl || coverimgurl <= 0 ? "#9e9e9e" : "",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className="arr-2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
          <span className="text">Ga naar Verzending</span>
          <span className="circle"></span>
          <svg
            viewBox="0 0 24 24"
            className="arr-1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
        </button>
      </div>

      {IsConsentForm ? (
        storyPreference === "ownStories" ? (
          <SimpleFinalizebook />
        ) : (
          <EnhanceFinalizeBook />
        )
      ) : (
        <ConsentForm onConsent={() => setIsConsentForm(true)} />
      )}
    </div>
  );
};

export default FinalizeBook;
