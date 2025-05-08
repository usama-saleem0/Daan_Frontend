import React from "react";
import { Card, Button, Typography } from "antd";
import './ExploreQuestions.css'
const { Title, Text } = Typography;

const AddQuestionCard = ({ question, handleAnswer, handleDraft }) => {
  // Custom styles for the buttons including hover effects
  const primaryButtonStyle = {
    marginTop: 16,
    backgroundColor: "#F39C12",
    transition: "background-color 0.3s ease",
  };

  const secondaryButtonStyle = {
    marginTop: 8,
    borderColor: "#F39C12",
    color: "#000",
    transition: "background-color 0.3s ease, border-color 0.3s ease",
  };

  return (
    <Card
      style={{
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        minHeight:'300px',
        maxHeight:'auto',
      }}
    >
      <Text type="secondary" style={{ textTransform: "uppercase" }}>
        WERKLEVEN
      </Text>
      <Title level={4} style={{ marginTop: 8, minHeight: '100px' }}>
        {question}
      </Title>
      <Button
        type="primary"
        block
        style={primaryButtonStyle}
        onClick={handleAnswer}
        className="answer-button"
      >
        Answer
      </Button>
      <Button
        block
        style={secondaryButtonStyle}
        onClick={handleDraft}
        className="draft-button"
      >
        Add for later
      </Button>
    </Card>
  );
};

export default AddQuestionCard;