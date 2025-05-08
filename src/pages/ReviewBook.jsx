import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import MultiStepComponent from "./MultiStepComponent ";
import SampleBook from "./SampleBook";
import FinalizeBook from "../Components/FinalizeBook";
import CoverImage from "../Components/Coverimage";
import Shipping from "../Components/Shipping-components/Shipping";
import Checkout from "../Components/Shipping-components/Checkout";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import EnhanceBook from "./EnhanceBook";
import EnchacedSample from "./EnchacedSample";
import AudioBook from "../Components/AudioBook";

const ReviewBook = () => {
  const [activeComponent, setActiveComponent] = useState(0);
  const activeStep = useSelector((state) => state.questionCounter.activeStep);
  const navigate = useNavigate();

  const handleHeadingClick = (component) => {
    console.log("here");
    // setActiveComponent(component);
    setActiveComponent(activeStep);
  };

  const backtoanswer = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    setActiveComponent(activeStep); // Sync with Redux
  }, [activeStep]);

  return (
    <>
      <Header />
      <div className="reviewbybook">
        <div className="container-ar">
          {/* <div className="main-site-box">
            <h1>Bekijk mijn boek</h1>
            <p>Kies het boek dat je wilt bekijken.</p>
                  </div> */}
          <div className="main-site-box">
            <span className="backtodashboard">
              <h1>Recensie van mijn boek</h1>
            </span>
            <p>Kies het boek waarin je wilt duiken</p>
          </div>

          <MultiStepComponent onValueChange={setActiveComponent} />

          {activeComponent == 0 && <SampleBook />}
          {activeComponent == 1 && <EnchacedSample />}
          {activeComponent == 2 && <AudioBook />}
          {activeComponent == 3 && <CoverImage />}

          {activeComponent == 4 && <FinalizeBook />}
          {activeComponent == 5 && <Shipping />}
          {activeComponent == 6 && <Checkout />}

          {/* <SampleBook/> */}

          {/* <div className="reviewbook--bottom">
                          <div className="reviewbook--bottom--1">
                              <div className="reviewbook--bottom--top">
                                  <span>
                              <h3>Review Stories</h3>
                              </span>
                              <button>Validate The Review</button>
                              </div>

                              <p>Please note that the PDF is displayed as it will be printed. The first page is intentionally left blank to ensure that the content starts on the left page of your printed book. Enjoy your preview!</p>
                          </div>

                          <div className="reviewbook--bottom--2">
                              <div className="reviewbook--bottom--top-2">
                              <h5>Wouter’s Book</h5>
                              </div>

                              <div className="bottom--forget">
                                  <h6> A Moment I’ll Never Forget   </h6>
                                  <p>Written on June,16,2024</p>

                                  <button>Verhaal bewerken</button>
                              </div>
                            
                          </div>
                      </div> */}
        </div>
      </div>
    </>
  );
};

export default ReviewBook;
