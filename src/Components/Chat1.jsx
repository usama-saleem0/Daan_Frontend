import React, { useEffect, useRef, useState } from "react";
import voice from "../assets/voice.png";
import Chapters from "../Chapters";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidSend } from "react-icons/bi";
import {
  decrement,
  decrementChapter,
  increment,
  incrementChapter,
  NavigateQuestionNo,
  resetIncrement,
} from "../Redux/Features/QuestionsSlice";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { socketurl } from "../baseUrl";

const Chat1 = ({ Data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const socketRef = useRef(null);
  const [user_id, setuserId] = useState("ts123");

  const [Messages, setMessages] = useState([]);
  const [prompt, setprompt] = useState("");

  const QuestionNumber = useSelector((state) => state.questionCounter.value);

  const ChapterNumber = useSelector(
    (state) => state.questionCounter.changeChapter
  );
  const [questionChapterId, setquestionChapterId] = useState(
    `CHQ${ChapterNumber}${QuestionNumber}`
  );

  useEffect(() => {
    socketRef.current = io(socketurl);

    socketRef.current.on("get_previous_messages", (previous_messages) => {
      // setMessages((prevmessages)=>[...prevmessages,incomingmessage])

      // console.log("previousmessages",previous_messages)

      setMessages(previous_messages);
      // console.log(previous_messages,Messages)
    });

    socketRef.current.on("chat_message", (incomingmessage) => {
      setMessages((previous_messages) => [
        ...previous_messages,
        incomingmessage,
      ]);
    });

    socketRef.current.on("save_question_answer", (incomingmessage) => {
      // console.log(incomingmessage,"REEPONSE")

      setMessages((previous_messages) => [
        ...previous_messages,
        incomingmessage,
      ]);
    });

    return () => {
      socketRef.current?.off("previous_messages");
      socketRef?.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (user_id && questionChapterId) {
      console.log(questionChapterId, user_id, "TS");
      socketRef.current.emit("get_previous_messages", {
        user_id,
        questionChapterId,
      });
    }
  }, [user_id, questionChapterId]);

  useEffect(() => {
    if (ChapterNumber > 10) {
      navigate("/samplebook");
      dispatch(resetIncrement());
    }
  }, [ChapterNumber]);

  const submitHandleIncrement = () => {
    dispatch(increment());

    setquestionChapterId(`CHQ${ChapterNumber}${QuestionNumber + 1}`);

    if (QuestionNumber == 9) {
      dispatch(incrementChapter());
      dispatch(resetIncrement());
    }
  };

  const submitHandleDecrement = () => {
    dispatch(decrement());
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

  // console.log(Data.Questions,"DATA QUESTIONS")

  const handleSendMessage = () => {
    console.log(Data.Questions[QuestionNumber], "SEND MESSAGE CONSOLE", prompt);

    const Message = {
      userId: "ts123",
      chapterNumber: ChapterNumber,
      question: {
        question_text: Data.Questions[QuestionNumber],
        answer: prompt,
      },
      questionChapterId: `CHQ${ChapterNumber}${QuestionNumber}`,
      message: Data.Questions[QuestionNumber],
      response: prompt,
    };

    socketRef.current.emit("save_question_answer", Message);
    setprompt("");
  };

  return (
    <div className="rightbar-ar">
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

        {Array(10)
          .fill(0)
          .map((e, i) => (
            <button key={i} onClick={() => handleSubmitViewQuestionNo(i)}>
              H{i + 1}
            </button>
          ))}
      </div>
      <div className="right-below-ar">
        <div className="chap-heading-ar">{Data.Questions[QuestionNumber]}</div>
        <div className="chat-message-btn-div-ar">
          <div className="chat-ar">
            <div className="user-chat-ar">
              <div style={{ marginLeft: "0px" }} className="user-chat-ar-div">
                The Internet is very painful The Internet is very painful The
                Internet is very painful The Internet is very painful
              </div>
            </div>

            <div className="user-chat-ar">
              <div
                style={{ marginRight: "0px", backgroundColor: "#FAD7A0" }}
                className="user-chat-ar-div"
              >
                The Internet is very painful The Internet is very painfulThe
                Internet is very painfulThe Internet is very painful
              </div>
            </div>
            <div className="user-chat-ar">
              <div
                style={{ marginRight: "0px", backgroundColor: "#FAD7A0" }}
                className="user-chat-ar-div"
              >
                The Internet is very painful The Internet is very painfulThe
                Internet is very painfulThe Internet is very painful
              </div>
            </div>
            <div className="user-chat-ar">
              <div
                style={{ marginRight: "0px", backgroundColor: "#FAD7A0" }}
                className="user-chat-ar-div"
              >
                The Internet is very painful The Internet is very painfulThe
                Internet is very painfulThe Internet is very painful
              </div>
            </div>
            <div className="user-chat-ar">
              <div
                style={{ marginRight: "0px", backgroundColor: "#FAD7A0" }}
                className="user-chat-ar-div"
              >
                The Internet is very painful The Internet is very painfulThe
                Internet is very painfulThe Internet is very painful
              </div>
            </div>
            <div className="user-chat-ar">
              <div
                style={{ marginRight: "0px", backgroundColor: "#FAD7A0" }}
                className="user-chat-ar-div"
              >
                The Internet is very painful The Internet is very painfulThe
                Internet is very painfulThe Internet is very painful
              </div>
            </div>
            <div className="user-chat-ar">
              <div
                style={{ marginRight: "0px", backgroundColor: "#FAD7A0" }}
                className="user-chat-ar-div"
              >
                The Internet is very painful The Internet is very painfulThe
                Internet is very painfulThe Internet is very painful
              </div>
            </div>
            <div className="user-chat-ar">
              <div
                style={{ marginRight: "0px", backgroundColor: "#FAD7A0" }}
                className="user-chat-ar-div"
              >
                The Internet is very painful The Internet is very painfulThe
                Internet is very painfulThe Internet is very painful
              </div>
            </div>
          </div>
          <div className="input-outer-div">
            <input
              type="text"
              className="message-div-ar"
              placeholder="Enter"
              onChange={(e) => setprompt(e.target.value)}
            />
            <div className="voice-img-div">
              <div className="voice-img">
                <img src={voice} alt="" />
              </div>

              <button
                className="chat-send-btn-ar"
                onClick={() => handleSendMessage()}
              >
                <BiSolidSend />
              </button>
            </div>
          </div>

          <div className="btns-div-ar">
            <button
              className="chat-blow-btn-ar"
              onClick={submitHandleDecrement}
            >
              Previous Question
            </button>
            <button className="chat-blow-btn-ar">Upload Images</button>
            <button className="chat-blow-btn-ar">No Ai</button>

            {ChapterNumber <= 10 && (
              <button
                className="chat-blow-btn-ar"
                onClick={submitHandleIncrement}
              >
                Next Questions
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat1;
