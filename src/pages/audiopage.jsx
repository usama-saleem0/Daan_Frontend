import React, { useState } from 'react';
import { baseUrl } from '../baseUrl';

const TextToSpeechComponent = () => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const config = {
        languageCode: 'en-US', // Choose the language
        voiceName: 'en-US-Wavenet-D', // Choose the voice
      };

      const response = await fetch(`${baseUrl}/text-to-speech`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, config }),
      });

      const data = await response.json();

      if (data.audioContentBase64) {
        // Convert the base64 audio content to a Blob URL
        const audioBlob = new Blob([new Uint8Array(atob(data.audioContentBase64).split('').map(char => char.charCodeAt(0)))], { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl); // Update the state with the audio URL
      }

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text to convert to speech"
        rows="4"
        cols="50"
      />
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Convert to Speech'}
      </button>

      {audioUrl && (
        <div>
          <p>
          Klik om audio af te spelen:</p>
          <audio controls>
            <source src={audioUrl} type="audio/mp3" />
            
Uw browser ondersteunt het audio-element niet.
          </audio>
        </div>
      )}
    </div>
  );
};

export default TextToSpeechComponent;
