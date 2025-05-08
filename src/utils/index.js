import { baseUrl } from "../baseUrl";

/**
 * Converts text to speech using the provided voiceId and plays the resulting audio.
 *
 * @param {Object} options - The options object.
 * @param {string} options.text - The text to convert to speech.
 * @param {string} options.voiceId - The voice ID to use for conversion.
 * @returns {Promise<HTMLAudioElement>} - A promise that resolves with the audio element once playback starts.
 *
 * @example
 * textToSpeech({ text: "Hello world!", voiceId: "GPPKLp6DV72rvzWVdp5M" })
 *   .then(audio => console.log("Audio is playing", audio))
 *   .catch(error => console.error("Error converting text to speech:", error));
 */
export async function textToSpeech( text, voiceId ) {
  try {
    const response = await fetch(
      `${baseUrl}/text_to_speach_convert?voiceid=${voiceId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }
    );

    const data = await response.json();

    if (data.audio) {
      const audio = new Audio(`data:audio/mp3;base64,${data.audio}`);
      // Optionally, you can return the audio object for further manipulation.
      audio.play();
      return audio;
    } else {
      throw new Error(data.error || "No audio data returned.");
    }
  } catch (error) {
    console.error("Error in textToSpeech:", error);
    throw error;
  }
}
