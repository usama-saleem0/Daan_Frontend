import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ Questions }) => {
  const navigate = useNavigate();
  const QuestionNumber = useSelector((state) => state.questionCounter.value);

  const ChapterNumber = useSelector(
    (state) => state.questionCounter.changeChapter
  );

  const chapterKey = `Chapter${ChapterNumber}`;
  return (
    <div className="sidebar-ar">
      <div className="siebar-top-div">
        <button className="head-btn-ar active-heading-btn">To Questions</button>
        <button onClick={() => navigate("/samplebook")} className="head-btn-ar">
          Sample book
        </button>
      </div>
      <div className="sidebar-bottom-chapters-div-ar">
        <h3>
          Chapter {ChapterNumber} - {Questions?.[chapterKey]?.Title}
        </h3>
        <div className="sample-book-divs-ar">
          <div className="chapters-name-div-ar">
            {Questions?.[chapterKey]?.Questions?.map((e, i) => (
              <>
                <div></div>
                <h4 className="chapter-name-active" key={i}>
                  {i + 1} - {e}
                </h4>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
