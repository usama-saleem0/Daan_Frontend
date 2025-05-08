
import html2pdf from "html2pdf.js";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BookContext } from "../context/BookContext";
import { useDispatch } from "react-redux";
import {
  getFinalAnswers,
  getFinalAnswersAudio,
} from "../Redux/Features/UserSlice";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { togglemenu } from "../Redux/Features/QuestionsSlice";
import RichTextEditor from "./TextEditor";
import { useNavigate } from "react-router-dom";
import Lodersvg from "../hComponents/Lodersvg";

const PreviewBook = ({ value, valueSize }) => {
  console.log("valueSize", valueSize);
  console.log("value", value);
  const pdfdata = useRef(null);
  const { setGeneratePdfhandler } = useContext(BookContext);
  const navigate = useNavigate();
  const [user_id, setuser_id] = useState(localStorage.getItem("userId"));

  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    dispatch(togglemenu());
  };

  const [coverimgurl, setCoverimgurl] = useState(null);
  const [showeditor, setShoweditor] = useState(false);

  const status = useSelector((state) => state.questionCounter.uploadStatus);

  useEffect(() => {
    const imageurl = localStorage.getItem("image");
    if (imageurl) {
      setCoverimgurl(imageurl);
    }
    const generatepdf = () => {
      const options = {
        margin: [12, 10, 12, 10],
        filename: "CustomEBook.pdf",
        html2canvas: {
          scale: 2,
          useCORS: true,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      };

      html2pdf().set(options).from(pdfdata.current).save();
    };

    setGeneratePdfhandler(generatepdf);
  }, [status]);

  // useEffect(() => {
  //   dispatch(getFinalAnswers(user_id));

  //   localStorage.setItem("savedHTMLContent", FinalResponse?.gpt_response);
  // }, [user_id]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (!FinalResponse?.gpt_response) {
        dispatch(getFinalAnswers(user_id));
        // dispatch(getFinalAnswersAudio(user_id));
      }

      localStorage.setItem("savedHTMLContent", FinalResponse?.gpt_response);
    }, 500); // Delay API call by 500ms after the user stops interacting

    return () => clearTimeout(debounceTimer);
  }, [user_id]);

  // const processHTMLContent = (htmlContent, fontSize) => {

  //   console.log('fontSize' , fontSize)
  //   if (!htmlContent) return "";

  //   // Add inline styles to <p> tags
  //   return htmlContent.replace(
  //     /<p([^>]*)>/g,
  //     `<p$1 style="font-size:${fontSize}px !important;">`,
  //   );

  //   return styledContent.replace(
  //     /<img([^>]*)>/g,
  //     `<img$1 style="max-width:200px; min-width:200px; height:auto;">`
  //   );
  // };

  const handleSave = (updatedHTML) => {
    console.log("Saved content:", updatedHTML);
    setGPTresponse(updatedHTML);

    localStorage.setItem("savedHTMLContent", updatedHTML);

    setShoweditor(false);

    // Use the updated HTML as needed (e.g., send to backend, display elsewhere)
  };

  const processHTMLContent = (htmlContent, fontSize) => {
    localStorage.setItem("savedHTMLContent", htmlContent);
    console.log("fontSizesss", fontSize);
    if (!htmlContent) return "";

    // Add inline styles to <p> tags
    const styledContent = htmlContent.replace(
      /<p([^>]*)>/g,
      `<p$1 style="font-size:${fontSize}px !important;">`
    );

    // Add inline styles to <img> tags
    return styledContent.replace(
      /<img([^>]*)>/g,
      `<img$1 style="max-width:500px; min-width:500px; height:auto; padding-bottom:20px; display:flex">`
    );
  };

  // const processHTMLContent = (htmlContent, fontSize) => {
  //   if (!htmlContent) return "";

  //   // Parse the HTML string
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(htmlContent, "text/html");

  //   // Modify <p> tags
  //   doc.querySelectorAll("p").forEach((p) => {
  //     p.style.fontSize = `${fontSize}px`;
  //   });

  //   // Modify <img> tags
  //   doc.querySelectorAll("img").forEach((img) => {
  //     img.style.maxWidth = "400px";
  //     img.style.minWidth = "400px";
  //     img.style.height = "auto";
  //   });

  //   // Return the modified HTML string
  //   return doc.body.innerHTML;
  // };

  // const processHTMLContent = (htmlContent, fontSize, textModifier) => {
  //   if (!htmlContent) return "";

  //   // Parse the HTML string
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(htmlContent, "text/html");

  //   // Modify the text inside <p> tags
  //   doc.querySelectorAll("p").forEach((p) => {
  //     // Modify the text content of each <p> tag
  //     p.textContent = textModifier(p.textContent);

  //     // Optionally, set the font size
  //     p.style.fontSize = `${fontSize}px`;
  //   });

  //   doc.querySelectorAll("img").forEach((img) => {
  //     img.style.maxWidth = "400px";
  //     img.style.minWidth = "400px";
  //     img.style.height = "auto";
  //   });

  //   // Return the modified HTML string
  //   return doc.body.innerHTML;
  // };

  const modifyText = (text) => {
    // Example: Add a prefix to the text
    return `Modified: ${text}`;
  };

  const editresponse = () => {
    setShoweditor(true);
  };

  const { loading, FinalResponse } = useSelector((state) => state.auth);

  const [gptresponse, setGPTresponse] = useState(FinalResponse?.gpt_response);

  console.log(FinalResponse, "FINAL");
  console.log( FinalResponse?.gpt_response, "FinalResponse.gpt_reponce");

  return (
    <div className="rightbar-ar" style={{ width: "75%" }}>
      <div className="toggle-sidebar-ar">
        <label className="hamburger">
          <input id="checkbox" type="checkbox" onClick={toggleMenu} />
          <svg viewBox="0 0 32 32">
            <path
              className="line line-top-bottom"
              d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
            ></path>
            <path className="line" d="M7 16 27 16"></path>
          </svg>
        </label>
        <div className="toggle-head-btn-ar">
          {" "}
          <button className="head-btn-ar active-heading-btn">
            To Questions
          </button>
          <button
            onClick={() => navigate("/samplebook")}
            className="head-btn-ar"
          >
            Sample book
          </button>
        </div>
      </div>
      {loading ? (
        <>
          <div className="loader-outer-ar">
          <Lodersvg/>
            <h1>Uw e-boek genereert. Wacht alstublieft</h1>
          </div>
        </>
      ) : (
        <>
          <div className="preview-book-div-ar">
            <h6>Voorbeeldboek</h6>
            <div className="book-detail-div-ar">
              <span>
                <button onClick={editresponse} className="postion-div-box">
                  Edit
                </button>
              </span>
              <div ref={pdfdata} className="postion-div-save">
                

                {showeditor ? (
                  <RichTextEditor
                    // initialHTML={FinalResponse?.gpt_response}
                    initialHTML={
                      gptresponse ? gptresponse : FinalResponse?.gpt_response
                    }
                    onSave={handleSave}
                  />
                ) : (
                  <div
                    style={{ fontFamily: value }}
                    dangerouslySetInnerHTML={{
                      __html: processHTMLContent(
                        gptresponse ? gptresponse : FinalResponse?.gpt_response,
                        valueSize
                      ),
                    }}
                  />
                )}
              </div>


              
              {/* <button className="visual-btn-ar">
              VISUEEL</button> */}


              
              
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PreviewBook;
