import React, { useState, useEffect, useRef } from "react";
import { baseUrl } from "../baseUrl";
import voice from "../assets/voice.png";
import ICON3 from "../assets/ani/wired-outline-188-microphone-recording-hover-recording.json";
import { Player } from "@lordicon/react";
import stopvoice from "../assets/stop.png";

const AudioRecorder = ({ onVoiceStop }) => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);
  const playerRef5 = useRef(null);
  const [selectedLanguage, setSelectedLanguage] = useState("nl");
  const [Loader, setLoader] = useState(false);
  

  useEffect(() => {
    if (recording) {
      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [recording]);

  const startRecording = () => {
    console.log("Starting audio recording");
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const recorder = new MediaRecorder(stream);
          setMediaRecorder(recorder);

          const chunks = [];
          recorder.ondataavailable = (event) => {
            chunks.push(event.data);
          };

          recorder.onstop = () => {
            const audioBlob = new Blob(chunks, { type: "audio/wav" });
            const audioURL = URL.createObjectURL(audioBlob);
            setAudioURL(audioURL);
            uploadAudio(audioBlob);
          };

          recorder.start();
          setRecording(true);
          setTimer(0);
        })
        .catch((error) => {
          console.error("Error accessing audio devices:", error);
        });
    } else {
      alert("Audio recording is not supported by your browser.");
    }
  };

  const stopRecording = () => {
    console.log("Stopping audio recording");
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const uploadAudio = (audioBlob) => {
    try {
      setLoader(true);
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.wav");
      formData.append("language", selectedLanguage);

      console.log("Uploading audio file...");
      console.log("Audio blob size:", audioBlob.size);
      console.log("Audio blob type:", audioBlob.type);

      fetch(`${baseUrl}/transcribe`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          console.log("Server response status:", response.status);
          return response.json();
        })
        .then((data) => {
          console.log("Transcription data received:", {
            transcription: data.transcription,
            language: selectedLanguage,
          });
          onVoiceStop(data.transcription);
          console.log("Transcription result:", data.transcription);
        })
        .catch((error) => {
          console.error("Error uploading audio:", {
              message: error.message,
              stack: error.stack,
          });
      })
        .finally(() => {
          setLoader(false);  // Ensure it runs only after fetch completes
      });

  } catch (error) {
      console.error("Error uploading audio:", {
          message: error.message,
          stack: error.stack,
      });
      setLoader(false);  // Handle errors outside fetch
  }
};

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const handleMouseEnter4 = () => {
    playerRef5.current?.playFromBeginning();
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  // Prevent click events on the dropdown from triggering toggleListening
  const handleDropdownClick = (event) => {
    event.stopPropagation(); // Prevent click event from bubbling up to parent
  };

  return (
    <div className="voice-reocd">
      <div
        className={`voice-img ${isListening ? "animate" : ""}`}
        onClick={toggleListening}
      >

        {/* {isListening ? (
          <img src={stopvoice} alt="stop" />
        ) : (
          <div onMouseEnter={handleMouseEnter4} className="record-voice">
            <Player ref={playerRef5} size={25} icon={ICON3} />
            <span>Add voice</span>
          </div>
        )} */}

        {Loader ? (
          <div class="dot-spinner">
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
          <div class="dot-spinner__dot"></div>
      </div>
        ) : (
          isListening ? (
            <img src={stopvoice} alt="stop" />
          ) : (
            <div onMouseEnter={handleMouseEnter4} className="record-voice">
              <Player ref={playerRef5} size={25} icon={ICON3} />
              <span>Add voice</span>
            </div>
          )
        )}

        {/* Language Dropdown - Shown Only on Hover */}
        <div className="language-selection" onClick={handleDropdownClick}>
          <select
            id="language"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            disabled={recording}
          >
            <option value="en">English</option>
            <option value="nl">Dutch</option>
          </select>
        </div>
      </div>

      {recording && (
        <div className="timer">
          <span></span> {formatTime(timer)}
        </div>
      )}

      {audioURL && <audio controls src={audioURL}></audio>}
    </div>
  );
};

export default AudioRecorder;