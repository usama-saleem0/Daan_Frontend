import React, { useContext, useEffect, useRef, useState } from "react";
// import html2canvas from "html2canvas";
import html2canvas from "html2canvas-pro";
import { useNavigate } from "react-router-dom";
import { BookContext } from "../context/BookContext";
import { CloudinaryUpload } from "../cloudinaryupload/CloudinaryUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  changeStatus,
  incrementstep,
  decrementstep,
} from "../Redux/Features/QuestionsSlice";
import Select from "react-select";
import "../../src/book.css";
import { ToastContainer, toast } from "react-toastify";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Imgecoverpopup from "../pages/Imgecoverpopup";
import ArrowLeftIcon from "../svgsIcons/ArrowLeftIcon";
import ArrowRightIcon from "../svgsIcons/ArrowRightIcon copy";
import { Bin_Icon, Cover_Tick_Icon } from "../svgsIcons/basit_svgs";
import axios from "axios";
import Cover1 from "../assets/b3.png";
import Cover2 from "../assets/b4.png";
import Cover3 from "../assets/b2.png";
import Cover4 from "../assets/b1.png";
import Cover5 from "../assets/b6.png";
import Cover6 from "../assets/b5.png";
import Cover7 from "../assets/b9.png";
import Cover8 from "../assets/b8.png";
import Cover9 from "../assets/b7.png";
import Logo from "../assets/logo.png";
import { baseUrl } from "../baseUrl";
import A5ImageCropper from "./A5ImageCropper/A5ImageCropper";

const LogoWhite =
  "https://res.cloudinary.com/ddaif35tp/image/upload/v1745424290/lkrdywwmd3l8rcdpe5e6.png";
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

const CoverImage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalcustom, setModalcustom] = useState(false);
  const [selectedImages, setselectedImages] = useState(
    localStorage.getItem("image")
  );
  const [styles, setStyles] = useState({
    background: "#f9f3e5",
    color: "#000",
  });
  const [selectedLayout, setSelectedLayout] = useState("image-top");

  console.log("selectedLayout", selectedLayout);
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState(null);
  const ismenuopen = useSelector((state) => state.questionCounter.menuopen);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [selectedFont, setSelectedFont] = useState("Poppins");
  const [showfonts, setShowfonts] = useState(false);
  const [SelectedCover, setSelectedCover] = useState("");
  const [title, settitle] = useState("Verhalen van mij");

  const [author, setauthor] = useState(" Wouter");
  const [sidecover, setsidecover] = useState("Verhalen van mij");
  const [BackCover, setBackCover] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const [IsLogo, setIsLogo] = useState(false);
  const [clasToHide, setClassToHide] = useState(false);
  const activeStep = useSelector((state) => state.questionCounter.activeStep);
  const [imageUrl, setImageUrl] = useState(null); // Original image
  const [cropped, setCropped] = useState(null); // Cropped image
  const [showCropper, setShowCropper] = useState(false); // Toggle cropper UI

  useEffect(() => {
    localStorage.setItem("title", title);
    localStorage.setItem(
      "image",
      "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1737048624/gvm6uaque86qkpjxkrwu.png"
    );
  }, []);

  const handleSave = () => {
    if (cropped) {
      setImageUrl(cropped); // ✅ Update image
      localStorage.setItem("savedImage", cropped);

      // Wait for DOM to update before capturing
      setTimeout(() => {
        handleCaptureAndUpload();
        setModalcustom(false);
      }, 100); // 100ms is usually enough
    } else {
      toast.error("No Image to Upload");
    }
  };

  const handleCaptureAndUpload = async () => {
    const element = document.querySelector(".bookcoverdiv");

    if (!element) {
      console.error("Book cover element not found!");
      toast.error("Book cover element not found!");
      return;
    }

    // Temporarily scale the element itself for better rendering
    const originalTransform = element.style.transform;

    try {
      const canvas = await html2canvas(element, {
        useCORS: true,
        scale: 3, //
        allowTaint: true,
        backgroundColor: null,
        removeContainer: true,
        scrollX: 0, // Ensure no scrolling offsets
        scrollY: 0,
        width: element.scrollWidth,
        height: element.scrollHeight,
      });

      // Revert element transform after capture
      element.style.transform = originalTransform;

      // Convert canvas to image
      const imageData = canvas.toDataURL("image/png");

      const blob = await fetch(imageData).then((res) => res.blob());

      const formData = new FormData();
      formData.append("file", blob);
      formData.append("upload_preset", "twjpxlos"); // Change to your actual preset

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dcd0ad1pk/image/upload", // Change Cloud name
        formData
      );

      if (response.data.secure_url) {
        const uploadedImageUrl = response.data.secure_url;
        const publicId = response.data.public_id;

        localStorage.setItem("imagePublicId", publicId);
        localStorage.setItem("image", uploadedImageUrl);

        const dispatch = useDispatch();
        dispatch(changeStatus());

        toast.success("Book cover saved successfully!");
        console.log("Book cover uploaded:", uploadedImageUrl);
      }
    } catch (error) {
      console.error("Error capturing or uploading:", error);
      // toast.error("Failed to upload book cover.");
    } finally {
      // Always reset transform even if there's an error
      element.style.transform = originalTransform;
    }
  };
  const handleSaveTemplate = () => {
    localStorage.setItem("savedImage", imageUrl);
    toast.success("Template saved successfully!");
    handleCaptureAndUpload();
    setModalShow(false);
  };
  const images = [
    {
      src: "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1737048624/gvm6uaque86qkpjxkrwu.png",
      background: "#f9f3e5",
      color: "#000",
      layout: "text-top",
      cover: Cover1,
      objectposition: "bottom",
      objectfit: "cover",
      authorposition: "relative",
      authormargin: "0px",
      authorbackground: "#f39c12",
      authorcolor: "#000",
      bookpara: "",
      booktextposition: "",
      width: "",
      bookcoverdivimageheight: "34vh",
      imagemargintop: "40px",
      bookcoverdivimageposition: "",
      bookcoverdivimagepositionright: "",
      bookcoverdivimagewidth: "",
      logo: Logo,
      logoPosition: "relative",
      logoMargin: "",
    },

    //2
    {
      src: "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1737048657/waikk0vkrhmsuduy7dhc.png",
      background: "#a9a11a",
      color: "#000",
      layout: "image-top",
      cover: Cover2,
      objectposition: "top",
      objectfit: "cover",
      authorposition: "",
      authormargin: "0px",
      authorbackground: "",
      authorcolor: "#000",
      bookpara: "",
      booktextposition: "",
      width: "",
      bookcoverdivimageheight: "70%",
      imagemargintop: "",
      bookcoverdivimageposition: "",
      bookcoverdivimagepositionright: "",
      bookcoverdivimagewidth: "",
      logo: Logo,
      logoPosition: "relative",
      logoMargin: "",
    },
    // {
    //   src: "https://res.cloudinary.com/ddaif35tp/image/upload/v1742207726/z7kivtq0b2vnbkzkt3qu.png",
    //   background: "#f0dde3",
    //   color: "#000",
    //   layout: "text-top",
    //   cover: Cover3,
    //   objectposition: 'bottom',
    //   authorposition: '',
    //   authormargin: '0px',
    //   authorbackground: "",
    //   authorcolor: "#000",
    //   bookpara: '',
    //   booktextposition: '',
    //   width: '',
    //   bookcoverdivimageheight: '73%',
    //   imagemargintop: '',
    //   bookcoverdivimageposition: '',
    //   bookcoverdivimagepositionright: '',
    //   bookcoverdivimagewidth: '',
    //   logo: Logo,
    //   logoPosition: 'relative',s
    //   logoMargin: '',

    // },
    // 3
    {
      src: "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1737048555/y3ih8qs7t4qaw9exehok.png",
      background: "#fce2b8",
      color: "#000",
      layout: "image-top",
      cover: Cover5,
      objectposition: "top",
      objectfit: "contain",
      authorposition: "",
      authormargin: "0px",
      authorbackground: "#f39c12",
      authorcolor: "#000",
      bookpara: "",
      booktextposition: "",
      width: "",
      bookcoverdivimageheight: "74%",
      imagemargintop: "",
      bookcoverdivimageposition: "",
      bookcoverdivimagepositionright: "",
      bookcoverdivimagewidth: "",
      logo: Logo,
      logoPosition: "relative",
      logoMargin: "",
    },
    // green 4
    {
      src: "https://res.cloudinary.com/ddaif35tp/image/upload/v1744365653/feoeez3zrql1u4auotge.png",
      background: "#297C69",
      color: "#FFF",
      layout: "text-top",
      cover: Cover8,
      objectposition: "bottom",
      objectfit: "contain",
      authorposition: "",
      authormargin: "0px",
      authorbackground: "",
      authorcolor: "#FFF",
      bookpara: "",
      booktextposition: "",
      width: "",
      bookcoverdivimageheight: "57%",
      imagemargintop: "",
      bookcoverdivimageposition: "",
      bookcoverdivimagepositionright: "",
      bookcoverdivimagewidth: "85%",
      logo: LogoWhite,
      logoPosition: "relative",
      logoMargin: "",
    },
    // darkblue 5
    {
      src: "https://res.cloudinary.com/ddaif35tp/image/upload/v1744365654/g3rdajhkzfx4w1yu4jvw.png",
      background: "#091F3E",
      color: "#FFF",
      layout: "text-top",
      cover: Cover8,
      objectposition: "bottom",
      objectfit: "contain",
      authorposition: "",
      authormargin: "0px",
      authorbackground: "",
      authorcolor: "#FFF",
      bookpara: "",
      booktextposition: "",
      width: "",
      bookcoverdivimageheight: "57%",
      imagemargintop: "",
      bookcoverdivimageposition: "",
      bookcoverdivimagepositionright: "",
      bookcoverdivimagewidth: "85%",
      logo: LogoWhite,
      logoPosition: "relative",
      logoMargin: "",
    },
    // lightblue 6
    {
      src: "https://res.cloudinary.com/ddaif35tp/image/upload/v1744365655/gejanyesqw3ose9tv3qu.png",
      background: "#B8C7D9",
      color: "#FFF",
      layout: "text-top",
      cover: Cover8,
      objectposition: "bottom",
      objectfit: "contain",
      authorposition: "",
      authormargin: "0px",
      authorbackground: "",
      authorcolor: "#FFF",
      bookpara: "",
      booktextposition: "",
      width: "",
      bookcoverdivimageheight: "57%",
      imagemargintop: "",
      bookcoverdivimageposition: "",
      bookcoverdivimagepositionright: "",
      bookcoverdivimagewidth: "85%",
      logo: LogoWhite,
      logoPosition: "relative",
      logoMargin: "",
    },
    // purple 7
    {
      src: "https://res.cloudinary.com/ddaif35tp/image/upload/v1744365699/dopip0klsbpj9s0kvlba.png",
      background: "#783778",
      color: "#FFF",
      layout: "text-top",
      cover: Cover8,
      objectposition: "bottom",
      objectfit: "contain",
      authorposition: "",
      authormargin: "0px",
      authorbackground: "",
      authorcolor: "#FFF",
      bookpara: "",
      booktextposition: "",
      width: "",
      bookcoverdivimageheight: "57%",
      imagemargintop: "",
      bookcoverdivimageposition: "",
      bookcoverdivimagepositionright: "",
      bookcoverdivimagewidth: "85%",
      logo: LogoWhite,
      logoPosition: "relative",
      logoMargin: "",
    },
    // 8
    {
      src: "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1737048596/emwvicggaln1lrezyukn.png",
      background: "#e3b1d2",
      color: "#FFF",
      layout: "image-top",
      cover: Cover6,
      objectposition: "top",
      objectfit: "contain",
      authorposition: "",
      authormargin: "0px",
      authorbackground: "#000",
      authorcolor: "#FFF",
      bookpara: "",
      booktextposition: "",
      width: "",
      bookcoverdivimageheight: "74%",
      imagemargintop: "",
      bookcoverdivimageposition: "",
      bookcoverdivimagepositionright: "",
      bookcoverdivimagewidth: "",
      logo: LogoWhite,
      logoPosition: "relative",
      logoMargin: "",
    },
    // 9
    {
      src: "https://res.cloudinary.com/ddaif35tp/image/upload/v1745586937/pnnjjwqv2jjliqpri0ku.png",
      background: "#654321",
      color: "#FFF",
      layout: "image-top",
      cover: Cover7,
      objectposition: "top",
      objectfit: "cover",
      authorposition: "relative",
      authormargin: "80px 0px 0px 0px",
      authorbackground: "",
      authorcolor: "#FFF",
      bookpara: "absolute",
      booktextposition: "10em",
      width: "40%",
      bookcoverdivimageheight: "100%",
      imagemargintop: "",
      bookcoverdivimageposition: "absolute",
      bookcoverdivimagepositionright: "0",
      bookcoverdivimagewidth: "60%",
      logo: LogoWhite,
      logoPosition: "absolute",
      logoMargin: "0px 40px",
      hideclass: true,
    },
    //10
    {
      src: "https://res.cloudinary.com/ddaif35tp/image/upload/v1745586936/pefvrotjpnvi2haikvq8.png",
      background: "#660033",
      color: "#FFF",
      layout: "text-top",
      cover: Cover8,
      objectposition: "bottom",
      objectfit: "contain",
      authorposition: "",
      authormargin: "0px",
      authorbackground: "",
      authorcolor: "#FFF",
      bookpara: "",
      booktextposition: "",
      width: "",
      bookcoverdivimageheight: "74%",
      imagemargintop: "",
      bookcoverdivimageposition: "",
      bookcoverdivimagepositionright: "",
      bookcoverdivimagewidth: "",
      logo: LogoWhite,
      logoPosition: "relative",
      logoMargin: "",
    },
  ];

  const handleImageClick = (
    background,
    color,
    objectposition,
    objectfit,
    authorposition,
    authormargin,
    authorbackground,
    authorcolor,
    bookpara,
    booktextposition,
    width,
    bookcoverdivimageheight,
    imagemargintop,
    bookcoverdivimageposition,
    bookcoverdivimagepositionright,
    bookcoverdivimagewidth,
    layout,
    cover,
    src,
    logo,
    logoPosition,
    logoMargin,
    hideclass
  ) => {
    setStyles({
      background,
      color,
      objectposition,
      objectfit,
      authorposition,
      authormargin,
      authorbackground,
      authorcolor,
      bookpara,
      booktextposition,
      width,
      bookcoverdivimageheight,
      imagemargintop,
      bookcoverdivimageposition,
      bookcoverdivimagepositionright,
      bookcoverdivimagewidth,
      logoPosition,
      logoMargin,
    });
    setSelectedLayout(layout);
    setSelectedCover(cover);
    setIsCustom(src);
    setIsLogo(logo);
    setClassToHide(hideclass ? hideclass : false);
  };

  // const handleImageUpload = (event) => {

  //   const file = event.target.files[0];
  //   if (!file) return;

  //   const imageUrl = URL.createObjectURL(file);
  //   setImageUrl(imageUrl);
  // };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const img = new window.Image(); // 👈 Fix here
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      setImageUrl(img.src); // Save original
      setShowCropper(true); // Show cropper
    };

    img.onerror = () => {
      toast.error("Unable to read the image.");
    };
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
  const loadFont = (fontName) => {
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(
      " ",
      "+"
    )}&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  };
  const [showPopup, setShowPopup] = useState(false);
  // Function to toggle popup
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const onValue = (value) => {
    console.log("onValue", value);

    setauthor(value.author);
    settitle(value.title);

    setselectedImages(value.cover_image);
  };

  const handleImageDelete = () => {
    setImageUrl(null);
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
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
          <span className="text">Terug naar Verbeter boek</span>
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
          onClick={() => dispatch(incrementstep(3))}
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

      <div className="alignments">
        <div className="leftPanel">
          <div className="more-box-list">
            <div className="Choose-Template-box">
              <h2>Choosse your Template</h2>
              <p>
                Selecteer een sjabloon uit onderstaande opties voor de omslag
                van je boek
              </p>
            </div>

            {/* <div className="two-button-box">
          <button onClick={togglePopup}>
            Omslag bewerken</button>
        </div> */}
          </div>
          <Container>
            <div className="template--select--main">
              <div className="template--select">
                <span>
                  <Cover_Tick_Icon />
                  <h5>1. Select your cover template</h5>
                </span>
                <button onClick={() => setModalShow(true)}>Edit</button>
              </div>
              <div className="template--select">
                <span>
                  <Cover_Tick_Icon />
                  <h5>2. Customize your image & text of cover</h5>
                </span>
                <button onClick={() => setModalcustom(true)}>Edit</button>
              </div>

              <div className="back--cover">
                {BackCover ? (
                  <button onClick={() => setBackCover(false)}>
                    View Front Page
                  </button>
                ) : (
                  <button onClick={() => setBackCover(true)}>
                    View Back Cover
                  </button>
                )}
              </div>
            </div>
          </Container>
        </div>

        <div className="rightpanel">
          <div
            className="postion-box-book-cover"
            style={{ background: styles.background }}
          >
            <div className="one-more-box">
              <div className="book-cover-tital-rout">
                <h2
                  style={{ color: styles.color, background: styles.background }}
                >
                  {title}
                </h2>
              </div>
              <img src={IsLogo || Logo} alt="" />
            </div>
          </div>

          <div
            className={`${clasToHide ? "flex-remove" : ""} bookcoverdiv`}
            style={{
              background: styles.background,
              width: !imageUrl ? "37vh" : "37vh",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {imageUrl && isHovered && (
              <div className="deleteimg" onClick={handleImageDelete}>
                <Bin_Icon />
              </div>
            )}

            {!BackCover ? (
              !imageUrl ? (
                // If imageUrl is null, show only the selected image from images array
                <img
                  src={
                    isCustom
                      ? isCustom
                      : "http://res.cloudinary.com/dcd0ad1pk/image/upload/v1737048624/gvm6uaque86qkpjxkrwu.png"
                  }
                  style={{ height: "100%", objectFit: "cover", width: "100%" }}
                  alt="Book Cover"
                />
              ) : selectedLayout === "image-top" ? (
                <>
                  <img
                    src={
                      imageUrl
                        ? imageUrl
                        : SelectedCover
                        ? SelectedCover
                        : Cover1
                    }
                    style={{
                      objectPosition: styles.objectposition,
                      objectFit: styles.objectfit,
                      height: styles.bookcoverdivimageheight,
                      position: styles.bookcoverdivimageposition,
                      right: styles.bookcoverdivimagepositionright,
                      width: styles.bookcoverdivimagewidth,
                    }}
                    alt="Book Cover"
                  />
                  <div
                    className="book-cover-para-logo"
                    style={{
                      position: styles.logoPosition,
                      margin: styles.logoMargin,
                    }}
                  >
                    <img src={IsLogo || Logo} alt="" />
                  </div>
                  <div
                    className="book-cover-para"
                    style={{
                      position: styles.bookpara,
                      top: styles.booktextposition,
                      width: styles.width,
                    }}
                  >
                    <h1 style={{ color: styles.color }}>{title}</h1>
                  </div>
                  <div
                    className="book-cover-para"
                    style={{
                      position: styles.bookpara,
                      top: styles.booktextposition,
                      width: styles.width,
                    }}
                  >
                    <p
                      style={{
                        position: styles.authorposition,
                        margin: styles.authormargin,
                        background: styles.authorbackground,
                        color: styles.authorcolor,
                      }}
                    >
                      {author}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="book-cover-para-logo"
                    style={{
                      position: styles.logoPosition,
                      margin: styles.logoMargin,
                    }}
                  >
                    <img src={IsLogo || Logo} alt="" />
                  </div>
                  <div
                    className="book-cover-para"
                    style={{
                      position: styles.bookpara,
                      top: styles.booktextposition,
                      width: styles.width,
                    }}
                  >
                    <h1 style={{ color: styles.color }}>{title}</h1>
                  </div>
                  <div
                    className="book-cover-para"
                    style={{
                      position: styles.bookpara,
                      top: styles.booktextposition,
                      width: styles.width,
                    }}
                  >
                    <p
                      style={{
                        color: styles.authorcolor,
                        position: styles.authorposition,
                        margin: styles.authormargin,
                        background: styles.authorbackground,
                      }}
                    >
                      {author}
                    </p>
                  </div>
                  <img
                    src={
                      imageUrl
                        ? imageUrl
                        : SelectedCover
                        ? SelectedCover
                        : Cover1
                    }
                    style={{
                      objectPosition: styles.objectposition,
                      objectFit: styles.objectfit,
                      height: styles.bookcoverdivimageheight,
                      position: styles.bookcoverdivimageposition,
                      right: styles.bookcoverdivimagepositionright,
                      width: styles.bookcoverdivimagewidth,
                    }}
                    alt="Book Cover"
                  />
                </>
              )
            ) : (
              <div className="back--cover">
                <p
                  style={{ color: styles.color, background: styles.background }}
                >
                  Made by {author}
                </p>
              </div>
            )}
          </div>

          {/* <div className="back--cover">
            {BackCover ?

              <button onClick={() => setBackCover(false)}  >View Front Page</button>
              :
              <button onClick={() => setBackCover(true)}  >View Back Cover</button>
            }

          </div> */}
        </div>
      </div>

      {showPopup && (
        <>
          <div className="popup-backdrop" onClick={togglePopup}></div>
          <div className="Add-New-Family-Member-popup-box">
            <Imgecoverpopup onValue={onValue} />
            <button className="clous-btn" onClick={togglePopup}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="65"
                height="65"
                viewBox="0 0 65 65"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M32.5 0C14.5632 0 0 14.5632 0 32.5C0 50.4367 14.5632 65 32.5 65C50.4367 65 65 50.4367 65 32.5C65 14.5632 50.4367 0 32.5 0ZM27.9013 32.5L18.7103 23.3057C17.4427 22.0382 17.4427 19.9778 18.7103 18.7103C19.9778 17.4427 22.0382 17.4427 23.3057 18.7103L32.5 27.9045L41.691 18.7103C42.9585 17.4427 45.019 17.4427 46.2865 18.7103C47.5573 19.9778 47.5573 22.0382 46.2865 23.3057L37.0955 32.5L46.2865 41.691C47.5573 42.9585 47.5573 45.019 46.2865 46.2865C45.019 47.5573 42.9585 47.5573 41.691 46.2865L32.5 37.0955L23.3057 46.2865C22.0382 47.5573 19.9778 47.5573 18.7103 46.2865C17.4427 45.019 17.4427 42.9585 18.7103 41.691L27.9013 32.5Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>
        </>
      )}

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="w-100">
          <Modal.Title id="contained-modal-title-vcenter" className="w-100">
            Choose your template
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Select a template from our options for your book cover</h6>
          <div className="main-row-box">
            {images.map((image, index) => (
              <div className="new-div-box" key={index}>
                <Image
                  src={image.src}
                  thumbnail
                  onClick={() =>
                    handleImageClick(
                      image.background,
                      image.color,
                      image.objectposition,
                      image.objectfit,
                      image.authorposition,
                      image.authormargin,
                      image.authorbackground,
                      image.authorcolor,
                      image.bookpara,
                      image.booktextposition,
                      image.width,
                      image.bookcoverdivimageheight,
                      image.imagemargintop,
                      image.bookcoverdivimageposition,
                      image.bookcoverdivimagepositionright,
                      image.bookcoverdivimagewidth,
                      image.layout,
                      image.cover,
                      image.src,
                      image.logo,
                      image.logoPosition,
                      image.logoMargin,
                      image.hideclass
                    )
                  }
                />
              </div>
            ))}
          </div>
        </Modal.Body>

        <Modal.Footer className="w-100 justify-content-between">
          <Button
            style={{
              background: "#ebbb5b",
              border: "none",
              width: "20%",
            }}
            onClick={handleSaveTemplate}
          >
            Save
          </Button>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={modalcustom}
        onHide={() => setModalcustom(false)}
        // backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="w-100">
          <Modal.Title id="contained-modal-title-vcenter" className="w-100">
            Customize your image & text
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="customize-container">
            <h4 className="modal-title">Customize your image & text</h4>
            <p className="modal-subtitle">
              Customize your cover with your own text & image
            </p>

            {/* Title Input */}
            <div className="form-group">
              <label className="form-label">Title (30 characters max)</label>
              <input
                type="text"
                className="form-control"
                name="title"
                maxLength="30"
                placeholder="Enter title"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
            </div>

            {/* Author Input */}
            <div className="form-group">
              <label className="form-label">Author</label>
              <input
                type="text"
                className="form-control"
                maxLength="30"
                name="author"
                placeholder="Enter author name"
                value={author}
                onChange={(e) => setauthor(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Image</label>

              <div
                className="upload-box"
                style={{ height: imageUrl ? "auto" : "150px" }}
              >
                <div className="upload-content">
                  <label
                    // htmlFor="fileUpload"
                    className="upload-content"
                    style={{ cursor: "pointer" }}
                  >
                    {imageUrl ? (
                      <>
                        <A5ImageCropper
                          imageSrc={imageUrl}
                          onCropDone={(croppedImage) => {
                            setCropped(croppedImage);

                            setShowCropper(false);
                          }}
                        />

                        {/* {cropped && <img src={cropped} alt="Cropped A5" />} */}
                      </>
                    ) : (
                      <>
                        <span className="upload-icon">📤</span>
                        <p className="upload-text">Add Image</p>
                        <p className="upload-format">
                          JPEG, PNG formats up to 50 MB
                        </p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Move the button OUTSIDE the "upload-content" div */}
              <div className="upload-button-container">
                <input
                  type="file"
                  className="upload-input"
                  accept="image/*"
                  onChange={handleImageUpload}
                  id="fileUpload"
                  hidden
                />
                <label htmlFor="fileUpload" className="browse-button">
                  BROWSE FILE
                </label>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="w-100 justify-content-between">
          <Button
            style={{
              background: "#ebbb5b",
              border: "none",
              width: "20%",
            }}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => setModalcustom(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CoverImage;
