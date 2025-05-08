import React, { useState, useRef } from "react";
import { Player } from "@lordicon/react";
import Lottie from "lottie-react";
import animation from "../assets/loder.json";
import pause from "../assets/pause.json";
import ICON from "../assets/ani/wired-lineal-1054-amazon-echo-speaker-hover-pinch.json";
import sideimg from "../../src/assets/memoryimg.jpeg";
import { baseUrl } from "../baseUrl";

const AudioBook = () => {
  const [loading2, setLoading2] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const audioRef = useRef(null);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  const text = `Ah, nou, dat was een dag die ik, eh, nooit zal vergeten. Het is een dag die permanent in mijn geheugen gegrift staat. Don en ik gaven elkaar het jawoord in de St. Clements Kerk in Stamford, net op de grens met Greenwich.`;

  const handlePausePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      handleTextToSpeech();
    }
  };

  const handleTextToSpeech = async () => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      setLoading2(true);
      const response = await fetch(
        `${baseUrl}/text_to_speach_convert?voiceid=${selectedVoice}`,
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
        audioRef.current = audio;
        setIsPlaying(true);
        audio.play();

        audio.onended = () => {
          setIsPlaying(false);
          audioRef.current = null;
        };

        setLoading2(false);
      } else {
        setLoading2(false);
        console.error("Error: ", data.error);
      }
    } catch (error) {
      setLoading2(false);
      console.log(error);
    }
  };

  const maleVoices = [
    { id: "Ryan NL", name: "Peter" },
    { id: "Florian NL", name: "Marcelo" },
    { id: "Remy NL", name: "Richard" },
  ];

  const femaleVoices = [
    { id: "Vivienne NL", name: "Monica" },
    { id: "Ava NL", name: "Linda" }, // Corrected to female ID
    { id: "Seraphina NL", name: "Ingrid" },
  ];

  return (
    <div className="new-sec">
      <div className="new-sec-tital">
        <h2>We handle the writing - but how?</h2>
        <p>
          Our Speech-to-StoryTM technology turns spoken words into written
          stories.
        </p>
      </div>

      <div className="new-box">
        <div className="new-box-img">
          <img src={sideimg} alt="" />
        </div>

        <div className="new-layout">
          <div className="new-layout-box">
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              {selectedGender !== null && (
                <span
                  onClick={() => {
                    setSelectedGender(null);
                    setSelectedVoice(null); // optional
                  }}
                  className="back-icon-box"
                >
                  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <g id="Layer_6" data-name="Layer 6">
                      <path
                        d="m97.7 503.54a1485.25 1485.25 0 0 0 316.6 0c43-5 84.25-46.23 89.24-89.24a1485.25 1485.25 0 0 0 0-316.6c-5-43-46.23-84.25-89.24-89.24a1485.25 1485.25 0 0 0 -316.6 0c-43 5-84.25 46.23-89.24 89.24a1485.25 1485.25 0 0 0 0 316.6c4.99 43.01 46.23 84.25 89.24 89.24z"
                        fill="#f39c12"
                      />
                      <path
                        d="m120.56 400.82c153.63 0 278.17-124.54 278.17-278.16a277.11 277.11 0 0 0 -26.26-118.08 1484.86 1484.86 0 0 0 -274.77 3.88c-43 5-84.25 46.23-89.24 89.24a1484.72 1484.72 0 0 0 -3.62 278 277 277 0 0 0 115.72 25.12z"
                        fill="#f39c12"
                      />
                      <path
                        d="m102.24 228.42 96.88-96.88a39 39 0 0 1 55.15 55.16l-30.27 30.3h158.18a39 39 0 1 1 0 78h-158.18l30.3 30.3a39 39 0 0 1 -55.15 55.16l-96.88-96.88a39 39 0 0 1 0-55.16z"
                        fill="#fff"
                      />
                    </g>
                  </svg>
                </span>
              )}
              <h2 style={{ margin: 0 }}>
                {selectedGender === null
                  ? "SELECT GENDER"
                  : selectedGender === "Male"
                  ? "SELECT MALE VOICE"
                  : "SELECT FEMALE VOICE"}
              </h2>
            </div>

            <div className="new-layout-btn-box">
              {selectedGender === null ? (
                <>
                  <button onClick={() => setSelectedGender("Male")}>
                    Male
                  </button>
                  <button onClick={() => setSelectedGender("Female")}>
                    Female
                  </button>
                </>
              ) : selectedGender === "Male" ? (
                <>
                  {maleVoices.map((voice) => (
                    <button
                      key={voice.id}
                      onClick={() => setSelectedVoice(voice.id)}
                      style={{
                        backgroundColor:
                          selectedVoice === voice.id
                            ? "#f39c12"
                            : "transparent",
                      }}
                    >
                      {voice.name}
                    </button>
                  ))}
                </>
              ) : (
                <>
                  {femaleVoices.map((voice) => (
                    <button
                      key={voice.id}
                      onClick={() => setSelectedVoice(voice.id)}
                      style={{
                        backgroundColor:
                          selectedVoice === voice.id
                            ? "#f39c12"
                            : "transparent",
                      }}
                    >
                      {voice.name}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="new-layout-box">
            <h2>GENERATED TEXT</h2>
            <div className="new-layout-para-box">
              {!loading2 ? (
                <div
                 className="new-flex-box"
                  onClick={handlePausePlay}
                >
                  {!isPlaying ? (
                    <Player size={45} icon={ICON} />
                  ) : (
                    <div style={{ width: "30px" }}>
                      <Lottie animationData={pause} loop={false} />
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ width: "120px" }}>
                  <Lottie animationData={animation} loop={true} />
                </div>
              )}
              <p>
                Ah, nou, dat was een dag die ik, eh, nooit zal vergeten. Het is
                een dag die permanent in mijn geheugen gegrift staat. Don en ik
                gaven elkaar het jawoord in de St. Clements Kerk in Stamford,
                net op de grens met Greenwich.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioBook;
