import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchStaticQuestions } from "../Redux/Features/UserSlice";

const Sidebar = ({ Questions }) => {
  const navigate = useNavigate();
  const QuestionNumber = useSelector((state) => state.questionCounter.value);
  const ismenuopen = useSelector((state) => state.questionCounter.menuopen);


  const dispatch = useDispatch();
  const { UserChapterStoryData, loading, error } = useSelector((state) => state.auth);


  const handleCloseMenu = () => { };

  const ChapterNumber = useSelector(
    (state) => state.questionCounter.changeChapter
  );

  const chapterKey = `Chapter${ChapterNumber}`;
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  // const chapter_number = chapterKey;

  const user_id = localStorage.getItem("userId");
  useEffect(() => {
    // const user_id = '67485de6ee809c46202f0b7f'
    dispatch(fetchStaticQuestions({ user_id }));

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);


  }, [dispatch, user_id]);
  return (
    <>
      <div
        className="sidebar-ar"
        style={{
          display: isSmallScreen && !ismenuopen ? "none" : "block",
        }}
      >
        <div className="sidebar-upper-div-ar">
          <div className="siebar-top-div">
            <button className="head-btn-ar active-heading-btn">
     
Op vragen
            </button>
            <button
              onClick={() => navigate("/samplebook")}
              className="head-btn-ar"
            >
          
Voorbeeldboek
            </button>
          </div>
          <h3 className="sidebar-chap-heading">
         
Hoofdstuk {ChapterNumber} - {Questions?.[chapterKey]?.Title}
          </h3>
        </div>
        <div className="sidebar-bottom-chapters-div-ar">
          <div className="sample-book-divs-ar">
            <div className="chapters-name-div-ar">


              {UserChapterStoryData && UserChapterStoryData.length > 0 ? (
                UserChapterStoryData.map((chapter, chapterIndex) => (
                  <div key={chapter._id}>
                    {/* <h3 className="chapter-title">Chapter {chapterIndex + 1}: {chapter.chapter}</h3> */}
                    {chapter.questions.map((question, questionIndex) => (
                      <div key={questionIndex} className="question-container">
                        <h4 className="chapter-name-active">
                          {chapterIndex + 1}.{questionIndex + 1} - {question}
                        </h4>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <h3>Geen vragen gevonden</h3>
              )}


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
