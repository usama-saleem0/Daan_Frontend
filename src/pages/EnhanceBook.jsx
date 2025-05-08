import React, { useState, useEffect, useRef } from "react";
import { baseUrl } from "../baseUrl";
import "../../src/PreviewBook.css"; // Add a CSS file for styling
import { textToSpeech } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementstep,
  decrementstep,
  setSelectedOption,
} from "../Redux/Features/QuestionsSlice";
import ArrowRightIcon from "../svgsIcons/ArrowRightIcon copy";
import Lodersvg from "../Components/hComponents/Lodersvg";
import ArrowLeftIcon from "../svgsIcons/ArrowLeftIcon";
import { Player } from "@lordicon/react";
import Lottie from "lottie-react";
import ICON from "../assets/ani/wired-lineal-1054-amazon-echo-speaker-hover-pinch.json"; // Play icon
import animation from "../assets/loder.json";
import pause from "../assets/pause.json";
import Scroll_Top from "../Components/Scroll_Top";
import MyDocument from "../Components/MyDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocumentEnhace from "../Components/MyDocumentEnhace";
import Simple_Story_Reader from "../Components/Simple_Story_Reader";
import newtree from "../../src/assets/newtree.png";

const EnhanceBook = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [bookData, setBookData] = useState([]);
  const [OurStoryData, setOurStoryData] = useState([]);
  const [currentStory, setCurrentStory] = useState(null);
  const pageRefs = useRef([]);
  const flatMessagesRef = useRef([]);
  const [treeData, setTreeData] = useState([]);

  const [chapterTitles, setChapterTitles] = useState({}); // Store chapter titles by ID
  const [loading2, setLoading2] = useState(false);
  const [currentPlayingAudio, setCurrentPlayingAudio] = useState(null); // Track currently playing audio
  const audioRef = useRef(null); // Ref to store the current audio instance
  const topRef = useRef(null);
  const footerRef = useRef(null);
  const currentStep = useSelector((state) => state.questionCounter.activeStep);
  const currentUser = JSON.parse(localStorage.getItem("currentuser"));
  const selectedVoiceId = localStorage.getItem("selectedVoiceId");
  const [groupedData, setGroupedData] = useState({});

  // console.log({ selectedVoiceId });
  // Fetch book data from the API

  const groupDataByChaptersAndQuestions = (data) => {
    const groupedData = {};

    data.forEach((story) => {
      const chapterId = story.chapterId._id;
      const questionId = story.questionId._id;

      if (!groupedData[chapterId]) {
        groupedData[chapterId] = {
          chapterTitle: story.chapterId.chapterTitle,
          chapterImage: story.chapterId.chapterImage,
          questions: {},
        };
      }

      if (!groupedData[chapterId].questions[questionId]) {
        groupedData[chapterId].questions[questionId] = {
          questionText: story.questionId.question,
          messages: [],
        };
      }

      groupedData[chapterId].questions[questionId].messages.push(
        ...story.messages
      );
    });

    return groupedData;
  };
  async function postData() {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/get-stories-enchaced`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser?._id,
        }),
      });
      const data = await response.json();
      setLoading(false);
      setBookData(data); // Assuming the API response has a `chapters` key
      setTreeData(data?.treeData?.storyData);


      setGroupedData(groupDataByChaptersAndQuestions(data.data)); // Group the data
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  }

  // Fetch chapter titles and store them in state
  useEffect(() => {
    const fetchChapterTitles = async () => {
      const titles = {};
      for (const story of bookData?.data || []) {
        if (!titles[story.chapterId]) {
          const title = await getChapterName(story.chapterId);
          titles[story.chapterId] = title;
        }
      }
      setChapterTitles(titles);
    };

    if (bookData?.data) {
      fetchChapterTitles();
    }
  }, [bookData]);
  console.log(chapterTitles, "chapterTitles");

  // const getChapterName = async (id) => {
  //   try {
  //     const response = await fetch(`${baseUrl}/get-stories-id/${id}`, {
  //       method: "GET",
  //     });
  //     const data = await response.json();
  //     return data?.data?.chapterTitle;
  //   } catch (error) {
  //     console.log(error);
  //     return "Unknown Chapter";
  //   }
  // };

  const handleTextToSpeech = async (text, messageId) => {
    try {
      // If an audio is already playing, stop it
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
        setCurrentPlayingAudio(null); // Reset the currently playing audio
      }

      setLoading2(true);
      const response = await fetch(
        `${baseUrl}/text_to_speach_convert?voiceid=${selectedVoiceId}`,
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
        const audio = new Audio(`data:audio/mp3;base64,${data.audio}`);
        audioRef.current = audio; // Store the audio instance
        setCurrentPlayingAudio(messageId); // Set the currently playing audio ID
        audio.play();

        // Handle audio end event
        audio.onended = () => {
          setCurrentPlayingAudio(null); // Reset when audio ends
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

  const handlePausePlay = (messageId) => {
    if (audioRef.current) {
      if (currentPlayingAudio === messageId) {
        // If the clicked audio is already playing, pause it
        audioRef.current.pause();
        setCurrentPlayingAudio(null);
      } else {
        // If a different audio is clicked, stop the current one and play the new one
        audioRef.current.pause();
        audioRef.current = null;
        setCurrentPlayingAudio(null);
        handleTextToSpeech(
          bookData.data
            .find((story) =>
              story.messages.find((msg) => msg._id === messageId)
            )
            .messages.find((msg) => msg._id === messageId).message,
          messageId
        );
      }
    }
  };

  useEffect(() => {
    postData();
    MyStoryData();
  }, []);

  useEffect(() => {
    if (audioRef.current && currentPlayingAudio !== currentStep) {
      audioRef.current.pause();
      setCurrentPlayingAudio(null);
    }
  }, [currentStep]);

  async function MyStoryData() {
    try {
      const response = await fetch(`${baseUrl}/get-stories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser?._id,
        }),
      });
      const data = await response.json();
      setOurStoryData(data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  let globalMessageIndex = 0;

  useEffect(() => {
    console.log(bookData, "bookData 123");
    console.log(bookData.data, "bookData.data 123");
    console.log(pageRefs.current.length, "pageRefs.current.length 123");
    console.log(OurStoryData, "OurStoryData 123");

    if (
      !bookData ||
      !bookData.data ||
      !pageRefs.current.length ||
      !OurStoryData
    )
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        console.log(
          "👁 Entries:",
          visibleEntries.map((e) => ({
            index: pageRefs.current.findIndex((ref) => ref === e.target),
            ratio: e.intersectionRatio,
            visible: e.isIntersecting,
          }))
        );

        const visibleEntry = visibleEntries.sort(
          (a, b) => b.intersectionRatio - a.intersectionRatio
        )[0];

        if (visibleEntry) {
          const index = pageRefs.current.findIndex(
            (ref) => ref === visibleEntry.target
          );
          const currentVisibleStory = flatMessagesRef.current[index]; // { question, text, messageIndex }

          if (currentVisibleStory) {
            // Find a matching story in OurStoryData based on the question
            let matchingStory = null;
            let matchingMessage = null;

            for (const story of OurStoryData) {
              const chapterId = story?.chapterId?._id;
              console.log("chapterId", chapterId);
              const questionId = story?.questionId?._id;
              console.log("questionId", questionId);
              const storyQuestion = story?.questionId?.question;
              if (storyQuestion === currentVisibleStory.question) {
                // Use the messageIndex to select the corresponding message
                const messageIndex = currentVisibleStory.messageIndex;
                console.log("Message Index:", messageIndex);
                console.log(
                  "Available Messages:",
                  story?.messages?.map((msg) => msg.message)
                );
                matchingMessage = story?.messages?.[messageIndex];
                console.log("Selected Message:", matchingMessage);
                if (matchingMessage) {
                  matchingStory = story;
                  break;
                }
              }
            }

            if (matchingStory && matchingMessage) {
              const newStory = {
                message: matchingMessage?.message, // Set to the original user-provided message
                text: currentVisibleStory.text, // Keep the AI-generated response as text
                originalQuestion: matchingStory?.questionId?.question, // Store the actual question
                questionId: matchingStory?.questionId?._id,
                chapterId: matchingStory?.chapterId?._id,
                images: matchingMessage?.images || [],
                videos: matchingMessage?.videos || [],
                originalStory: matchingStory,
                originalMessage: matchingMessage,
              };
              console.log("Setting currentStory:", newStory);
              setCurrentStory(newStory);
            } else {
              // Fallback to currentVisibleStory if no match is found
              setCurrentStory({
                question: currentVisibleStory.text, // Use the AI-generated text as the question in the fallback
                text: currentVisibleStory.text,
                originalQuestion: currentVisibleStory.question,
                images: [],
                videos: [],
              });
            }
          }
        }
      },
      { threshold: 0.6 }
    );

    pageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      pageRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [bookData, OurStoryData, globalMessageIndex]);

  const handleOptionSelect = (option) => {
    localStorage.setItem("storyPreference", option);
    dispatch(incrementstep(2));
    // Dispatch the selected option to Redux store
    dispatch(setSelectedOption(option)); // Redux action to update global state
  };
  let lastRenderedChapterId = null; // outside of map

  return (
    <>
      {loading ? (
        <div className="loader">
          <Lodersvg />
        </div>
      ) : (
        <div className="enhance-section">
          <div className="preview-book">
            <div className="navigation--site">
              <button
                className="animated-button"
                onClick={() => dispatch(decrementstep())}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="arr-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
                <span className="text">Terug naar Bekijk verhalen</span>
                <span className="circle"></span>
                <svg
                  viewBox="0 0 24 24"
                  className="arr-1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
              </button>
              <button
                className="animated-button"
                onClick={() => dispatch(incrementstep(2))}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="arr-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
                <span className="text">Move to Laatste controle</span>
                <span className="circle"></span>
                <svg
                  viewBox="0 0 24 24"
                  className="arr-1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
              </button>
            </div>
            <div className="a5-container" ref={topRef}>
              {/* <div className="a5-page2" ref={footerRef}>
                <h2 className="page-title">Enhanced Book</h2>
                <h3 className="page-subtitle">
                  "Every great story starts with a single page. This is yours."
                </h3>
                <p className="page-content">
                  Welcome to a journey where imagination knows no limits, and
                  every word holds a world of possibilities. As you turn these
                  pages, prepare to embark on an adventure that will challenge
                  your thoughts, stir your emotions, and leave an imprint on
                  your soul.
                </p>
                <p className="page-content">
                  Take a deep breath, open your mind, and let the story unfold…
                </p>
                <div className="page-footer">Chapter 1 • Your Life</div>
              </div> */}

              {Object.keys(groupedData).map((chapterId, index) => {
                const chapter = groupedData[chapterId];
                
                return (
                  <div key={index}>
                    <div key={index} className="a5-page">
                      <h1 className="mock-heading">{chapter.chapterTitle}</h1>
                      {chapter.chapterTitle !== "Stamboom" && (
                        <img src={chapter?.chapterImage} />
                      )}

                      {chapter.chapterTitle === "Stamboom" && (
                        <div className="tree" ref={footerRef}>
                        <ul>
                          <li className="no-top1">
                            <ul>
                              <li>
                                <div className="box">{treeData.dadGrandfather}</div>
                              </li>
                              <li>
                                <div className="box">{treeData.dadGrandMother}</div>
                              </li>
                              <li>
                                <div className="box">{treeData.momGrandfather}</div>
                              </li>
                              <li>
                                <div className="box">{treeData.momGrandMother}</div>
                              </li>
                            </ul>
                          </li>
                      
                          <li className="no-top2">
                            <ul>
                              <li>
                                <div className="box">{treeData.grandfather}</div>
                              </li>
                              <li>
                                <div className="box">{treeData.grandMother}</div>
                              </li>
                            </ul>
                          </li>
                      
                          <li className="no-top2">
                            <ul>
                              <li>
                                <div className="box">{treeData.father}</div>
                              </li>
                              <li>
                                <div className="box">{treeData.mother}</div>
                              </li>
                              <li>
                                <div className="box">{treeData.uncle1}</div>
                              </li>
                              <li>
                                <div className="box">{treeData.aunt1}</div>
                              </li>
                              <li>
                                <div className="box">{treeData.uncle2}</div>
                              </li>
                              <li>
                                <div className="box">{treeData.aunt2}</div>
                              </li>
                            </ul>
                          </li>
                      
                          <li className="no-top2">
                            <ul>
                             
                              <li>
                                <div className="box">{treeData.brother}</div>
                              </li>
                              <li>
                                <div className="box">{treeData.sister}</div>
                              </li>
                              <li>
                                <div className="box">{treeData.me}</div>
                              </li>
                              <li>
                                <div className="box">{treeData.wife}</div>
                              </li>
                              <li>
                                <div className="box">{treeData.cousin1}</div>
                              </li>
                              <li>
                                <div className="box">{treeData.cousin2}</div>
                              </li>
                             
                            </ul>
                          </li>
                      
                          <li className="no-top1 no-top-new">
                            <ul>
                              <li>
                                <div className="box">{treeData.child1}</div>
                              </li>
                              <li>
                                <div className="box">{treeData.child2}</div>
                              </li>
                              <li>
                                <div className="box">{treeData.child3}</div>
                              </li>
                              <li>
                                <div className="box">{treeData.child4}</div>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                      )}
                    </div>

                    {Object.keys(chapter.questions).map((questionId) => {
                      const question = chapter.questions[questionId];

                      return (
                        <div key={questionId}>
                          {question.messages.map((message, messageIndex) => {
                            // Only display the question text for the first message of each question
                            const currentIndex = globalMessageIndex++;
                             flatMessagesRef.current[currentIndex] = {
                        question: question?.questionText,
                        text: message?.message,
                        messageIndex,
                      };

                            const prefenses =
                              localStorage.getItem("storyPreference");
                            // Only display the question text for the first message of each question
                            const showQuestionText = false;
                            console.log("hMessgaes", message);
                            return (
                              <div
                                key={message._id}
                                className="a5-page"
                                ref={(el) =>
                                  (pageRefs.current[currentIndex] = el)
                                }
                              >
                                {showQuestionText && (
                                  <div className="question-text">
                                    <p
                                      style={{
                                        fontWeight: "bold",
                                        textAlign: "center",
                                      }}
                                    >
                                      {question.questionText}
                                    </p>
                                  </div>
                                )}

                                <div className="text-content">
                                  <p>{message.message}</p>
                                </div>

                                {message.images &&
                                  message.images.length > 0 && (
                                    <div className="image-content">
                                      {message.images.map(
                                        (image, imageIndex) => (
                                          <>
                                          <img
                                            key={imageIndex}
                                            src={image}
                                            alt={`Image ${imageIndex + 1}`}
                                            className="message-image"
                                          />
                                          <p style={{textAlign:"center"}}>{message?.title && message?.title}</p>
                                          </>
                                        )
                                      )}
                                    </div>
                                  )}

                                {message.videos &&
                                  message.videos.length > 0 && (
                                    <div className="video-content">
                                      {message.videos.map(
                                        (video, videoIndex) => (
                                          <div
                                            key={videoIndex}
                                            className="video-wrapper"
                                          >
                                            <a
                                              href={video}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              Watch Video {videoIndex + 1}
                                            </a>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                );
              })} 

              {/* {bookData?.data?.map((story, storyIndex) => {
                const chapterId = story.chapterId;
                // const chapter = chapterTitles[chapterId];
                const chapter = groupedData[chapterId?._id];

                const showChapterHeading = chapterId !== lastRenderedChapterId;
                if (showChapterHeading) {
                  lastRenderedChapterId = chapterId;
                }
                console.log(groupedData, "groupedData");

                return (
                  <div key={story._id}>
                    <div  className="a5-page">
                      <h1 className="mock-heading">{chapter.chapterTitle}</h1>
                      {chapter.chapterTitle !== "Stamboom" && (
                        <img src={chapter?.chapterImage} />
                      )}

                      {chapter.chapterTitle === "Stamboom" && (
                        <div className="family-name-box">
                          <img
                            src={
                              chapter.chapterTitle === "Stamboom"
                                ? newtree
                                : chapter?.chapterImage
                            }
                            alt={chapter?.chapterImage}
                            width={"100%"}
                            height={"100%"}
                          />
                          <div className="family-name-list">
                            {treeData?.map((name, i) => (
                              <h6 className={`n-${i + 1}`}>{name}</h6>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {story?.messages?.map((message, messageIndex) => {
                      const currentIndex = globalMessageIndex++;
                      flatMessagesRef.current[currentIndex] = {
                        question: story?.questionId?.question,
                        text: message?.message,
                        messageIndex,
                      };

                      // Only render chapter title when it hasn't been rendered yet for this chapterId

                      return (
                        <div
                          key={message?._id}
                          className="a5-page"
                          ref={(el) => (pageRefs.current[currentIndex] = el)}
                        >
                          Message
                          {message.message && (
                            <div className="text-content">
                              <p>{message.message}</p>
                            </div>
                          )}
                          Images
                          {message?.images?.length > 0 && (
                            <div className="image-content">
                              {message.images.map((image, imageIndex) => (
                                <img
                                  key={imageIndex}
                                  src={image}
                                  alt={`Image ${imageIndex + 1}`}
                                  className="message-image"
                                />
                              ))}
                            </div>
                          )}
                          Videos
                          {message?.videos?.length > 0 && (
                            <div className="video-content">
                              {message.videos.map((video, videoIndex) => (
                                <div key={videoIndex} className="video-wrapper">
                                  <a
                                    href={video}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Watch Video {videoIndex + 1}
                                  </a>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })} */}

              <Scroll_Top topRef={topRef} footerRef={footerRef}  />
            </div>
          </div>

          <div className="simple-story-box">
            <div className="modal-Preference-box">
              <div className="Preference-box-tital">
                <h2>Selecteer uw voorkeur</h2>
                <p>Wat wilt u kiezen?</p>
              </div>
              <div className="Preference-box-btn">
                <button onClick={() => handleOptionSelect("ownStories")}>
                  1. Je eigen verhalen
                </button>
                <button onClick={() => handleOptionSelect("enhancedStories")}>
                  2. Verbeterde verhalen
                </button>
              </div>
            </div>

            <div className="simple-story-wrapper">
              <Simple_Story_Reader
                questionId={currentStory?.questionId}
                chapterId={currentStory?.chapterId}
                questionText={currentStory?.originalQuestion}
                text={currentStory?.message}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EnhanceBook;
