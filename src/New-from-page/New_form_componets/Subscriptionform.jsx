import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // routing hook
import Storyimg from "../../../src/assets/Story.png";

const Subscriptionform = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedOption === "iWill") {
      navigate("/Inner_page1");
    } else if (selectedOption === "someoneElse") {
      navigate("/Inner_page2");
    }
    localStorage.setItem("subscriptionform", selectedOption);
  };

  return (
    <>
      <div className="Subscriptionform">
        <h2>Who Will be Telling Stories on Storyworth?</h2>

        <div className="Subscriptionform-group-box">
          <div
            className={`Subscriptionform-card ${
              selectedOption === "iWill" ? "active" : ""
            }`}
            onClick={() => setSelectedOption("iWill")}
          >
            <div class="content">
              <label class="checkBox">
                <input
                  id="ch1"
                  type="checkbox"
                  checked={selectedOption === "iWill"}
                  onChange={() => setSelectedOption("iWill")}
                />
                <div class="transition"></div>
              </label>
            </div>

            <p>I Will</p>
          </div>

          <div
            className={`Subscriptionform-card ${
              selectedOption === "someoneElse" ? "active" : ""
            }`}
            onClick={() => setSelectedOption("someoneElse")}
          >
            <div class="content">
              <label class="checkBox">
                <input
                  id="ch1"
                  type="checkbox"
                  checked={selectedOption === "someoneElse"}
                  onChange={() => setSelectedOption("someoneElse")}
                />
                <div class="transition"></div>
              </label>
            </div>

            <p>Someone else will</p>
          </div>
        </div>

        <button onClick={handleContinue}>Continue</button>
      </div>
    </>
  );
};

export default Subscriptionform;
