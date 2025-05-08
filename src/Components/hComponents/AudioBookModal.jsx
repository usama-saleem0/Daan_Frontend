import React, { useState, useEffect } from "react";
import { Button, Modal, Card, Radio, Space, message } from "antd";
import Lottie from "lottie-react";
import animationData from "../../assets/EnhanceBook.json";
import { useDispatch } from "react-redux";
import { setEnhanceBook, incrementstep } from "../../Redux/Features/QuestionsSlice";
import { useSelector } from "react-redux";


// You would import these animations for male and female avatars
import maleAnimationData from "../../assets/male.json"; // Replace with your male Lottie file
import femaleAnimationData from "../../assets/female.json"; // Replace with your female Lottie file
import { baseUrl } from "../../baseUrl";

const AudioBookModal = ({
  open,
  handelCancle,
  handleNextPage,
  showGenderSelection,
  setShowGenderSelection,
  showVoiceSelection,
  setShowVoiceSelection
}) => {
  const enhanceBook = useSelector((state) => state.questionCounter.enhanceBook);

  const [showButtons, setShowButtons] = useState(false);
//   const [showGenderSelection, setShowGenderSelection] = useState(false);
//   const [showVoiceSelection, setShowVoiceSelection] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [voices, setVoices] = useState([]);
  const [voiceId, setVoiceId] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentUsername = JSON.parse(localStorage.getItem("currentuser"))
  const dispatch = useDispatch();

  const maleVoices = [
    { id: "Peter", name: "Peter", },
    { id: "Marcelo", name: "Marcelo", },
    { id: "Wayne", name: "Richard", },
  ];

  const femaleVoices = [
    { id: "Monica", name: "Monica", },
    { id: "Linda", name: "Linda", },
    { id: "Ingrid", name: "Ingrid", },
  ];

  // Function to fetch voices from Eleven Labs API
  const fetchVoices = async (gender) => {
    setLoading(true);
    try {
      // // For now, we'll use our sample data
      const voiceOptions = gender === 'male' ? maleVoices : femaleVoices;
      setVoices(voiceOptions);
    } catch (error) {
      console.error('Error fetching voices:', error);
      message.error('Failed to load voices. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to play voice sample
  const playVoiceSample = async (id, name) => {
    setVoiceId(id)
    const text = `Hello, ${currentUsername?.name}. I am here to assist you. My name is ${name}.`
    const response = await fetch(
      `${baseUrl}/text_to_speach_convert?voiceid=${id}`,
      {
        method: "POST",
        body: JSON.stringify({ text: text }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data.audio) {
      const audio = new Audio(`data:audio/mp3;base64,${data.audio}`);

      audio.play();
    }
  };

  const handleTextDisplayComplete = () => {
    setTimeout(() => {
      setShowButtons(true);
    }, 1000);
  };

  const handleYesClick = () => {
    // Store the user's choice in localStorage
    setShowButtons(false);
    setShowGenderSelection(true);

    dispatch(setEnhanceBook('yes'));

  };
  console.log('enhanceBook Yes HandleYeClick::', enhanceBook);


  const handleGenderSelect = (e) => {
    const gender = e.target.value;
    setSelectedGender(gender);
    localStorage.setItem('selectedGender', gender);

    // Fetch voices based on gender
    fetchVoices(gender);

    setShowGenderSelection(false);
    setShowVoiceSelection(true);
  };

  const handleVoiceSelect = (voiceId) => {
    const value = localStorage.getItem('selectedVoiceId');
    if (value) {
      localStorage.removeItem("selectedVoiceId")
    }

    localStorage.setItem('selectedVoiceId', voiceId);

    // Proceed to the next page
    handelCancle();
  };

  useEffect(() => {  
    handleTextDisplayComplete();
  }, []);

  return (
    <Modal
      title={
        showGenderSelection
          ? "Select Avatar Gender"
          : showVoiceSelection
            ? "Select Voice"
            : "Select Voice"
      }
      open={open}
      onCancel={handelCancle}
      footer={null}
      centered
      width={600}
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {/* Initial screen */}
      {!showGenderSelection && !showVoiceSelection && (
        <div style={{ textAlign: "center" }}>
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ width: 300, height: 300 }}
          />

          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 18, fontWeight: "bold" }}>
              Would you like Test Your Voices?
            </p>
          </div>

          {showButtons && (
            <div>
              <Button
                type="primary"
                style={{ marginRight: 10, backgroundColor: "#D68910" }}
                onClick={handleYesClick}
              >
                Yes
              </Button>
              <Button
                type="default"
                onClick={handelCancle}
                style={{ borderColor: "#D68910", color: "#000" }}
              >
                No
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Gender selection screen */}
      {showGenderSelection && (
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
            <Card
              hoverable
              style={{ width: 200 }}
              onClick={() => setSelectedGender('male')}
              className={selectedGender === 'male' ? 'selected-card' : ''}
            >
              <Lottie
                animationData={maleAnimationData}
                loop={true}
                autoplay={true}
                style={{ width: 150, height: 150 }}
              />
              <p>Male</p>
            </Card>

            <Card
              hoverable
              style={{ width: 200 }}
              onClick={() => setSelectedGender('female')}
              className={selectedGender === 'female' ? 'selected-card' : ''}
            >
              <Lottie
                animationData={femaleAnimationData}
                loop={true}
                autoplay={true}
                style={{ width: 150, height: 150 }}
              />
              <p>Female</p>
            </Card>
          </div>

          <div style={{ marginTop: 20 }}>
            <Radio.Group onChange={handleGenderSelect} value={selectedGender}>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </div>

          <Button
            type="primary"
            style={{ marginTop: 20, backgroundColor: "#D68910" }}
            onClick={() => handleGenderSelect({ target: { value: selectedGender } })}
            disabled={!selectedGender}
          >
            Confirm Selection
          </Button>
        </div>
      )}

      {/* Voice selection screen */}
      {showVoiceSelection && (
        <div>
          <div className="voice-select-heading">
            <Lottie
              animationData={selectedGender === 'male' ? maleAnimationData : femaleAnimationData}
              loop={true}
              autoplay={true}
              style={{ width: 150, height: 150 }}
            />
            <p>
              Select a voice for your {selectedGender} character
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: "center" }}>Loading voices...</div>
          ) : (
            <Space direction="horizontal" style={{ width: '80%', display: 'flex', alignItems: 'center' }}>
              {voices.map((voice) => (
                <Card
                  key={voice.id}
                  hoverable
                  style={{
                    marginBottom: 10,
                    borderColor: selectedVoice === voice.id ? "#D68910" : undefined
                  }}
                  onClick={() => setSelectedVoice(voice.id)}
                >
                  <div className="Voice-select">
                    <h3>{voice.name}</h3>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        playVoiceSample(voice.id, voice.name);
                      }}
                      icon={<span>🔊</span>}
                    />

                  </div>
                </Card>
              ))}
            </Space>
          )}

          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Button
              type="primary"
              style={{ backgroundColor: "#D68910", padding: "20px" }}
              onClick={() => handleVoiceSelect(selectedVoice)}
              disabled={!selectedVoice}
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AudioBookModal;