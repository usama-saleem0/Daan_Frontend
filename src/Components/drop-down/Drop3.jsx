import React, { useState } from "react";
import { Link } from "react-router-dom";
import Google from "../../assets/Google.png";
const Drop3 = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupVisible2, setIsPopupVisible2] = useState(false);

  // Function to toggle popup visibility
  const handleViewClick = () => {
    setIsPopupVisible(true); // Show the popup
  };
  const handleViewClick2 = () => {
    setIsPopupVisible2(true); // Show the popup
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setIsPopupVisible(false); // Hide the popup
  };
  const handleClosePopup2 = () => {
    setIsPopupVisible2(false); // Hide the popup
  };

  return (
    <>
      <div className="select-station-drop">
        <div onClick={() => setIsOpen(!isOpen)} className="dropdwon-1-list">
        <h3>Google Pay</h3>
        <div className="more-box-cion">


        <img src={Google} alt="" />

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_97_419)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7069 15.7073C12.5193 15.8948 12.265 16.0001 11.9999 16.0001C11.7347 16.0001 11.4804 15.8948 11.2929 15.7073L5.63585 10.0503C5.54034 9.9581 5.46416 9.84775 5.41175 9.72575C5.35934 9.60374 5.33176 9.47252 5.3306 9.33974C5.32945 9.20696 5.35475 9.07529 5.40503 8.95239C5.45531 8.82949 5.52957 8.71784 5.62346 8.62395C5.71735 8.53006 5.829 8.4558 5.9519 8.40552C6.0748 8.35524 6.20648 8.32994 6.33926 8.33109C6.47204 8.33225 6.60325 8.35983 6.72526 8.41224C6.84726 8.46465 6.95761 8.54083 7.04985 8.63634L11.9999 13.5863L16.9499 8.63634C17.1385 8.45418 17.3911 8.35339 17.6533 8.35567C17.9155 8.35795 18.1663 8.46312 18.3517 8.64852C18.5371 8.83393 18.6423 9.08474 18.6445 9.34694C18.6468 9.60914 18.546 9.86174 18.3639 10.0503L12.7069 15.7073Z" fill="black"/>
  </g>
  <defs>
    <clipPath id="clip0_97_419">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>
</div>
        </div>

        {isOpen && (
    <div className="new-box-item">
    <input type="number"  placeholder="0000 0000 0000 0000"/>
    <input type="text"placeholder="Name On Card" />

    <button>Indienen</button>
  </div>
        )}
      </div>


    </>
  );
};

export default Drop3;
