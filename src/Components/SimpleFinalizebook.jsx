import React, { useState, useEffect, useRef } from "react";
import { baseUrl } from "../baseUrl";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../../src/PreviewBook.css"; // Add a CSS file for styling
import { textToSpeech } from "../utils";
import Lodersvg from "./hComponents/Lodersvg";
import { useDispatch, useSelector } from "react-redux";
import { incrementstep, decrementstep } from "../Redux/Features/QuestionsSlice";
import ArrowRightIcon from "../svgsIcons/ArrowRightIcon copy";
import { Player } from "@lordicon/react";
import Lottie from "lottie-react";
import ICON from "../assets/ani/wired-lineal-1054-amazon-echo-speaker-hover-pinch.json"; // Play icon
import LottiAnimation from "./LottiAnimation";
import animation from "../assets/loder.json";
import pause from "../assets/pause.json";
import PriviewBookModal from "./hComponents/PriviewBookModal";
import SendBookToPrint from "./SendBookToPrint";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./MyDocument";
import newtree from "../../src/assets/newtree.png";
import Scroll_Top from "./Scroll_Top";

const calculatePageRanges = (groupedData) => {
  let currentPage = 3; // Starting after the cover pages (2 pages) + table of contents (1 page)
  const pageRanges = {};

  // Add table of contents page
  pageRanges["toc"] = { start: 1, end: 1 };

  // Add initial pages (cover pages)
  pageRanges["cover"] = { start: 2, end: 2 };

  // Calculate for each chapter
  Object.keys(groupedData).forEach((chapterId) => {
    const chapter = groupedData[chapterId];
    const startPage = currentPage + 1; // +1 because we haven't added this chapter yet

    // Count pages for this chapter:
    // 1 for the chapter title page
    let chapterPages = 1;

    // Add pages for each question's messages
    Object.keys(chapter.questions).forEach((questionId) => {
      const question = chapter.questions[questionId];
      chapterPages += question.messages.length; // Each message is on its own page
    });

    pageRanges[chapterId] = {
      chapterTitle: chapter.chapterTitle,
      start: startPage,
      end: startPage + chapterPages - 1,
    };

    currentPage += chapterPages;
  });

  return pageRanges;
};

const SimpleFinalizebook = () => {
  const dispatch = useDispatch();
  const activeStep = useSelector((state) => state.questionCounter.activeStep);
  const playerRef1 = useRef(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [bookData, setBookData] = useState([]);
  const [treeData, setTreeData] = useState([]);

  const [groupedData, setGroupedData] = useState({});
  const [audioData, setAudioData] = useState(null);
  const [currentPlayingAudio, setCurrentPlayingAudio] = useState(null); // Track currently playing audio
  const audioRef = useRef(null); // Ref to store the current audio instance
  const coverImage = localStorage.getItem("image");
  const writtenBy = localStorage.getItem("title");
  const topRef = useRef(null);

  const footerRef = useRef(null);
  let pageCounter = 1; // outside JSX, right before return or inside the render

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
        `${baseUrl}/text_to_speach_convert?voiceid=knUWHodoipmgsRaryK5T`,
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
          groupedData[chapterId].questions[questionId].messages.find(
            (msg) => msg._id === messageId
          ).message,
          messageId
        );
      }
    }
  };

  useEffect(() => {
    if (audioData) {
      const audio = new Audio(`data:audio/mp3;base64,${audioData}`);
      audio.play();
    }
  }, [audioData]);

  const currentUser = JSON.parse(localStorage.getItem("currentuser"));
  const bookRef = useRef(null);

  // Fetch book data from the API
  async function postData() {
    try {
      setLoading(true);
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
      setLoading(false);
      setTreeData(data?.treeData?.storyData);

      setBookData(data.data); // Assuming the API response has a `data` key
      setGroupedData(groupDataByChaptersAndQuestions(data.data)); // Group the data
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  }

  const handleMouseEnter = () => {
    playerRef1.current?.playFromBeginning();
  };
  const pageRanges = calculatePageRanges(groupedData);

  // Filter out non-chapter entries and sort chapters
  const chapters = Object.entries(pageRanges)
    .filter(([key]) => key !== "toc" && key !== "cover")
    .map(([chapterId, data]) => ({
      chapterId,
      ...data,
    }));
  useEffect(() => {
    postData();
  }, []);

  const groupDataByChaptersAndQuestions = (data) => {
    const groupedData = {};

    data.forEach((story) => {
      const chapterId = story?.chapterId?._id;
      const questionId = story?.questionId?._id;

      if (!groupedData[chapterId]) {
        groupedData[chapterId] = {
          chapterTitle: story?.chapterId?.chapterTitle,
          chapterImage: story?.chapterId?.chapterImage,
          questions: {},
        };
      }

      if (!groupedData[chapterId]) {
        groupedData[chapterId] = { questions: {} };
      }

      if (!groupedData[chapterId].questions[questionId]) {
        groupedData[chapterId].questions[questionId] = {
          questionText: story?.questionId?.question,
          messages: [],
        };
      }

      groupedData[chapterId].questions[questionId].messages.push(
        ...story.messages
      );
    });

    return groupedData;
  };
  const handelNext = () => {
    setOpen(true);
    // dispatch(incrementstep())
  };
  const handleNextPage = () => {
    setOpen(false);
    dispatch(incrementstep(1));
  };
  const handelCancle = () => {
    setOpen(false);
    dispatch(incrementstep(2));
  };

  useEffect(() => {
    if (groupedData) {
      localStorage.setItem("groupedData", JSON.stringify(groupedData));
    }
  }, [groupedData]);

  return (
    <>
      {loading ? (
        <div className="loader">
          <Lodersvg />
        </div>
      ) : (
        <div className="enhance-section">
          <div className="preview-book">
            <div className="a5-container" ref={bookRef}>
              <div ref={topRef}></div>
              <div className="a5-page2 extara-padding">
                <img src={coverImage} className="cover-new-img" />
                {/* <div className="page-footer">Chapter 1 • Your Life</div> */}
              </div>
              <div className="a5-page2">
                <p className="new-contact">
                  Written By <span>{writtenBy}</span>
                </p>
                <p className="page-name ">
                  Page <span>{pageCounter++}</span>
                </p>

                {/* <div className="page-footer">Chapter 1 • Your Life</div> */}
              </div>
              <div className="a5-page2">
                <h2 className="page-title">Table Of Content</h2>
                <ul>
                  {chapters.map((chapter) => {
                    const end = chapter.end - 1;
                    const start = chapter.start - 1;
                    return (
                      <li key={chapter.chapterId} className="list-box-flex">
                        <div className="dash-line-box"></div>
                        <span className="box-no-titel">
                          {" "}
                          {chapter.chapterTitle}{" "}
                        </span>
                        <span className="box-no">
                          {" "}
                          {chapter.chapterTitle === "Stamboom" ? 3 : start}
                        </span>
                        {/* {chapter.chapterTitle === "Stamboom" ? "" : " - " + end} */}
                      </li>
                    );
                  })}
                </ul>
                <p className="page-name ">
                  Page <span>{pageCounter++}</span>
                </p>

                {/* <div className="page-footer">Chapter 1 • Your Life</div> */}
              </div>
              {/* <div className="a5-page2">
                <h2 className="page-title">Finalize Book</h2>
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
                const totalPages = Object.values(groupedData).reduce(
                  (total, chapter) => {
                    let chapterPageCount = 1; // one page for the chapter image

                    Object.values(chapter.questions || {}).forEach(
                      (question) => {
                        chapterPageCount += question.messages?.length || 0;
                      }
                    );

                    return total + chapterPageCount;
                  },
                  1
                ); // starting with 1 for the finalize intro page

                console.log("Total A5 Pages:", totalPages);

                const chapter = groupedData[chapterId];
                return (
                  <div key={index}>
                    <div key={index} className="a5-page">
                      <h1 className="mock-heading">{chapter.chapterTitle}</h1>
                      {chapter.chapterTitle !== "Stamboom" && (
                        <img src={chapter?.chapterImage} />
                      )}
                      {chapter.chapterTitle === "Stamboom" && (
                        <>
                          <div className="tree" ref={footerRef}>
                            <ul>
                              <li className="no-top1">
                                <ul>
                                  <li>
                                    <div className="box">
                                      {treeData.dadGrandfather}
                                    </div>
                                  </li>
                                  <li>
                                    <div className="box">
                                      {treeData.dadGrandMother}
                                    </div>
                                  </li>
                                  <li>
                                    <div className="box">
                                      {treeData.momGrandfather}
                                    </div>
                                  </li>
                                  <li>
                                    <div className="box">
                                      {treeData.momGrandMother}
                                    </div>
                                  </li>
                                </ul>
                              </li>

                              <li className="no-top2">
                                <ul>
                                  <li>
                                    <div className="box">
                                      {treeData.grandfather}
                                    </div>
                                  </li>
                                  <li>
                                    <div className="box">
                                      {treeData.grandMother}
                                    </div>
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
                                    <div className="box">
                                      {treeData.brother}
                                    </div>
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
                                    <div className="box">
                                      {treeData.cousin1}
                                    </div>
                                  </li>
                                  <li>
                                    <div className="box">
                                      {treeData.cousin2}
                                    </div>
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
                        </>
                        // <div className="family-name-box">
                        //   <img
                        //     src={
                        //       chapter.chapterTitle === "Stamboom"
                        //         ? newtree
                        //         : chapter?.chapterImage
                        //     }
                        //     alt={chapter?.chapterImage}
                        //     width={"100%"}
                        //     height={"100%"}
                        //   />
                        //   <div className="family-name-list">
                        //     {treeData?.map((name, i) => (
                        //       <h6 className={`n-${i + 1}`}>{name}</h6>
                        //     ))}
                        //   </div>
                        // </div>
                      )}
                      <p className="page-name ">
                        Page <span>{pageCounter++}</span>
                      </p>{" "}
                    </div>

                    {Object.keys(chapter.questions).map((questionId) => {
                      const question = chapter.questions[questionId];

                      return (
                        <div key={questionId}>
                          {question.messages?.map((message, messageIndex) => {
                            // Only display the question text for the first message of each question
                            const prefenses =
                              localStorage.getItem("storyPreference");
                            // Only display the question text for the first message of each question
                            const showQuestionText =
                              prefenses === "enhancedStories" ? false : true;
                            return (
                              <div key={message._id} className="a5-page">
                                {/* {!loading2 ? (
                              <div
                                onMouseEnter={handleMouseEnter}
                                style={{
                                  margin: "0px",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  if (currentPlayingAudio === message._id) {
                                    handlePausePlay(message._id);
                                  } else {
                                    handleTextToSpeech(
                                      message?.message,
                                      message._id
                                    );
                                  }
                                }}
                              >
                                {!currentPlayingAudio ? (
                                  <Player
                                    ref={playerRef1}
                                    size={45}
                                    icon={ICON}
                                  />
                                ) : (
                                  <div style={{ width: "30px" }}>
                                    <Lottie
                                      animationData={pause}
                                      loop={false}
                                    />
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div style={{ width: "120px" }}>
                                <Lottie animationData={animation} loop={true} />
                              </div>
                            )} */}
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
                                            <p style={{ textAlign: "center" }}>
                                              {message?.title && message?.title}
                                            </p>
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
                                <p className="page-name ">
                                  Page <span>{pageCounter++}</span>
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              <Scroll_Top
                topRef={topRef}
                footerRef={footerRef}
                dynamicClass={"fixedUpBtn"}
              />
            </div>
          </div>
          {/* <SendBookToPrint /> */}
        </div>
      )}

      <PriviewBookModal
        open={open}
        handelCancle={handelCancle}
        handleNextPage={handleNextPage}
      />
    </>
  );
};

export default SimpleFinalizebook;
