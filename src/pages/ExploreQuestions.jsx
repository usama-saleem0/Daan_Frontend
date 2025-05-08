import React, { useEffect, useState } from "react";
import { Card, Button, Typography, Row, Col } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import AddQuestionCard from "../Components/hComponents/AddQuestionCard";
import { baseUrl } from "../baseUrl";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { BiArrowBack } from "react-icons/bi";
import Header from "../Components/Header";

const { Title, Text } = Typography;

const ExploreQuestions = () => {
  const [question, setQuestions] = useState([]);
  const [questionText2, setQuestionText] = useState("");
  const data = useLocation();
  const chapterdata = data.state;
  const currentUser = JSON.parse(localStorage.getItem("currentuser"));

  const navigate = useNavigate(); // For navigation
  const handleDraft = async (questionText) => {
    if (!questionText) {
      console.log("error");
      toast.error("Please enter a question!");
      return;
    }
    console.log({
      userId: currentUser?._id,
      chapterId: chapterdata?.chapterId,
      question: questionText,
    });
    try {
      const response = await axios.post(`${baseUrl}/add-question-user`, {
        userId: currentUser?._id,
        chapterId: chapterdata?.chapterId,
        question: questionText,
      });
      // console.log("responce",response?.data?.question?._id);
      if (response.status === 200) {
        toast.success(response?.data?.message);
        setQuestionText("");
      } else {
        throw new Error("Failed to add question");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the question.");
    }
  };
  const handleAnswer = async (questionText) => {
    if (!questionText) {
      console.log("error");
      toast.error("Please enter a question!");
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/add-question-user`, {
        userId: currentUser?._id,
        chapterId: chapterdata?.chapterId,
        question: questionText,
      });

      if (response.status === 200) {
        toast.success(response?.data?.message);
        setQuestionText("");
        navigate(`/chat-module/${response?.data?.question?._id}`, {
          state: {
            chatperId: chapterdata?.chapterId,
            questionText: { question: questionText },
            chapterData2: chapterdata,
          },
        });
      }
      if (response?.data?.question?._id) {
      } else {
        throw new Error("Failed to add question");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the question.");
    }
  };
  const getExplorerQuestions = async () => {
    try {
      const response = await axios.get(`${baseUrl}/explorer-questions`); // Fetching data from API
      setQuestions(response?.data?.data); // Updating state with fetched questions
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  useEffect(() => {
    getExplorerQuestions();
  }, []);

  return (
   <>
   <Header/>
   <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      {/* <ToastContai/ner position="top-center" autoClose={1000} /> */}
      {/* Back Button */}
      {/* <Button
        type="text"
        // icon={<LeftOutlined />}
        onClick={() => navigate("/dashboard")}
        style={{ marginBottom: "20px",backgroundColor:"#F39C12" }}
      >
       <LeftOutlined/>
      </Button> */}
      <div className="navigation--site">
            <button className="animated-button" onClick={() => navigate("/dashboard")}
              >
              <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                ></path>
              </svg>
              <span className="text">Ga naar Dashboard
              </span>
              <span className="circle"></span>
              <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                ></path>
              </svg>
            </button>
          </div>

      {/* Title */}
      <Title level={2} style={{ fontWeight: "bold" }}>
        Question Library
      </Title>
      <Text type="secondary">
        Find here the questions proposed by My Life in a Book
      </Text>

      {/* Grid Layout for Cards */}
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        {question?.map((question, index) => (
          <Col xs={24} sm={12} md={8} lg={8} key={index}>
            <AddQuestionCard
              question={question?.question}
              handleAnswer={() => handleAnswer(question?.question)}
              handleDraft={() => handleDraft(question?.question)}
            />
          </Col>
        ))}
      </Row>
    </div>
   </>
  );
};

export default ExploreQuestions;
