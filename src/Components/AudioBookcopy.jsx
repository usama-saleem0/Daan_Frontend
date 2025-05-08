import React, { useState, useEffect, useRef } from "react";
import AudioBookModal from './hComponents/AudioBookModal';
import { Player } from "@lordicon/react";
import Lottie from "lottie-react";
import animation from "../assets/loder.json";
import pause from "../assets/pause.json";
import ICON from "../assets/ani/wired-lineal-1054-amazon-echo-speaker-hover-pinch.json"; // Play icon
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../baseUrl";
import sideimg from "../../src/assets/memoryimg.png";

const AudioBookcopy = () => {
    const [showGenderSelection, setShowGenderSelection] = useState(false);
    const [showVoiceSelection, setShowVoiceSelection] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const selectedVoiceId = localStorage.getItem("selectedVoiceId");
    const audioRef = useRef(null);
    const [open, setOpen] = useState(false);
    const currentStep = useSelector((state) => state.questionCounter.activeStep);


    const text = `Audio Book. 
    Every great story starts with a single page. This is yours. 
    Welcome to a journey where imagination knows no limits, and every word holds a world of possibilities. 
    As you turn these pages, prepare to embark on an adventure that will challenge your thoughts, stir your emotions, and leave an imprint on your soul. 
    Take a deep breath, open your mind, and let the story unfold…`;

    const handleNextPage = () => {
        setOpen(true);
    };

    const handelCancle = () => {
        setOpen(false);
        setShowGenderSelection(false);
        setShowVoiceSelection(false);
    };

    const handleTextToSpeech = async () => {
        try {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }

            setLoading2(true);
            const response = await fetch(
                `${baseUrl}/text_to_speach_convert?voiceid=${selectedVoiceId}`,
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

    useEffect(() => {
        if (audioRef.current && currentPlayingAudio !== currentStep) {
            audioRef.current.pause();
            setCurrentPlayingAudio(null);
        }
    }, [currentStep]);

    return (<>
        <div className="section--audio-book">
            <div className="container">
                <div className="audio--book--main">
                    <div className="a5-page2">
                        {!loading2 ? (
                            <div
                                style={{
                                    margin: "0px",
                                    cursor: "pointer",
                                }}
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

                        <h2 className="page-title">Audio Book</h2>
                        <h3 className="page-subtitle">
                            "Every great story starts with a single page. This is yours."
                        </h3>
                        <p className="page-content">
                            Welcome to a journey where imagination knows no limits, and every
                            word holds a world of possibilities. As you turn these pages,
                            prepare to embark on an adventure that will challenge your
                            thoughts, stir your emotions, and leave an imprint on your soul.
                        </p>
                        <p className="page-content">
                            Take a deep breath, open your mind, and let the story unfold…
                        </p>
                    </div>

                    <div className="audiobook-select-voices">
                        <button onClick={handleNextPage}>Choose Audio</button>
                    </div>

                    <AudioBookModal
                        open={open}
                        setOpen={setOpen}
                        handelCancle={handelCancle}
                        handleNextPage={handleNextPage}
                        showGenderSelection={showGenderSelection}
                        setShowGenderSelection={setShowGenderSelection}
                        showVoiceSelection={showVoiceSelection}
                        setShowVoiceSelection={setShowVoiceSelection}
                    />
                </div>
            </div>
        </div>


       
    </>
    );
}

export default AudioBookcopy;