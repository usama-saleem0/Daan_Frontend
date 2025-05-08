import React, { useEffect, useRef, useState } from "react";
import voice from "../assets/voice.png";
import attach from "../assets/attachfile.png";

import Chapters from "../Chapters";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidSend } from "react-icons/bi";
import {
  decrement,
  decrementChapter,
  increment,
  incrementChapter,
  incrementQuestionLimit,
  NavigateQuestionNo,
  resetIncrement,
  resetIncrementNextBtn,
  resetQuestionLimit,
  togglemenu,
} from "../Redux/Features/QuestionsSlice";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { socketurl } from "../baseUrl";
import { UserChapterQuestionChat } from "../Redux/Features/UserSlice";
import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";
import VideoQr from "./videoqr";
import AudioRecorder from "./texttospeech";

const Chat1 = ({ Data }) => {
  console.log("chat_DATA",Data);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    dispatch(togglemenu());
  };

  const [yes, setyes] = useState(false);

  const socketRef = useRef(null);
  const lastMessageRef = useRef(null);
  const [previousMessageLength, setPreviousMessageLength] = useState(0);
  const [loading, setLoading] = useState(false);

  const [user_id, setuserId] = useState("ts111");

  const [Messages, setMessages] = useState([]);
  const [prompt, setprompt] = useState("");

  const QuestionLimitNumber = useSelector(
    (state) => state.questionCounter.questionLimit
  );

  const QuestionNumber = useSelector((state) => state.questionCounter.value);

  const ChapterNumber = useSelector(
    (state) => state.questionCounter.changeChapter
  );

  console.log('chapterquestion', ChapterNumber, QuestionNumber);
  const [questionChapterId, setquestionChapterId] = useState(
    `C${ChapterNumber}Q${QuestionNumber}`
  );

  useEffect(() => {
    socketRef.current = io(socketurl);

    socketRef.current.on("get_previous_messages", (previous_messages) => {
      // setMessages((prevmessages)=>[...prevmessages,incomingmessage])

      // console.log("previousmessages",previous_messages)

      setMessages(previous_messages);
      setLoading(false);
      // console.log(previous_messages,Messages)
    });

    socketRef.current.on("chat_message", (incomingmessage) => {
      setMessages((previous_messages) => [
        ...previous_messages,
        incomingmessage,
      ]);
      setLoading(false);
    });

    socketRef.current.on("save_question_answer", (incomingmessage) => {
      // setMessages((previous_messages)=>[...previous_messages,incomingmessage])
      setMessages(incomingmessage);
      setLoading(false);
      console.log(incomingmessage, "REEPONSE SAVE NORMAL QUESTION", Messages);
    });

    socketRef.current.on("save_gpt_answer", (incomingmessage) => {
      setMessages(incomingmessage);
      setLoading(false);
      // setMessages((previous_messages)=>[...previous_messages,incomingmessage])
      console.log(incomingmessage, "REEPONSE SAVE GPT", Messages);
    });

    socketRef.current.on("save_gpt_answerimg", (incomingmessage) => {
      setMessages(incomingmessage);
      setLoading(false);
      // setMessages((previous_messages)=>[...previous_messages,incomingmessage])
      console.log(incomingmessage, "REEPONSE SAVE GPT", Messages);
    });

    // socketRef.current.on('save_question_answer',(incomingmessage)=>{

    //    setyes(!yes)

    // })

    // socketRef.current.on('save_gpt_answer',(incomingmessage)=>{

    //   setyes(!yes)

    // })

    return () => {
      socketRef.current.off("chat_message");
      socketRef.current?.off("previous_messages");
      socketRef.current?.off("save_gpt_answer");
      socketRef.current?.off("save_gpt_answerimg");

      socketRef.current?.off("save_question_answer");
      socketRef?.current.disconnect();
    };
  }, []);

  useEffect(() => {
    const user_id = localStorage.getItem("userId");

    // setuserId('674780aab89e88c59257488d');
    if (user_id && questionChapterId) {
      console.log(questionChapterId, user_id, "TS111");
      socketRef.current.emit("get_previous_messages", {
        user_id,
        questionChapterId,
      });

      // dispatch(UserChapterQuestionChat({ user_id, questionChapterId }))
    }
  }, [user_id, questionChapterId]);

  // useEffect(() => {
  //   console.log("CHECK FINAL CHAP", ChapterNumber)
  //   if (ChapterNumber+1 > 10) {
  //     console.log("vk")
  //     navigate("/samplebook");
  //     dispatch(resetIncrement());
  //   }
  // }, [yes]);

  useEffect(() => {
    // Check if the length of Messages has increased
    if (Messages.length > previousMessageLength) {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
      setPreviousMessageLength(Messages.length); // Update previousMessageLength
    }
  }, [Messages]);

  const submitHandleIncrement = () => {
    setyes(!yes);

    dispatch(increment());

    setquestionChapterId(`C${ChapterNumber}Q${QuestionNumber + 1}`);

    if (QuestionNumber == 9) {
      dispatch(incrementChapter());
      dispatch(resetIncrementNextBtn());
    }
  };

  const submitHandleDecrement = () => {
    setyes(!yes);
    dispatch(decrement());

    setquestionChapterId(`C${ChapterNumber}Q${QuestionNumber - 1}`);
    console.log(QuestionNumber, "QNO");
    if (QuestionNumber == 0) {
      console.log("Here");
      dispatch(decrementChapter());
      // dispatch(resetIncrement())
    }
  };

  const handleSubmitViewQuestionNo = (no) => {
    console.log(no);

    dispatch(NavigateQuestionNo(no));
  };

  const sendMessage = () => {
    console.log(prompt, "PROMPT");
    const Message = {
      user_id,
      gpt_id,
      message: prompt,
    };

    // if(prompt.length>0)
    // {
    socketRef.current.emit("chat_message", Message);
    setprompt("");

    // }
    // else{
    //     alert('Please Enter Input')
    // }
  };

  async function getImageFileObject(imageFile) {
    const file = imageFile.file;

    if (file instanceof Blob || file instanceof File) {
      const uploadPreset = "tixx1a8u";

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/degjqq6vo/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        console.log("Upload successful:", data.url);

        // setprompt(data.url)

        handleSendMessageImg(data.url);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    } else {
      console.error("Invalid image file object");
    }

    console.log({ imageFile });
  }

  // console.log(Data.Questions,"DATA QUESTIONS")

  //   const ChatData=useSelector((state)=>state.auth.UserChapterStoryData)

  // console.log(QuestionLimitNumber,"QUESTION LIMIT NO",Messages,ChatData)

  // const handleCheck =()=>{
  //   console.log("TS HANDLE")
  //   dispatch(UserChapterQuestionChat({ user_id, questionChapterId }))
  //   if(ChatData.length>3){

  //     console.log("here")
  //     handleSendGptMessage()
  //   }
  //   else{
  //     handleSendMessage()
  //     console.log("else")
  //   }

  // }

  const handleSendMessage = () => {
    console.log(
      Data.Questions[QuestionNumber],
      "SEND MESSAGE CONSOLE",
      prompt,
      ChapterNumber
    );

    const userId = localStorage.getItem("userId");

    const Message = {
      userId,
      chapterNumber: ChapterNumber,
      question: {
        question_text: Data.Questions[QuestionNumber],
        answer: prompt,
      },
      questionChapterId: `C${ChapterNumber}Q${QuestionNumber}`,
      message: Data.Questions[QuestionNumber],
      response: prompt,
      LimitNo: QuestionLimitNumber,
    };

    socketRef.current.emit("save_question_answer", Message);
    setprompt("");
    dispatch(incrementQuestionLimit());

    if (QuestionLimitNumber > 4) {
      dispatch(resetQuestionLimit());
    }
  };




  const handleSendMessageImg = (url) => {
    console.log(
      Data.Questions[QuestionNumber],
      "SEND MESSAGE CONSOLESSS",
      url,
      ChapterNumber
    );

    const userId = localStorage.getItem("userId");
    const Message = {
      userId,
      chapterNumber: ChapterNumber,
      question: {
        question_text: Data.Questions[QuestionNumber],
        answer: url,
      },
      questionChapterId: `C${ChapterNumber}Q${QuestionNumber}`,
      message: Data.Questions[QuestionNumber],
      response: url,
      LimitNo: QuestionLimitNumber,
    };


    console.log('message: ', Message)

    socketRef.current.emit("save_gpt_answerimg", Message);
    setprompt("");

  };

  const handleSendGptMessage = () => {
    console.log(
      Data.Questions[QuestionNumber],
      "SEND MESSAGE CONSOLE",
      { promt: prompt },
      ChapterNumber
    );
    const userId = localStorage.getItem("userId");

    const Message = {
      userId,
      chapterNumber: ChapterNumber,
      question: {
        question_text: Data.Questions[QuestionNumber],
        answer: prompt,
      },
      questionChapterId: `C${ChapterNumber}Q${QuestionNumber}`,
      message: Data.Questions[QuestionNumber],
      response: prompt,
      LimitNo: QuestionLimitNumber,
      loading: true,
    };

    if (socketRef.current) {
      socketRef.current.emit("save_gpt_answer", Message);
      setprompt("");
      dispatch(incrementQuestionLimit());

      if (QuestionLimitNumber > 4) {
        dispatch(resetQuestionLimit());
      }
    }
  };

  const handleVioceStop = (value) => {
    console.log('ahti', value);


    setprompt(value);

    // if(Messages.length < 3){

    //   handleSendMessage()

    // }
    // else{
    //   handleSendGptMessage()
    // }
  };

  return (
    <div className="rightbar-ar">
      <div className="toggle-sidebar-ar">
        <label class="hamburger">
          <input id="checkbox" type="checkbox" onClick={toggleMenu} />
          <svg viewBox="0 0 32 32">
            <path
              class="line line-top-bottom"
              d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
            ></path>
            <path class="line" d="M7 16 27 16"></path>
          </svg>
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

      
      {/* <h1>
        QuestioNo:{QuestionNumber}
        ChapterNo:{ChapterNumber}
      </h1> */}
      <div className="right-hs-ar">
        {/* <button>H1 {QuestionNumber}</button>
        <button>H2</button>
        <button>H3</button>
        <button>H4</button>
        <button>H5</button>
        <button>H6</button>
        <button>H7</button>
        <button>H8</button>
        <button>H9   {ChapterNumber}</button>
        <button onClick={submitHandleIncrement}>H10</button> */}

        {/* {Array(10)
          .fill(0)
          .map((e, i) => (
            <button key={i} onClick={() => handleSubmitViewQuestionNo(i)}>
              H{i + 1}
            </button>
          ))} */}
      </div>
      <div className="right-below-ar">
        <div className="heading-chat-ar">
          <div className="chap-heading-ar">
            {Data.Questions[QuestionNumber]}
          </div>
          <div className="chat-ar">
            {/* <div className="inner-chat-ar">   {Messages &&
              Messages.map((message, index) => (
                <div key={index} className="user-chat-ar">
                  <div
                    className="user-chat-ar-div"
                    style={
                      message.type === "Question"
                        ? { marginLeft: "0px" }
                        : { marginRight: "0px", backgroundColor: "#FAD7A0" }
                    }
                  >
                    {message.message}
                  </div>
                </div>
              ))}</div> */}

            <div className="inner-chat-ar">

              
              {Messages &&
                Messages.map((message, index) => (
                  <div key={index} className="user-chat-ar" ref={index === Messages.length - 1 ? lastMessageRef : null}>
                    <div
                      className="user-chat-ar-div"
                      style={
                        message.type === "Question"
                          ? { marginLeft: "0px" }
                          : { marginRight: "0px", backgroundColor: "#FAD7A0" }
                      }
                    >
                      {/\.(jpeg|jpg|gif|png|webp|svg)$/.test(message.message) ? (
                        <img

                          className="chatimage"
                          src={message.message}
                          alt="Message Image"
                          style={{ maxWidth: "300px", minWidth: "300px", borderRadius: "15px", height: "auto" }}
                        />
                      ) : (
                        message.message
                      )}
                    </div>
                  </div>
                ))}
            </div>

            {/* <div className="inner-chat-ar">
              {loading ? (
                <div className="loading-wave">
                  <div className="loading-bar"></div>
                  <div className="loading-bar"></div>
                  <div className="loading-bar"></div>
                  <div className="loading-bar"></div>
                </div>
              ) : (
                Messages.map((message, index) => (
                  <div
                    key={index}
                    className="user-chat-ar"
                    ref={index === Messages.length - 1 ? lastMessageRef : null}
                  >
                    <div
                      className="user-chat-ar-div"
                      style={
                        message.type === "Question"
                          ? { marginLeft: "0px" }
                          : { marginRight: "0px", backgroundColor: "#FAD7A0" }
                      }
                    >
                      {/\.(jpeg|jpg|gif|png|webp|svg)$/.test(message.message) ? (
                        <img
                          className="chatimage"
                          src={message.message}
                          alt="Message"
                          style={{
                            maxWidth: "300px",
                            minWidth: "300px",
                            borderRadius: "15px",
                            height: "auto",
                          }}
                        />
                      ) : (
                        message.message
                      )}
                    </div>
                  </div>
                ))
              )}
            </div> */}

            <div className="input-outer-div">
              <input
                type="text"
                className="message-div-ar"
                placeholder="type your answer"
                value={prompt}
                onChange={(e) => setprompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && prompt.trim() !== "") {
                    handleSendGptMessage(); // Trigger the send message function
                    setprompt(""); // Clear the input field
                  }
                }}
              />

              <div className="voice-img-div">


                <div className="voice-img" style={{ position: "relative" }}>
                  <img src={attach} alt="" />
                  <ImageUploader
                    onFileAdded={(img) => getImageFileObject(img)}
                  />
                </div>

                {/* <div className="voice-img">
                  <img src={voice} alt="" />
                </div> */}
                <AudioRecorder onVoiceStop={  handleVioceStop} />


                {Messages.length < 3 && (
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

                {Messages.length >= 3 && (
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
            </div>
          </div>
        </div>

        <div className="btns-div-ar">
          <button className="chat-blow-btn-ar" onClick={submitHandleDecrement}>
            Vorige vraag
          </button>

          <button className="chat-blow-btn-ar">No Ai</button>
          <VideoQr Data={Data}  />

          {questionChapterId != "C8Q9" && (
            <button
              className="chat-blow-btn-ar"
              onClick={submitHandleIncrement}
            >
              Volgende vragen
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat1;
