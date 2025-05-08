import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookContext } from "../context/BookContext";
import { CloudinaryUpload } from "../cloudinaryupload/CloudinaryUpload";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus } from "../Redux/Features/QuestionsSlice";
import Select from "react-select";

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

const googleFonts = [
  { value: "Poppins", label: "Poppins" },
  { value: "Roboto", label: "Roboto" },
  { value: "Lato", label: "Lato" },
  { value: "Open Sans", label: "Open Sans" },
  { value: "Montserrat", label: "Montserrat" },
  { value: "Raleway", label: "Raleway" },
  { value: "Nunito", label: "Nunito" },
  { value: "fantasy", label: "fantasy" },
  { value: "math", label: "math" },


];



const googleFontSize = [
  { value: 10, label: "10" },
  { value: 12, label: "12" },
  { value: 14, label: "14" },
  { value: 16, label: "16" },
  { value: 18, label: "18" },
  { value: 20, label: "20" },
  { value: 22, label: "22" },
  { value: 24, label: "24" },
  { value: 26, label: "26" },



  


];


const SampleSidebar = ({ onValueChange , onValueChangeSize }) => {


  const [modalShow, setModalShow] = useState(false);

  
  const handleImageClick = (image) => {
    localStorage.setItem("image", image);
    dispatch(changeStatus());
    console.log("Image URL saved to localStorage:", image);

    setModalShow(false);
  };

  const Image1 = "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1732727349/jcuk50297hg7cvp084ii.jpg"
  const Image2 =
    "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1732727294/jv4krcot52fex4cnwwje.jpg"
  const Image3 =
    "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1732727391/ijpqepw2tgjapchvgp5q.jpg"
  const Image4 =
    "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1732727416/cvqao3snsgigrmse9f3g.jpg"
  const Image5 =
    "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1732727486/odxx64f871qm7mbnch3e.jpg"
  const Image6 =
    "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1732727513/roggtpqzzuoyelki8nzp.jpg"
  const Image7 =
    "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1732727537/nyivhgjrrvrd9ayxvurv.jpg"
  const Image8 =
    "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1732727554/suwd94rlowboscvx6tzs.jpg"
  const Image9 =
    "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1732727592/ksh7970dkzim2rtx1vfn.jpg"
  const Image10 =
    "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1732727607/fklu6yizvgetzyq8fmdo.jpg"



  const navigate = useNavigate();
  const { generatepdf } = useContext(BookContext);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState(null);
  const ismenuopen = useSelector((state) => state.questionCounter.menuopen);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [selectedFont, setSelectedFont] = useState("Poppins");
  const [showfonts, setShowfonts] = useState(false);
  const [showfontssize, setsShowfontssize] = useState(false);



  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

    if(button === "changeFont"){
      setShowfonts((prev) => !prev);
      setsShowfontssize(false)
    }

    if(button === "changeFontSize"){
      setsShowfontssize((prev) => !prev);
      setShowfonts(false)
    }
  };


 


  const loadFont = (fontName) => {
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(
      " ",
      "+"
    )}&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  };

  // Handle font selection
  const handleFontChange = (selectedOption) => {
    setSelectedFont(selectedOption.value);

    onValueChange(selectedOption.value)
    loadFont(selectedOption.value);
  };


  const handleFontSizeChange = (selectedOption) => {
   

    onValueChangeSize(selectedOption.value)
   
  };


  return (

    <>


<Modal show={modalShow} onHide={() => setModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
   
Selecteer de afbeeldingen voor omslag
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="grid-example">
          <Container>
            <Row>

              <Col xs={4} md={4} >
                <Image src={Image1} thumbnail  onClick={() =>
            handleImageClick(
             "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1732727349/jcuk50297hg7cvp084ii.jpg"
            )
          }  />
              </Col>

              <Col xs={4} md={4} >
                <Image src={Image2} thumbnail  onClick={() =>
            handleImageClick(
              "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1732727294/jv4krcot52fex4cnwwje.jpg"
            )
          } />
              </Col>
              <Col xs={4} md={4} >
                <Image src={Image3} thumbnail  onClick={() =>
            handleImageClick(
              "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1732727391/ijpqepw2tgjapchvgp5q.jpg"
            )
          }   />
              </Col>
            </Row>

            <Row>

              <Col xs={4} md={4} >
                <Image src={Image4} thumbnail  onClick={() =>
            handleImageClick(
              "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1732727416/cvqao3snsgigrmse9f3g.jpg"
            )
          }  />
              </Col>

              <Col xs={4} md={4} >
                <Image src={Image5} thumbnail  onClick={() =>
            handleImageClick(
              "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1732727486/odxx64f871qm7mbnch3e.jpg"
            )
          }  />
              </Col>
              <Col xs={4} md={4} >
                <Image src={Image6} thumbnail  onClick={() =>
            handleImageClick(
              "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1732727513/roggtpqzzuoyelki8nzp.jpg"
            )
          }  />
              </Col>
            </Row>
            <Row>

              <Col xs={4} md={4} >
                <Image src={Image7} thumbnail  onClick={() =>
            handleImageClick(
              "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1732727537/nyivhgjrrvrd9ayxvurv.jpg"
            )
          }  />
              </Col>

              <Col xs={4} md={4} >
                <Image src={Image8} thumbnail  onClick={() =>
            handleImageClick(
              "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1732727554/suwd94rlowboscvx6tzs.jpg"
            )
          }  />
              </Col>
              <Col xs={4} md={4} >
                <Image src={Image9} thumbnail  onClick={() =>
            handleImageClick(
              "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1732727592/ksh7970dkzim2rtx1vfn.jpg"
            )
          }  />
              </Col>
            </Row>


            <Row>

              <Col xs={4} md={4} >
                <Image src={Image10} thumbnail  onClick={() =>
            handleImageClick(
              "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1732727607/fklu6yizvgetzyq8fmdo.jpg"
            )
          }  />
              </Col>

            </Row>


          </Container>
        </Modal.Body>
      </Modal>




    <div
      className="sidebar-ar"
      style={{
        display: isSmallScreen && !ismenuopen ? "none" : "block",
      }}
    >
      <div className="sidebar-upper-div-ar">
        <div className="siebar-top-div">
          <button onClick={() => navigate("/")} className="head-btn-ar">
       
Op vragen
          </button>
          <button className="head-btn-ar active-heading-btn">
          Voorbeeldboek
          </button>
        </div>
        <h3 className="sidebar-chap-heading">
        Selecteer Voorkeuren</h3>
      </div>

      <div className="sidebar-btn-ar">
        <div className="chapters-name-div-ar">
          <div className="sample-book-sidebar-btns-ar">
            <button
           
              onClick={() => handleButtonClick("changeFont")}
              className={
                activeButton === "changeFont" ? "sample-book-active-ar" : ""
              }
            >
            
Wijzig het lettertype
            </button>

            {
              showfonts &&(
                <Select

                styles={{width:'100%'}}
                  options={googleFonts}
                  onChange={handleFontChange}
                  defaultValue={{ value: "Poppins", label: "Poppins" }}
                />

              )
            }



                        <button
                            
                            onClick={() => handleButtonClick("changeFontSize")}
                            className={
                              activeButton === "changeFontSize" ? "sample-book-active-ar" : ""
                            }
                          >
                         Wijzig de lettergrootte
                          </button>


                          {
              showfontssize &&(
                <Select

                styles={{width:'100%'}}
                  options={googleFontSize}
                  onChange={handleFontSizeChange}
                  defaultValue={{ value: 12, label: "12" }}
                />

              )
            }

           
            <button
              onClick={() => handleButtonClick("changeStyle")}
              className={
                activeButton === "changeStyle" ? "sample-book-active-ar" : ""
              }
            >
             Verander de schrijfstijl
            </button>
            <button
              onClick={() => handleButtonClick("onlyQA")}
              className={
                activeButton === "onlyQA" ? "sample-book-active-ar" : ""
              }
            >
             
Alleen vraag en antwoord
            </button>
            <button
              // onClick={() => handleButtonClick("chooseCover")}
              onClick={() => setModalShow(true)}
              className={
                activeButton === "chooseCover" ? "sample-book-active-ar" : ""
              }
            >
        
Kies dekking

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
     
Orderboek
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

    </>
  );
};

export default SampleSidebar;
