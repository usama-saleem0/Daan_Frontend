import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BiArrowBack,
  BiEdit,
  BiImageAdd,
  BiSave,
  BiSolidSend,
  BiTrash,
} from "react-icons/bi";
import { togglemenu } from "../Redux/Features/QuestionsSlice";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { baseUrl, socketurl } from "../baseUrl";
import "react-image-upload/dist/index.css";
// import VideoQr from "./Videoqr";
import AudioRecorder from "./texttospeech";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import { saveStory, saveStoryEnchaned } from "../Redux/Features/storySlice";
import { Player } from "@lordicon/react";
import Lottie from "lottie-react";
import saveAnimation from "../assets/saveStories.json";

import { Tooltip } from "react-tooltip";
import ICON from "../assets/ani/wired-outline-54-photo-hover-mountains.json";
import ICON2 from "../assets/ani/wired-outline-19-magnifier-zoom-search-hover-spin.json";
import ICON4 from "../assets/ani/wired-outline-453-savings-pig-hover-pinch.json";
import ICON5 from "../assets/ani/wired-outline-49-plus-circle-hover-rotation.json";
import { Button, Modal, ProgressBar } from "react-bootstrap";
import SaveStoriesModal from "./userchat-components/SaveStoriesModal";
import Lodersvg from "./hComponents/Lodersvg";

const UserChat = ({ questionText, chapterId, activeIndex }) => {
  console.log("activeIndex", activeIndex);

  const textareasRef = useRef([]);
  const imagesRef = useRef([]);
  const playerRef1 = useRef(null);
  const playerRef2 = useRef(null);
  const playerRef3 = useRef(null);
  const playerRef4 = useRef(null);
  const { questionId } = useParams();

  // const saveToLocalStorage = (data) => {
  //   localStorage.setItem("storyData", JSON.stringify(data));
  // };

  // // Function to load data from localStorage
  // const loadFromLocalStorage = () => {
  //   const storedData = localStorage.getItem("storyData");
  //   return storedData ? JSON.parse(storedData) : { textareas: [""], images: [] };
  // };

  // const [textareas, setTextareas] = useState(() => loadFromLocalStorage().textareas);
  // const [images, setImages] = useState(() => loadFromLocalStorage().images);
  const [textareas, setTextareas] = useState([""]);
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const [modalcustom, setModalcustom] = useState(false);
  const [saveStories, setsaveStories] = useState(false);
  const [Loader, setLoader] = useState(false);
  const [Loaderimg, setLoaderimg] = useState(false);
  const [StoriesLoader, setStoriesLoader] = useState(false);
  const [questionIds, setQuestionIds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestionId, setCurrentQuestionId] = useState(questionId || "");
  const [currQuesText, setCurrQuesText] = useState("");
  const [Qrimg, setQrimg] = useState([]);

  const [title, settitle] = useState("Verhalen van mij");
  const [titles, setTitles] = useState([]); // To store titles for each media
  const [author, setauthor] = useState(" Wouter");
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();
  const handleAddTextarea = () => {
    if (textareas[textareas.length - 1]?.trim() === "") return;

    setTextareas((prevTextareas) => [...prevTextareas, ""]);
    setImages((prevImages) => [...prevImages, null]); // Add a new empty slot for images
    setSelectedIndex(textareas.length); // Auto-select the newly added textarea

    setTimeout(() => {
      textareasRef.current[textareas.length]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  const handleRemoveTextarea = (index) => {
    if (textareas.length > 1) {
      setTextareas((prevTextareas) =>
        prevTextareas.filter((_, i) => i !== index)
      );
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));

      if (selectedIndex === index) {
        setSelectedIndex(null);
      }
    } else {
      setTextareas([""]);
      setImages([null]);
      setSelectedIndex(0);
    }
  };
  const handleDeleteImage = (index) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = null; // Set the image at the specified index to null
      return newImages;
    });
  };
  const handleChange = (index, event) => {
    const newTextareas = [...textareas];
    newTextareas[index] = event.target.value;
    setTextareas(newTextareas);
  };

  // const handleImageUpload = async (event) => {
  //   console.log("Uploading file...");
  //   const file = event.target.files[0];
  //   if (!file || selectedIndex === null) return;

  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "twjpxlos");

  //   const isVideo = file.type.startsWith("video/");

  //   setLoaderimg(true);
  //   try {
  //     // Upload to Cloudinary
  //     const uploadUrl = isVideo
  //       ? "https://api.cloudinary.com/v1_1/dcd0ad1pk/video/upload"
  //       : "https://api.cloudinary.com/v1_1/dcd0ad1pk/image/upload";

  //     const response = await axios.post(uploadUrl, formData);
  //     const fileUrl = response.data.secure_url;

  //     console.log("Uploaded file URL:", fileUrl);

  //     if (!isVideo) {
  //       // Directly set the image for images
  //       setImages((prevImages) => {
  //         const newImages = [...prevImages];
  //         newImages[selectedIndex] = fileUrl; // Directly set image
  //         return newImages;
  //       });
  //     } else {
  //       setQrimg((prev) => ({
  //         ...prev,
  //         [selectedIndex]: true,
  //       }));
  //       // Generate high-quality QR Code for videos
  //       const qrSize = 200; // Smaller QR size
  //       const qrResponse = await axios.get(
  //         `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
  //           fileUrl
  //         )}&margin=10`
  //       );

  //       console.log("Generated QR Code URL:", qrResponse.config.url);

  //       // Set QR code in the array
  //       setImages((prevImages) => {
  //         const newImages = [...prevImages];
  //         newImages[selectedIndex] = qrResponse.config.url; // Set QR code as image
  //         return newImages;
  //       });
  //     }

  //     setTimeout(() => {
  //       imagesRef.current[selectedIndex]?.scrollIntoView({
  //         behavior: "smooth",
  //         block: "center",
  //       });
  //     }, 100);
  //   } catch (error) {
  //     console.error("Error uploading file or generating QR:", error);
  //   } finally {
  //     setLoaderimg(false);
  //   }
  // };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file || selectedIndex === null) return;

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (isImage) {
      const img = new window.Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        setImageUrl(img.src); // preview only
        setSelectedFile(file);
      };

      img.onerror = () => {
        toast.error("Unable to read the image.");
      };
    } else if (isVideo) {
      // Optional: You can preview video or just show a message
      setImageUrl(URL.createObjectURL(file)); // For preview if needed
      setSelectedFile(file);
    } else {
      toast.error("Unsupported file type. Please select image or video.");
    }
  };

  // const handleImageUpload = async (event) => {
  //   console.log("Uploading file...");
  //   const file = event.target.files[0];
  //   if (!file || selectedIndex === null) return;

  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "twjpxlos");

  //   const isVideo = file.type.startsWith("video/");

  //   setLoaderimg(true);
  //   try {
  //     // Upload to Cloudinary
  //     const uploadUrl = isVideo
  //       ? "https://api.cloudinary.com/v1_1/dcd0ad1pk/video/upload"
  //       : "https://api.cloudinary.com/v1_1/dcd0ad1pk/image/upload";

  //     const response = await axios.post(uploadUrl, formData);
  //     const fileUrl = response.data.secure_url;

  //     console.log("Uploaded file URL:", fileUrl);

  //     if (!isVideo) {
  //       // Directly set the image for images
  //       setImages((prevImages) => {
  //         const newImages = [...prevImages];
  //         newImages[selectedIndex] = fileUrl; // Directly set image
  //         return newImages;
  //       });
  //     } else {
  //       setQrimg((prev) => ({
  //         ...prev,
  //         [selectedIndex]: true,
  //       }));
  //       // Generate high-quality QR Code for videos
  //       const qrSize = 200; // Smaller QR size
  //       const qrResponse = await axios.get(
  //         `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
  //           fileUrl
  //         )}&margin=10`
  //       );

  //       console.log("Generated QR Code URL:", qrResponse.config.url);

  //       // Overlay QR code onto the background image
  //       const backgroundImageUrl =
  //         "https://res.cloudinary.com/ddaif35tp/image/upload/v1745499887/ofyo0ggxlyplgbzdgonq.png";
  //       const qrCodeUrl = qrResponse.config.url;

  //       // Create a canvas to merge the images
  //       const canvas = document.createElement("canvas");
  //       const ctx = canvas.getContext("2d");

  //       // Load the background image
  //       const backgroundImg = new Image();
  //       backgroundImg.crossOrigin = "Anonymous"; // If the image is from a different domain
  //       backgroundImg.src = backgroundImageUrl;

  //       await new Promise((resolve) => {
  //         backgroundImg.onload = resolve;
  //       });

  //       // Set canvas size to match the background image
  //       canvas.width = backgroundImg.width;
  //       canvas.height = backgroundImg.height;

  //       // Draw the background image
  //       ctx.drawImage(backgroundImg, 0, 0);

  //       // Load the QR code image
  //       const qrImg = new Image();
  //       qrImg.crossOrigin = "Anonymous";
  //       qrImg.src = qrCodeUrl;

  //       await new Promise((resolve) => {
  //         qrImg.onload = resolve;
  //       });

  //       // Calculate the position and size for the QR code (adjust these values based on your background image)
  //       const qrWidth = 200; // Adjust based on your design
  //       const qrHeight = 200;
  //       // Calculate center positions
  //       const qrX = (canvas.width - qrSize) / 2.05;
  //       const qrY = (canvas.height - qrSize) / 1.5;

  //       // Draw QR code centered on canvas
  //       ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
  //       // Convert the canvas to a data URL
  //       const finalImageUrl = canvas.toDataURL("image/png");

  //       // Set the combined image in the array
  //       setImages((prevImages) => {
  //         const newImages = [...prevImages];
  //         newImages[selectedIndex] = finalImageUrl; // Set the merged image
  //         return newImages;
  //       });
  //     }

  //     setTimeout(() => {
  //       imagesRef.current[selectedIndex]?.scrollIntoView({
  //         behavior: "smooth",
  //         block: "center",
  //       });
  //     }, 100);
  //   } catch (error) {
  //     console.error("Error uploading file or generating QR:", error);
  //   } finally {
  //     setLoaderimg(false);
  //   }
  // };
  const handleSave = async () => {
    if (!selectedFile || selectedIndex === null) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "twjpxlos");

    const isVideo = selectedFile.type.startsWith("video/");

    setLoaderimg(true);
    try {
      // Upload to Cloudinary
      const uploadUrl = isVideo
        ? "https://api.cloudinary.com/v1_1/dcd0ad1pk/video/upload"
        : "https://api.cloudinary.com/v1_1/dcd0ad1pk/image/upload";

      const response = await axios.post(uploadUrl, formData);
      const fileUrl = response.data.secure_url;

      console.log("Uploaded file URL:", fileUrl);

      if (!isVideo) {
        // Directly set the image for images
        setImages((prevImages) => {
          const newImages = [...prevImages];
          newImages[selectedIndex] = fileUrl; // Directly set image
          return newImages;
        });
      } else {
        setQrimg((prev) => ({
          ...prev,
          [selectedIndex]: true,
        }));
        // Generate high-quality QR Code for videos
        const qrSize = 200; // Smaller QR size
        const qrResponse = await axios.get(
          `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
            fileUrl
          )}&margin=10`
        );

        console.log("Generated QR Code URL:", qrResponse.config.url);

        // Overlay QR code onto the background image
        const backgroundImageUrl = "https://res.cloudinary.com/ddaif35tp/image/upload/v1745499887/ofyo0ggxlyplgbzdgonq.png";
        const qrCodeUrl = qrResponse.config.url;

        // Create a canvas to merge the images
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Load the background image
        const backgroundImg = new Image();
        backgroundImg.crossOrigin = "Anonymous"; // If the image is from a different domain
        backgroundImg.src = backgroundImageUrl;

        await new Promise((resolve) => {
          backgroundImg.onload = resolve;
        });

        // Set canvas size to match the background image
        canvas.width = backgroundImg.width;
        canvas.height = backgroundImg.height;

        // Draw the background image
        ctx.drawImage(backgroundImg, 0, 0);

        // Load the QR code image
        const qrImg = new Image();
        qrImg.crossOrigin = "Anonymous";
        qrImg.src = qrCodeUrl;

        await new Promise((resolve) => {
          qrImg.onload = resolve;
        });

        // Calculate the position and size for the QR code (adjust these values based on your background image)
        const qrWidth = 200; // Adjust based on your design
        const qrHeight = 200;
        // Calculate center positions
        const qrX = (canvas.width - qrSize) / 2.05;
        const qrY = (canvas.height - qrSize) / 1.5;

        // Draw QR code centered on canvas
        ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
        // Convert the canvas to a data URL
        const finalImageUrl = canvas.toDataURL("image/png");

        // Set the combined image in the array
        setImages((prevImages) => {
          const newImages = [...prevImages];
          newImages[selectedIndex] = finalImageUrl; // Set the merged image
          return newImages;
        });
      }
      setTitles((prevTitles) => {
        const newTitles = [...prevTitles];
        newTitles[selectedIndex] = title;
        return newTitles;
      });
      setTimeout(() => {
        imagesRef.current[selectedIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    } catch (error) {
      console.error("Error uploading file or generating QR:", error);
    } finally {
      setImageUrl(null); // Clear the preview
      setSelectedFile(null); // Clear the selected file
      setModalcustom(false);
      setLoaderimg(false);
    }
  };


  const handleMouseEnter = (number) => {
    playerRef1.current?.playFromBeginning();
  };
  const handleMouseEnter2 = (number) => {
    playerRef2.current?.playFromBeginning();
  };
  const handleMouseEnter3 = (number) => {
    playerRef3.current?.playFromBeginning();
  };
  const handleMouseEnter4 = (number) => {
    playerRef4.current?.playFromBeginning();
  };

  const handleVoiceStop = (value) => {
    setTextareas((prev) => {
      if (selectedIndex === null || selectedIndex < 0) return prev; // Ensure a valid index is selected

      const newTextareas = [...prev];
      newTextareas[selectedIndex] =
        (newTextareas[selectedIndex] || "") + " " + value; // Append voice text
      return newTextareas;
    });
  };

  const handleInput = (e) => {
    e.target.style.height = "auto"; // Reset first
    e.target.style.height = `${Math.min(e.target.scrollHeight, 600)}px`; // Limit to 600px
    e.target.style.overflowY =
      e.target.scrollHeight > 600 ? "scroll" : "hidden"; // Add scroll if needed
  };

  const navigate = useNavigate();

  const location = useLocation();
  const currentuserData = JSON.parse(localStorage.getItem("currentuser"));

  const [chatData, setChatData] = useState([]);
  const [chapDatas, setChapData] = useState();

  const findChapterTitle = (chapData) => {
    // Filter the array based on receiverId condition
    const filteredQuestions = chapData?.filter((q) => {
      return q?.receiverId !== currentuserData?.assistentId;
    });

    // console.log("Filtered Questions:", filteredQuestions);

    if (filteredQuestions?.length > 0) {
      // Get the last element from the filtered array
      const lastQuestion = filteredQuestions[filteredQuestions.length - 1];
      // console.log("Last Question:", lastQuestion);
      return lastQuestion?.message;
    } else if (questionText) {
      return questionText;
    } else {
      return "Question not found.";
    }
  };
  const handelData = async () => {
    try {
      const queryParams = new URLSearchParams({
        userId: currentuserData?._id,
        questionId: currentQuestionId,
        receiverId: currentuserData?.assistentId,
      }).toString();

      const response = await fetch(`${baseUrl}/user?${queryParams}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("dd", data);
      setChatData(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    handelData();
  }, [currentQuestionId]);

  useEffect(() => {
    const getChapterData = JSON.parse(localStorage.getItem("chapters"));
    setChapData(getChapterData);
  }, []);

  const userId = currentuserData?._id;

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/get-stories-by-chapterId/${userId}/${location.state.chapterId}`
        );
        const story = response.data.data;
        const ids = story?.map((id) => id?._id);
        const filterIds = ids?.filter((_id) => _id !== questionId); // remove
        filterIds?.unshift(questionId); // add to start
        setQuestionIds(filterIds); // reason for filter is that we want that ques id first which we select
      } catch (error) {
        console.error("Error decompressing or parsing saved data:", error);
      }
    };
    fetch();
  }, []);
  useEffect(() => {
    if (questionIds.length > 0) {
      setCurrentQuestionId(questionIds[currentIndex]);
    }
  }, [currentIndex, questionIds]);
  const handleNext = () => {
    handleSubmit();
    if (currentIndex < questionIds?.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };
  const fetchStoriesById = async (userId) => {
    try {
      setStoriesLoader(true);

      const paramId = questionIds?.length > 0 ? currentQuestionId : questionId;
      const response = await axios.get(
        `${baseUrl}/get-stories-by-id/${userId}/${paramId}`
      );
      const story = response.data.data;

      setTextareas(story.messages?.map((msg) => msg.message) || []);

      setCurrQuesText(response.data.question);
      setImages(story.messages?.map((msg) => msg.images) || []);
    } catch (error) {
      setStoriesLoader(false);
      console.error("Error decompressing or parsing saved data:", error);
    } finally {
      setStoriesLoader(false);
    }
  };

  useEffect(() => {
    fetchStoriesById(userId);
  }, [userId, currentQuestionId]);

  const handleSubmit = async () => {
    setLoader(true);

    // Last textarea khali hai to return kar do
    if (textareas[textareas.length - 1]?.trim() === "") {
      setLoader(false);
      return;
    }

    const userId = currentuserData?._id;

    const formData = {
      userId,
      questionId: currentQuestionId,
      chapterId,
      messages: textareas.map((text, index) => ({
        message: text,
        images: images[index] || [],
        videos: [],
        title: titles[index] || "", // Include the title for this media
      })),
    };

    try {
      const response = await axios.post(`${baseUrl}/stories`, formData);

      console.log("Story saved successfully:", response.data);
      toast.success("Story saved successfully!");

      localStorage.removeItem("storyData");
      setsaveStories(true);
    } catch (error) {
      console.error("Error saving story:", error);
      toast.error(error.response?.data?.error || "Failed to save story");
    } finally {
      setLoader(false);
    }
  };

  const handleSpellCheck = async () => {
    const userId = currentuserData?._id;

    if (selectedIndex === null || !textareas[selectedIndex]) return;

    try {
      const response = await axios.post(`${baseUrl}/spell-check`, {
        text: textareas[selectedIndex],
        userId,
      });

      const correctedText = response.data.correctedText;
      const updatedTexts = [...textareas];
      updatedTexts[selectedIndex] = correctedText;
      setTextareas(updatedTexts);
    } catch (error) {
      console.error("Spell check error:", error);
    }
  };

  // const handleSave = () => {
  //   handleSubmit();
  //   // setModalcustom(false);
  // };

  const Navigate_to_Stoires = () => {
    navigate("/ReviewBook");
    setsaveStories(false);
  };

  const ensuredTextareas = textareas.length === 0 ? [""] : textareas;

  return (
    <div className="rightbar-ar">
      <ToastContainer position="top-center" autoClose={2000} />

      {StoriesLoader ? (
        <div className="loader">
          <Lodersvg />
        </div>
      ) : (
        <div className="toggle-sidebar-ar">
          <div className="toggle-head-btn-ar">
            <button
              onClick={() => navigate("/samplebook")}
              className="head-btn-ar"
            >
              Voorbeeldboek
            </button>
          </div>
        </div>
      )}

      <div className="right-below-ar">
        <div className="heading-chat-ar">
          <div className="add-back-btn-box">
            <div className="add-back-batn">
              <Link to={`/chapter/${currentuserData?._id}`}>
                <BiArrowBack size={24} color="#F39C12" />
              </Link>
            </div>
            <div className="chap-heading-ar">
              <span>{currQuesText} </span>
            </div>
          </div>
          {/* style={{  height: textareas.length > 2 || (images && images.length >= 1) ? 'calc(100vh - 380px)' : '100%'}} */}
          <div className="chat-ar">
            <div className="input-outer-div">
              <div className="input-container">
                {ensuredTextareas?.map((text, index) => (
                  <div
                    key={index}
                    ref={(el) => (textareasRef.current[index] = el)}
                    className={`dynamic--textarea ${
                      selectedIndex === index ? "selected" : ""
                    }`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => {
                      setSelectedIndex(index);
                      setHoveredIndex(null);
                    }}
                    style={{ position: "relative" }}
                  >
                    <textarea
                      className="message-div-ar"
                      placeholder="Type your answer"
                      value={text}
                      onChange={(e) => handleChange(index, e)}
                      // disabled={!(selectedIndex === index || index === 0 || textareas.length < 1)}
                      onInput={handleInput}
                      onFocus={handleInput}
                      style={{
                        width: "100%",
                        // height: "max-content",
                        maxHeight: "1000px",
                        minHeight: "200px",
                        resize: "none",
                      }}
                    />

                    {hoveredIndex === index && (
                      <div className="textarea-actions">
                        <button
                          onClick={() => {
                            setSelectedIndex(index);
                            setHoveredIndex(null);
                          }}
                          className="icon-button"
                          data-tooltip-id="edit-tooltip"
                          data-tooltip-content="Edit this section"
                        >
                          {/* <BiEdit
                            size={20}
                            color={selectedIndex === index ? "#4CAF50" : "#888"}
                          /> */}
                        </button>
                        <button
                          onClick={() => handleRemoveTextarea(index)}
                          className="icon-button"
                          data-tooltip-id="delete-tooltip"
                          data-tooltip-content="Delete this section"
                        >
                          <BiTrash size={20} color="#FF5252" />
                        </button>
                      </div>
                    )}

                    {images[index] && images[index].length > 0 && (
                      <div
                        className="image-preview"
                        style={{ width: Qrimg[index] ? "100%" : "" }}
                      >
                        <img src={images[index]} alt="Uploaded" />
                        <button
                          onClick={() => handleDeleteImage(index)}
                          className="delete-image-btn"
                          data-tooltip-id="delete-tooltip"
                          data-tooltip-content="Delete image"
                        >
                          <BiTrash size={16} color="#FFF" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={"Qustionchat-btn-box"}>
            {/* {activeIndex !== 0 &&  */}
            <>
              <ProgressBar
                className="asd"
                // progressWidth={'100%'}
                hideText
                score={progress}
              />
              <button
                // onClick={() => document.getElementById("image-upload").click()}
                onClick={() => setModalcustom(true)}
                disabled={selectedIndex === null}
                data-tooltip-id="image-tooltip"
                data-tooltip-content="Upload an image"
              >
                <div
                  onMouseEnter={handleMouseEnter}
                  style={{ cursor: "pointer" }}
                >
                  <Player ref={playerRef1} size={25} icon={ICON} />
                </div>
                {/* <BiImageAdd size={25} /> */}
                <span>{Loaderimg ? "Loading" : "Add Media"}</span>
              </button>
              {/* <input
                type="file"
                id="image-upload"
                style={{ display: "none" }}
                accept="image/*, video/*"
                onChange={handleImageUpload}
              /> */}

              <button
                onClick={handleAddTextarea}
                data-tooltip-id="text-tooltip"
                data-tooltip-content="Add a new text section"
              >
                <div onMouseEnter={handleMouseEnter2}>
                  <Player ref={playerRef2} size={25} icon={ICON5} />
                </div>
                {/* <BiEdit size={25} /> */}
                <span>Add Text</span>
              </button>

              <button data-tooltip-id="voice-tooltip" data-tooltip-content="">
                <AudioRecorder onVoiceStop={handleVoiceStop} />

                {/* <span>Add voice</span> */}
              </button>

              <button
                onClick={handleSpellCheck}
                data-tooltip-id="spell-tooltip"
                data-tooltip-content="Check spelling"
              >
                {/* <Spell_Icon /> */}
                <div onMouseEnter={handleMouseEnter3}>
                  <Player ref={playerRef3} size={25} icon={ICON2} />
                </div>
                <span>Spell Checker</span>
              </button>
            </>
            {/* } */}

            {textareas.length > 0 && (
              <button
                onClick={() => {
                  handleSubmit();
                }}
                // onClick={() => setModalcustom(true)}
                disabled={!textareas[textareas.length - 1]?.trim() || Loader}
                data-tooltip-id="save-tooltip"
                data-tooltip-content="Save your story"
              >
                {/* <BiSave size={25} /> */}
                <div
                  onMouseEnter={handleMouseEnter4}
                  style={{ cursor: "pointer" }}
                >
                  <Player ref={playerRef4} size={25} icon={ICON4} />
                </div>
                <span>{Loader ? "Saving..." : "Save Stories"}</span>
              </button>
            )}
          </div>
          <div className="next-per-box">
            <button
              style={{ width: "20%" }}
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              Previous
            </button>

            <button
              style={{ width: "20%" }}
              onClick={handleNext}
              disabled={
                questionIds?.length === 0 ||
                currentIndex === questionIds.length - 1
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <Tooltip id="edit-tooltip" />
      <Tooltip id="delete-tooltip" />
      <Tooltip id="image-tooltip" />
      <Tooltip id="text-tooltip" />
      <Tooltip id="voice-tooltip" />
      <Tooltip id="spell-tooltip" />
      <Tooltip id="save-tooltip" />

      <SaveStoriesModal
        modalcustom={modalcustom}
        setModalcustom={setModalcustom}
        saveAnimation={saveAnimation}
        saveStories={saveStories}
        Navigate_to_Stoires={Navigate_to_Stoires}
        handleSubmit={handleSubmit}
        Loader={Loader}
      />

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
              <label className="form-label">Title (12 characters max)</label>
              <input
                type="text"
                className="form-control"
                name="title"
                maxLength="12"
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
                    htmlFor="fileUpload"
                    className="upload-content"
                    style={{ cursor: "pointer" }}
                  >
                    {imageUrl ? (
                      selectedFile?.type.startsWith("image/") ? (
                        <img
                          src={imageUrl}
                          alt="Uploaded Preview"
                          className="preview-image"
                        />
                      ) : selectedFile?.type.startsWith("video/") ? (
                        <video
                          src={imageUrl}
                          controls
                          className="preview-video"
                        />
                      ) : null
                    ) : (
                      <>
                        <span className="upload-icon">📤</span>
                        <p className="upload-text">Add Image or Video</p>
                        <p className="upload-format">
                          JPEG, PNG, MP4 formats up to 50 MB
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
                  accept="image/*, video/*"
                  // accept="image/*"
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
    </div>
  );
};

export default UserChat;
