import React, { useState } from "react";


const Durationtype = () => {

    const [selectedOption, setSelectedOption] = useState('Select time Duration');
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };


    return (
        <>
            <div className="select-station-drop">


                <div onClick={() => setIsOpen(!isOpen)} className="dropdwon-1-list">
                    {selectedOption}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <g clip-path="url(#clip0_93_886)">
                            <path d="M2.05621 3.70333L7.95581 9.6029L13.8554 3.70333C13.9423 3.61541 14.0457 3.54553 14.1596 3.49772C14.2736 3.4499 14.3959 3.42509 14.5195 3.42471C14.6431 3.42434 14.7655 3.44841 14.8798 3.49553C14.994 3.54265 15.0979 3.6119 15.1853 3.6993C15.2726 3.78669 15.3419 3.8905 15.389 4.00476C15.4361 4.11902 15.4602 4.24146 15.4598 4.36506C15.4595 4.48865 15.4347 4.61095 15.3868 4.72492C15.339 4.83888 15.2691 4.94227 15.1812 5.02914L8.61872 11.5916C8.4429 11.7674 8.20445 11.8662 7.95581 11.8662C7.70718 11.8662 7.46873 11.7674 7.29291 11.5916L0.730414 5.02914C0.556362 4.85296 0.459091 4.61507 0.459843 4.36741C0.460595 4.11976 0.559308 3.88247 0.734426 3.70735C0.909544 3.53223 1.14684 3.43352 1.39449 3.43276C1.64215 3.43201 1.88004 3.52928 2.05621 3.70333Z" fill="#272727" />
                        </g>
                        <defs>
                            <clipPath id="clip0_93_886">
                                <rect width="15" height="15" fill="white" transform="translate(0.455811 15.1475) rotate(-90)" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>

                {isOpen && (
                    <ul className="options-list" >
                        <li onClick={() => handleOptionClick('Option1')} className="select-option">
                            Option1
                        </li>
                        <li onClick={() => handleOptionClick('Option2')} className="select-option">
                            Option2
                        </li>
                        <li onClick={() => handleOptionClick('Option3')} className="select-option">
                            Option3
                        </li>
                        <li onClick={() => handleOptionClick('Option4')} className="select-option">
                            Option4
                        </li>
                        <li onClick={() => handleOptionClick('Option5')} className="select-option">
                            Option5
                        </li>
                    </ul>
                )}
            </div>
        </>
    )



}


export default Durationtype