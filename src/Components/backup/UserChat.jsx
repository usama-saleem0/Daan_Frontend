import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidSend } from "react-icons/bi";
import { togglemenu } from "../Redux/Features/QuestionsSlice";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { baseUrl, socketurl } from "../baseUrl";
import "react-image-upload/dist/index.css";
// import VideoQr from "./Videoqr";
import AudioRecorder from "./texttospeech";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
// Lottie-File-import// Lottie-File-import// Lottie-File-import
import { debounce } from "lodash";
import Lottie from "lottie-react";
import bla from '../assets/Animation1739376208261.json'
import LottiAnimation from "./LottiAnimation";

// Lottie-File-import// Lottie-File-import// Lottie-File-import

const UserChat = ({ chapterId,questionText, chapterData2 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lastMessageRef = useRef(null);

  console.log("location", chapterData2);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    dispatch(togglemenu());
  };
  
  const [previousMessageLength, setPreviousMessageLength] = useState(0);
  
  const { questionId } = useParams();
  const currentuserData = JSON.parse(localStorage.getItem("currentuser"));
  const socket = io(socketurl);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current question index
  const [chatData, setChatData] = useState([]);
  const [chapDatas, setChapData] = useState();
  const [prompt, setprompt] = useState("");
  const [isAIResponding, setIsAIResponding] = useState(false); // Track AI response status
  const [aiToggle, setNoAIToggle] = useState(false);
  const findChapterTitle = (chapData) => {
    console.log("chapDatas", questionText);

    // Filter the array based on receiverId condition
    const filteredQuestions = chapData?.filter((q) => {
      console.log("1111", q);
      return q?.receiverId !== currentuserData?.assistentId;
    });

    console.log("Filtered Questions:", filteredQuestions);

    if (filteredQuestions?.length > 0) {
      // Get the last element from the filtered array
      const lastQuestion = filteredQuestions[filteredQuestions.length - 1];
      console.log("Last Question:", lastQuestion);
      return lastQuestion?.message;
    } else if (questionText) {
     return questionText
    } else {
      return "Question not found.";
    }
  };
  const handelData = async () => {
    try {
      const queryParams = new URLSearchParams({
        userId: currentuserData?._id,
        questionId: questionId,
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
      console.log("dd", data);
      setChatData(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    handelData();
  }, [questionId, currentIndex]);

  useEffect(() => {
    const getChapterData = JSON.parse(localStorage.getItem("chapters"));
    setChapData(getChapterData)
    // return () => {
    //   localStorage.removeItem("chapters")
    // };
  }, []);

  // const submitHandleDecrement = () => {
  //   if (currentIndex > 0) {
  //     const prevIndex = currentIndex - 1;
  //     const prevQuestionId = chapData.questions[prevIndex]._id;
  //     console.log({ prevQuestionId });
  //     findChapterTitle(prevQuestionId);
  //     navigate(`/chat-module/${prevQuestionId}`);
  //     setCurrentIndex(prevIndex);
  //     handelData();
  //   } else {
  //     alert("No more previous questions in this chapter!");
  //   }
  // };

  // const submitHandleIncrement = () => {
  //   console.log("here inc");
  //   if (currentIndex < chapData.questions.length - 1) {
  //     const nextIndex = currentIndex + 1;
  //     const nextQuestionId = chapData.questions[nextIndex]._id;
  //     console.log({ nextQuestionId });
  //     findChapterTitle(nextQuestionId);
  //     navigate(`/chat-module/${nextQuestionId}`);
  //     setCurrentIndex(nextIndex);
  //     handelData();
  //   } else {
  //     alert("No more questions in this chapter!");
  //   }
  // };

  const handleSendGptMessage = () => {
    setIsAIResponding(true); // Set AI responding state to true

    let data;
    if (chatData?.length <= 0) {
      data = {
        senderId: currentuserData?._id,
        receiverId: currentuserData?.assistentId,
        message: prompt,
        questionId: questionId,
        chapterId: chapterId,
        noAi: aiToggle,
      };
    } else {
      const followIndex = chatData[chatData.length - 1];
      data = {
        senderId: currentuserData?._id,
        receiverId: currentuserData?.assistentId,
        message: prompt,
        questionId: questionId,
        chapterId: chapterId,
        followUpId: followIndex?._id,
        noAi: aiToggle,
      };
    }

    socket.emit("sendMessage", { ...data });

    setprompt("");
  };
  const handleVioceStop = (value) => {
    console.log("ahti", value);
    setprompt(value);
  };
  const debouncedUpdateChatData = debounce((newMessage) => {
    setChatData((prevMessages) => [...prevMessages, newMessage.savedAnswer, newMessage.sevedQuestion]);
  }, 300);

  useEffect(() => {
    const handleReceiveMessage = (message) => {
      console.log("socketResponse", message);

      if (!message || !message.savedAnswer || !message.sevedQuestion) {
        toast.error("Invalid Response");
        setIsAIResponding(false);
        return;
      }

      debouncedUpdateChatData(message);
      setIsAIResponding(false);
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, []);
  console.log("socketResponse", chatData);

  useEffect(() => {
    // Check if the length of Messages has increased
    if (chatData.length > previousMessageLength) {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
      setPreviousMessageLength(chatData.length); // Update previousMessageLength
    }
  }, [chatData]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const handleResize = () => {
    setIsExpanded(!isExpanded);
  };
  const handleChange = (e) => {
    setprompt(e.target.value);

    setText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "100%";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  };
  return (
    <div className="rightbar-ar">
      {/* <ToastContainer position="top-center" autoClose={2000} /> */}
      <div className="toggle-sidebar-ar">
        <div className="toggle-head-btn-ar">
          {/* <button className="head-btn-ar active-heading-btn">Op vragen</button> */}
          <button
            onClick={() => navigate("/samplebook")}
            className="head-btn-ar"
          >
            Voorbeeldboek
          </button>
        </div>
      </div>

      <div className="right-hs-ar"></div>
      <div className="right-below-ar">
        <div className="heading-chat-ar">
          <div className="add-back-btn-box">
            <div className="add-back-batn">
              <Link to={`/chapter/${currentuserData?._id}`}>
                <svg enable-background="new 0 0 256 256" height="512" viewBox="0 0 256 256" width="512" xmlns="http://www.w3.org/2000/svg"><g id="_x34_8_Arrow_Left"><path d="m252.983 53v150c0 27.614-22.386 50-50 50h-149.966c-27.614 0-50-22.386-50-50v-150c0-27.614 22.386-50 50-50h149.965c27.615 0 50.001 22.386 50.001 50z" fill="#f39c12" /><g><path d="m201.622 136.625-71.95 21.9v13.5c0 10.625-12.225 16.5-20.5 10l-56.3-44.05c-6.325-4.925-6.525-14.475-.375-19.65 0 0 .175-.175.4-.35l56.275-44.025c8.325-6.475 20.5-.55 20.5 10v13.525l71.95 21.9c8.5 2.6 8.5 14.65 0 17.25z" fill="#fff" /></g></g></svg>
              </Link>
            </div>
            <div className="chap-heading-ar">{findChapterTitle(chatData)}</div>
          </div>

          <div className="chat-ar">
            <div className="inner-chat-ar" >
              {chatData && chatData.length > 0 ? (
                chatData.map((message, index) => {
                  const userId = currentuserData?._id;
                  const isSentByUser = message.senderId === userId;

                  return (
                    <div
                      key={index}
                      className={`chat-container ${
                        isSentByUser ? "sent" : "received"
                      }`
                    }
                    ref={index === chatData.length - 1 ? lastMessageRef : null} 

                    >
                      <div className="chat-bubble">{message.message}</div>
                    </div>
                  );
                })
              ) : (
                <LottiAnimation
                image={bla}
              />

              )}

              {/* Show "AI is responding" indicator */}
              {isAIResponding && (
                <div className="chat-container received">
                  <div className="chat-bubble">
                    <div className="loaderx">
                      <div className="loaderx-square"></div>
                      <div className="loaderx-square"></div>
                      <div className="loaderx-square"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* <div className="inner-chat-ar">
              {chatData &&
                chatData.map((message, index) => {
                  const userId = currentuserData?._id;
                  const isSentByUser = message.senderId === userId;

                  return (
                    <div
                      key={index}
                      className={`chat-container ${isSentByUser ? "sent" : "received"
                        }`}
                    >
                      <div className="chat-bubble">{message.message}</div>
                    </div>
                  );
                })}

            
              {isAIResponding && (
                <div className="chat-container received">
                  <div className="chat-bubble"><div class="loaderx">
                    <div class="loaderx-square"></div>
                    <div class="loaderx-square"></div>
                    <div class="loaderx-square"></div>
                  </div></div>
                </div>
              )}
            </div> */}

            <div className="input-outer-div">
              <div className="input-container" style={{ position: isExpanded ? "absolute" : "relative", height: isExpanded ? "100%" : "70px", }}>
                <button className="resize-btn"
                  onClick={handleResize}
                  style={{
                    position: "absolute",
                    left: "10px",

                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {isExpanded ? (
                    // Minimize Icon
                    <svg enable-background="new 0 0 256 256" height="512" viewBox="0 0 256 256" width="512" xmlns="http://www.w3.org/2000/svg"><g id="_x33_7_Arrow_Up_Down"><path d="m252.983 53v150c0 27.614-22.386 50-50 50h-149.966c-27.614 0-50-22.386-50-50v-150c0-27.614 22.386-50 50-50h149.965c27.615 0 50.001 22.386 50.001 50z" fill="#f08d33" /><g fill="#fff"><path d="m131.223 126.267c6.378 5.623 16.227 5.06 22.424-1.14l32.39-32.39 7.697 7.698c5.388 5.385 14.615 1.325 14.25-6.306l-1.589-33.145c-.297-6.184-5.183-11.072-11.365-11.37l-33.16-1.604c-7.619-.369-11.707 8.853-6.31 14.25l7.69 7.69-32.791 32.791c-6.446 6.45-6.4 17.208.764 23.526zm2.772-19.99 34.558-34.558c.977-.977.977-2.559 0-3.535l-9.458-9.458c-2.123-2.123-.591-5.725 2.338-5.725.063 0 .129 0 .195.005l33.16 1.604c3.597.173 6.439 3.015 6.611 6.614l1.589 33.145c.148 3.075-3.559 4.69-5.72 2.532l-9.464-9.465c-.975-.975-2.557-.978-3.535 0l-34.158 34.158c-4.371 4.368-11.217 4.775-15.582.925-4.983-4.397-4.955-11.823-.534-16.242z" /><path d="m125.542 153.25-32.8 32.8 7.7 7.7c5.275 5.275 1.475 14.25-5.9 14.25h-.425l-33.15-1.625c-6.2-.275-11.075-5.175-11.375-11.35l-1.575-33.15c-.375-7.6 8.825-11.725 14.25-6.3l7.675 7.675 32.4-32.375c6.225-6.225 16.075-6.725 22.425-1.15 7.224 6.375 7.149 17.15.775 23.525z" /></g></g></svg>
                  ) : (
                    // Expand Icon
                    <svg enable-background="new 0 0 256 256" height="512" viewBox="0 0 256 256" width="512" xmlns="http://www.w3.org/2000/svg"><g id="_x33_7_Arrow_Up_Down"><path d="m252.983 53v150c0 27.614-22.386 50-50 50h-149.966c-27.614 0-50-22.386-50-50v-150c0-27.614 22.386-50 50-50h149.965c27.615 0 50.001 22.386 50.001 50z" fill="#f08d33" /><g fill="#fff"><path d="m131.223 126.267c6.378 5.623 16.227 5.06 22.424-1.14l32.39-32.39 7.697 7.698c5.388 5.385 14.615 1.325 14.25-6.306l-1.589-33.145c-.297-6.184-5.183-11.072-11.365-11.37l-33.16-1.604c-7.619-.369-11.707 8.853-6.31 14.25l7.69 7.69-32.791 32.791c-6.446 6.45-6.4 17.208.764 23.526zm2.772-19.99 34.558-34.558c.977-.977.977-2.559 0-3.535l-9.458-9.458c-2.123-2.123-.591-5.725 2.338-5.725.063 0 .129 0 .195.005l33.16 1.604c3.597.173 6.439 3.015 6.611 6.614l1.589 33.145c.148 3.075-3.559 4.69-5.72 2.532l-9.464-9.465c-.975-.975-2.557-.978-3.535 0l-34.158 34.158c-4.371 4.368-11.217 4.775-15.582.925-4.983-4.397-4.955-11.823-.534-16.242z" /><path d="m125.542 153.25-32.8 32.8 7.7 7.7c5.275 5.275 1.475 14.25-5.9 14.25h-.425l-33.15-1.625c-6.2-.275-11.075-5.175-11.375-11.35l-1.575-33.15c-.375-7.6 8.825-11.725 14.25-6.3l7.675 7.675 32.4-32.375c6.225-6.225 16.075-6.725 22.425-1.15 7.224 6.375 7.149 17.15.775 23.525z" /></g></g></svg>
                  )}
                </button>



                <textarea
                  disabled={isAIResponding}
                  type="text"

                  className="message-div-ar"
                  placeholder={
                    isAIResponding ? "Loading..." : "Type your answer"
                  }
                  value={prompt}
                  // onChange={(e) => {
                  //   // if (e.target.value.length <= 120) {
                  //   // }
                  // }}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      prompt.trim() !== "" &&
                      isAIResponding === false
                    ) {
                      handleSendGptMessage();
                      setprompt("");
                    }
                  }}

                  style={{
                    width: "100%",
                    minHeight: "70px",
                    height: isExpanded ? "100%" : "70px",
                    maxHeight: isExpanded ? "100%" : "150px",
                    transition: "0.3s",
                    resize: "none",
                    // overflow: "hidden",
                    top: isExpanded ? "0" : "auto",
                    left: isExpanded ? "0" : "auto",


                  }}
                />


                {!isAIResponding && (
                  <div className="voice-img-div">
                    <AudioRecorder onVoiceStop={handleVioceStop} />

                    {chatData?.length < 3 && (
                      <button
                        className="chat-send-btn-ar"
                        onClick={() => {
                          handleSendGptMessage();
                          setprompt(""); // Clear the input field after sending
                        }}
                      >
                        <BiSolidSend />
                      </button>
                    )}

                    {chatData?.length >= 3 && (
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                        className="chat-send-btn-ar"
                        onClick={() => handleSendGptMessage()}
                      >
                        <BiSolidSend />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

      

          </div>
        </div>

        {/* <div className="btns-div-ar">
          <button className="chat-blow-btn-ar" onClick={submitHandleDecrement}>
            Vorige vraag
          </button>

          <button
            onClick={() => setNoAIToggle(!aiToggle)}
            className={
              aiToggle ? "chat-blow-btn-ar-enabled" : "chat-blow-btn-ar"
            }
          >
            No Ai
          </button>

          <button className="chat-blow-btn-ar" onClick={submitHandleIncrement}>
            Volgende vragen
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default UserChat;