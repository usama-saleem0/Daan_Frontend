import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import 'regenerator-runtime/runtime'; // Add this import

const SpeechToTextComponent = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const handleListen = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  useEffect(() => {
    console.log('Transcript:', transcript);
  }, [transcript]);

  return (
    <div>
      <h1>Speech to Text</h1>
      <button onClick={handleListen}>
        {listening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <button onClick={resetTranscript}>Reset Transcript</button>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default SpeechToTextComponent;
