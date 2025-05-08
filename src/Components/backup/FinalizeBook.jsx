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
import { incrementstep, decrementstep } from "../Redux/Features/QuestionsSlice";
import ArrowLeftIcon from "../../svgsIcons/ArrowLeftIcon";
import ArrowRightIcon from "../../svgsIcons/ArrowRightIcon copy";

const FinalizeBook = ({ value, valueSize }) => {
  console.log("achivee", valueSize);
  const pdfdata = useRef(null);

  const activeStep = useSelector((state) => state.questionCounter.activeStep);


  const [user_id, setuser_id] = useState(localStorage.getItem("userId"));

  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    dispatch(togglemenu());
  };

  const [coverimgurl, setCoverimgurl] = useState(null);
  const [showeditor, setShoweditor] = useState(false);
  const { loading, FinalResponse } = useSelector((state) => state.auth);

  const [gptresponse, setGPTresponse] = useState(FinalResponse?.gpt_response);
  const [fontSize, setfontSize] = useState(20);
  const [fontFamily, setfontFamily] = useState('');



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
    setGPTresponse(savedContent)
    setfontSize(fontSize)
    setfontFamily(fontFamily)


  }, []);



  const handleSave = (updatedHTML) => {
    console.log("Saved content:", updatedHTML);
    setGPTresponse(updatedHTML)

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

    setShoweditor(true)



  }



  console.log(loading, FinalResponse, "FINAL");

  return (
    <div className="rightbar-ar" style={{ width: '100%' }}>
      <div className="toggle-sidebar-ar">
        <label class="hamburger">
          <input id="checkbox" type="checkbox" onClick={toggleMenu} />

          <CustomIcon />
        </label>
        <div className="toggle-head-btn-ar">
          {" "}
          <button className="head-btn-ar active-heading-btn">
            Op vragen

          </button>
          <button
            onClick={() => navigate("/samplebook")}
            className="head-btn-ar"
          >
            Voorbeeldboek

          </button>
        </div>
      </div>
      {loading ? (
        <>
          <div className="loader-outer-ar">
            <Loader />
            <h1>
              Uw e-boek uitstekend. Alsjeblieft</h1>
          </div>
        </>
      ) : (
        <>
          <div className="preview-book-div-ar">
            <h6>

              Laatste controle</h6>
            <div className="book-detail-div-ar">

              <div ref={pdfdata}>
                {coverimgurl && (
                  <div
                    className="cover-img-div"
                    style={{
                      width: "100%",
                      height: "272mm",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={coverimgurl}
                      style={{
                        width: "100%",
                        height: "272mm",
                        objectFit: "cover",
                      }}
                      alt=""
                    />
                  </div>
                )}


                {(gptresponse || FinalResponse?.gpt_response) && (
                  <div
                    style={{ fontFamily: fontFamily || "inherit" }} // Default to 'inherit' if null
                    dangerouslySetInnerHTML={{
                      __html: processHTMLContent(
                        gptresponse || FinalResponse?.gpt_response || "", // Ensure non-null string
                        fontSize
                      ),
                    }}
                  />
                )}

              </div>
              <button className="visual-btn-ar">
                VISUEEL</button>
            </div>

            <div className="navigation">
              <button onClick={() => dispatch(decrementstep())} disabled={activeStep === 0}>
              <ArrowLeftIcon/>
              </button>
              <button
                onClick={() => dispatch(incrementstep())}
                // disabled={activeStep === 3} // Max steps
              >
           <ArrowRightIcon/>
              </button>

            </div>


          </div>
        </>
      )}
    </div>
  );
};

export default FinalizeBook;