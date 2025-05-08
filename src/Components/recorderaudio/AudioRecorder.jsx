import React, { useRef, useState } from "react";

const VoiceRecorder = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const recorderRef = useRef(null);
  const playerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const handleSuccess = (stream) => {
    recorderRef.current.srcObject = stream;
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      chunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/ogg; codecs=opus" });
      const audioURL = URL.createObjectURL(blob);
      setAudioUrl(audioURL);
      chunksRef.current = [];
      stream.getAudioTracks().forEach((track) => track.stop());

      // Pass the audio blob to the parent component
      if (onRecordingComplete) {
        onRecordingComplete(blob);
      }
    };

    recorderRef.current.play();
    mediaRecorder.start();
  };

  const handleError = (error) => {
    console.error("Error accessing media devices:", error);
  };

  const toggleRecording = (e) => {
    e.preventDefault(); // Prevent the default button behavior
    if (isRecording) {
      setIsRecording(false);
      if (recorderRef.current) recorderRef.current.pause();
      if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
    } else {
      setIsRecording(true);
      setAudioUrl("");
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then(handleSuccess)
        .catch(handleError);
    }
  };

  return (
    <div className="main-mic-button">
      <audio ref={recorderRef} muted hidden></audio>
      <audio ref={playerRef} src={audioUrl} controls></audio>
      <button
        type="button" // Add type="button" to prevent form submission
        className="mic-button"
        onClick={toggleRecording}
      >
        {isRecording ? (
          <svg width="50" height="50" viewBox="0 0 24 24" fill="red" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="6" width="12" height="12" rx="2" fill="red"/>
          </svg>
        ) : (
          <svg width="50" height="50" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15C10.3431 15 9 13.6569 9 12V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V12C15 13.6569 13.6569 15 12 15Z" fill="black"/>
            <path d="M5 12H7C7 15.3137 9.68629 18 13 18C16.3137 18 19 15.3137 19 12H21C21 16.4183 17.4183 20 13 20V22H11V20C6.58172 20 3 16.4183 3 12H5Z" fill="black"/>
          </svg>
        )}
      </button>
    </div>
  );
};

export default VoiceRecorder;