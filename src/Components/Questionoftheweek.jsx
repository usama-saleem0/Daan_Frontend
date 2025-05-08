import React from "react";
import questionbook from "../assets/questionbook.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FutureBook from "../pages/FutureBook";

const Questionoftheweek = () => {

  const navigate = useNavigate();
  const giveAnswer = useSelector((state) => state.questionCounter.giveAnswer);


  const previewBook = () => {

    // navigate('/ReviewBook')

    if (giveAnswer) {
      navigate("/ReviewBook"); // Navigate to review book
    } else {
      toast.error("Please give the answer to the questions."); // Show toast
    }
  }
  return (


        <div className="questionoftheweek-div-ar">

          {/* <ToastContainer
            position="top-center"
            autoClose={3000}
          /> */}

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
        </div>
   
  );
};

export default Questionoftheweek;
