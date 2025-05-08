import React, { useState } from "react";
import { Button, Modal, Card, Input, message } from "antd";
import Lottie from "lottie-react";
import image from "../../assets/Lottie.json";
import image2 from "../../assets/Animation -1741195038350.json";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { baseUrl } from "../../baseUrl";
import { useNavigate } from "react-router-dom";

const AddQuestionModal = ({
  open,
  handelCancle,
  handleQuestionSubmit,
  questionText,
  setQuestionText,
  chapterId,
}) => {
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  console.log("chapterId", chapterId);
  const navigate = useNavigate();
  const handleAddQuestionClick = () => {
    setIsAddingQuestion(true);
  };

  const handleExploreQuestion = () => {
    navigate("/exploreQuestion", {
      state: { chapterId: chapterId._id },
    });
  };
  return (
    <Modal
      title={<div style={{ textAlign: "center", fontWeight: "bold", fontSize: '20px', fontFamily: " 'Solway', serif" }}>Add a Question</div>}
      open={open}
      onCancel={handelCancle}
      footer={null}
      centered
      width={600}
      backgroun= '#FFFAF0'
      bodyStyle={{ backgroundColor: "#FFFAF0" }}
      style={{ backgroundColor: '#FFFAF0' }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "20px",
        }}
      >
        {/* First Card */}
        <Card
          hoverable
          style={{
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s",
            background: '#FFFAF0'
          }}
          bodyStyle={{
            display: "flex",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <div style={{ width: "30%" }}>
            <Lottie animationData={image} loop={true} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "70%",
            }}
          >
            <div style={{ fontSize: "18px", fontWeight: "600" }}>
              <PlusCircleOutlined style={{ marginRight: "8px" }} />
              Add Your Own Question
            </div>
            <div style={{ color: "#666" }}>
              Create and add your question manually.
            </div>
            {isAddingQuestion ? (
              <>
                <Input.TextArea
                  rows={4}
                  placeholder="Enter your question..."
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  style={{ marginTop: "10px" }}
                />
                <Button
                  className="ModalAddQuestion"
                  onClick={handleQuestionSubmit}
                  style={{ marginTop: "10px", width: "50  %" }}
                >
                  Submit Question
                </Button>
              </>
            ) : (
              <Button
                className="ModalAddQuestion"
                onClick={handleAddQuestionClick}
                style={{ marginTop: "10px", width: "50%" }}
              >
                Add Question
              </Button>
            )}
          </div>
        </Card>

        {/* Second Card */}
        <Card
          hoverable
          style={{
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s",
            background: '#FFFAF0'
          }}
          bodyStyle={{
            display: "flex",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <div style={{ width: "30%" }}>
            <Lottie animationData={image2} loop={true} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "70%",
            }}
          >
            <div style={{ fontSize: "18px", fontWeight: "600" }}>
              <SearchOutlined style={{ marginRight: "8px" }} />
              Explore New Questions
            </div>
            <div style={{ color: "#666" }}>
              Need inspiration? Discover our question library.
            </div>
            <Button
              type="default"
              style={{ marginTop: "10px", width: "50%", padding: "20px" }}
              onClick={handleExploreQuestion}
            >
              Explore Library
            </Button>
          </div>
        </Card>
      </div>
    </Modal>
  );
};

export default AddQuestionModal;
