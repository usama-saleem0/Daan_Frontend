import { useState, useEffect } from "react";
import { baseUrl } from "../baseUrl";

const TextToSpeechComponentss = () => {
  const [audioData, setAudioData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(""); // State to store the input text

  const handleTextToSpeech = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${baseUrl}/text_to_speach_convert?voiceid=GPPKLp6DV72rvzWVdp5M`,
        {
          method: "POST",
          body: JSON.stringify({ text: text }), // Send dynamic text from input
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.audio) {
        setAudioData(data.audio);
        setLoading(false);
      } else {
        setLoading(false);
        console.error("Error: ", data.error);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (audioData) {
      const audio = new Audio(`data:audio/mp3;base64,${audioData}`);
      audio.play();
    }
  }, [audioData]);

  return (
    <div>
      {/* Text input field */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)} // Update text state on input change
        placeholder="Enter text for speech"
        disabled={loading}
      />
      <br />
      {/* Button to trigger text-to-speech conversion */}
      <button disabled={loading || !text} onClick={handleTextToSpeech}>
        Convert Text to Speech
      </button>
    </div>
  );
};

export default TextToSpeechComponentss;
