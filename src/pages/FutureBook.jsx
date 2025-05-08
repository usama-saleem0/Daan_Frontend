import React, { useState } from "react";
import Header from "../Components/Header";
import book from "../assets/book.png";
import questionbook from "../assets/questionbook.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Questionoftheweek from "../Components/Questionoftheweek";
import AllQuestions from "../Components/AllQuestions";

import bookcoverimg from "../assets/bookcoverimg.png";

const FutureBook = () => {


  const navigate = useNavigate();
  const giveAnswer = useSelector((state) => state.questionCounter.giveAnswer);


  const previewBook = () => {

    // navigate('/ReviewBook')

    navigate("/ReviewBook"); // Navigate to review book
    if (giveAnswer) {
    } else {
      toast.error("Please give the answer to the questions."); // Show toast
    }
  }


  const [activeComponent, setActiveComponent] = useState("questionOfWeek");


  const handleHeadingClick = (component) => {
    setActiveComponent(component);
  };
const userData=localStorage.getItem('currentuser')
const parsedData=JSON.parse(userData)
console.log({parsedData});
  return (
    <>
      <Header />
      <section className="futurebook-section-ar">
        <div className="container-ar">
          <div className="main-future-book-ar">
            {/* <div className="book-img-ar">
              <img src={book} alt="" />
            </div> */}
            <h3>Welkom bij je toekomstige boek
            </h3>
            <h4>Je hebt X verhalen geschreven van de 52.
            </h4>
            <div className="outlet-check-ar">
              <div className="checks-div-ar">
                <h5
                  onClick={() => navigate('/dashboard')}
                  style={{
                    color: "#000"
                  }}
                >
  een voorproefje van mijn boek                
                </h5>
                <h5
                  onClick={() => navigate(`/chapter/${parsedData?._id}`)}
                  style={{
                    // color: activeComponent === "chapter" ? "#000" : "",
                  }}
                >
                  Hoofdstuk
                </h5>

                <h5
                  onClick={() => navigate('/allQuestions')}
                  style={{
                    // color: activeComponent === "allQuestions" ? "#000" : "",
                  }}
                >
                  Alle vragen
                </h5>
                <h5
                  onClick={() => navigate('/Overjou')}
                  style={{
                    // color: activeComponent === "allQuestions" ? "#000" : "",
                  }}
                >
                  Over jou
                </h5>
                {/* <h5
                  onClick={() => navigate(`/chapterai/${parsedData?._id}`)}
                >
                  With Ai Questions
                </h5> */}
              </div>
              {(
                activeComponent === "allQuestions") && (
                  <div className="add-chapter-btn">Voeg nog een vraag toe</div>
                )}
            </div>
            {/* {activeComponent === "questionOfWeek" && <Questionoftheweek />}
            {activeComponent === "chapter" && <Chaptersfuture />}
    
            {activeComponent === "allQuestions" && <AllQuestions />} */}
          </div>


          <div className="questionoftheweek-div-ar">

            <ToastContainer
              position="top-center"
              autoClose={3000}
            />

            <div className="inner-question-bok-ar">
              {/* <div className="question-book-img-ar">
                <img src={questionbook} alt="" />
              </div> */}
              <h5>U heeft uw vraag van de week beantwoord</h5>
              <h6>
              Take a glimpse into the timeless art of printing and typesetting, a craft perfected over centuries.
              </h6>
              <button onClick={previewBook}>Bekijk een voorbeeld van mijn boek</button>
            </div>

            {/* <div className="inner-question-bok-ar">
              <div className="question-book-img-ar">
                <img src={questionbook} alt="" />
              </div>
              <h5>Book Title</h5>
              <h6>
                Author Name
              </h6>
              <div className="BOOK-theam-cover-box">
                <img src={bookcoverimg} alt="" />
              </div>
              <button>Preview my Book</button>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default FutureBook;
