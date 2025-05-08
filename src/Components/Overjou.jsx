import React, { useEffect, useState } from "react";
import { getChapterH, getUserChapterbyid } from "../Redux/Features/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  NavigateQuestionNo,
  setChangeChapter,
} from "../Redux/Features/QuestionsSlice";
import Header from "./Header";
import Overjoucomponet from "./Overjoucomponet";



const Overjou = () => {
  const chapters = [
    {
      num: "01",
    },
    {
      num: "02",
    },
    {
      num: "03",
    },
    {
      num: "04",
    },
    {
      num: "05",
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem("currentuser"));
  const [loading, setLoading] = useState();

  const [chaptersdata, setChaptersdata] = useState([]);
  useEffect(() => {
    handleSubmit();
  }, []);

  // const handleSubmit = async (e) => {

  //   const user_id = localStorage.getItem("userId");

  //   const result = await dispatch(getUserChapter(user_id));

  //   console.log(result.payload, "Ussssssk");
  //   setChaptersdata(result.payload.chapters?.staticquestions)
  // }

  const handleSubmit = async () => {
    const user_id = localStorage.getItem("userId");
    setLoading(true);

    try {
      const result = await dispatch(getChapterH(user_id));
      console.log("resukl", result);

      if (result?.payload.chapters) {
        // If the result has chapters
        setChaptersdata(result?.payload.chapters); // Set the chapters data correctly
      } else {
        console.error("No chapters foundssss:", result);
      }
    } catch (error) {
      console.error("Error fetching chapters:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const setChapters = (chapters) => {
    dispatch(setChangeChapter(chapters));

    navigate("/chat");
  };
  const handleSubmitViewQuestionNo = async (question, chapter) => {
    const chapDto = JSON.parse(localStorage.getItem(chapters));
    if (chapDto) {
      localStorage.removeItem("chapters");
    }
    localStorage.setItem("chapters", JSON.stringify(chapter));
    console.log("chapteras", chapter);
    navigate(`/chat-module/${question?._id}`, {
      state: {
        chatperId: chapter?._id,
        questionText: question,
        chapterData2: chapter,
      },
    });
  };

  const [activeComponent, setActiveComponent] = useState("questionOfWeek");

  const handleHeadingClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <>
      <Header />
      <section className="futurebook-section-ar">
        <div className="container-ar">
          <div className="main-future-book-ar">
            {/* <div className="book-img-ar">
              <img src={book} alt="" />
            </div> */}
            <h3>Welkom bij je toekomstige boek</h3>
            <h4>Je hebt X verhalen geschreven van de 52.</h4>
            <div className="outlet-check-ar">
              <div className="checks-div-ar">
                <h5
                  onClick={() => navigate("/dashboard")}
                  style={
                    {
                      // color: activeComponent === "questionOfWeek" ? "#000" : "",
                    }
                  }
                >
een voorproefje van mijn boek  
                </h5>
                <h5
                  onClick={() => navigate(`/chapter/${userDetails?._id}`)}
                  style={
                    {
                      // color: activeComponent === "chapter" ? "#000" : "",
                    }
                  }
                >
                  Hoofdstuk
                </h5>
                <h5
                  onClick={() => navigate("/allQuestions")}
                  
                >
                  Alle vragen
                </h5>
                <h5
                  onClick={() => navigate("/Overjou")}
                  style={{
                    color: "#000",
                  }}
                >
                  Over jou
                </h5>
                {/* <h5
                  onClick={() => navigate(`/chapterai/${userDetails?._id}`)}

                >
                  With Ai Questions
                </h5> */}
              </div>
              {activeComponent === "allQuestions" && (
                <div className="add-chapter-btn">Voeg nog een vraag toe</div>
              )}
            </div>
            {/* {activeComponent === "questionOfWeek" && <Questionoftheweek />}
          {activeComponent === "chapter" && <Chaptersfuture />}
  
          {activeComponent === "allQuestions" && <AllQuestions />} */}
          </div>

          <div className="chapters-div-ar">
          <Overjoucomponet/>
          </div>
        </div>
      </section>
    </>
  );
};

export default Overjou;
