// import React, { useEffect, useRef } from "react";
// import { useSelector, useDispatch  } from "react-redux";
// import { incrementstep  } from "../Redux/Features/QuestionsSlice";

// const steps = [
//   "Bekijk verhalen",
//   "Verbeter boek",
//   "Audio Book",
//   "Omslag",
//   "Laatste controle",
//   "Verzending",
//   "Afrekenen",
// ];

// const MultiStepComponent = ({ onValueChange }) => {
//   const dispatch = useDispatch();
//   const activeStep = useSelector((state) => state.questionCounter.activeStep);

//   const stepRefs = useRef([]);

//   useEffect(() => {
//     // Auto-scroll to the active step
//     if (stepRefs.current[activeStep]) {
//       stepRefs.current[activeStep].scrollIntoView({
//         behavior: "smooth",
//         inline: "center",
//         block: "nearest",
//       });
//     }
//   }, [activeStep]);

//   const handleStepClick = (index) => {
//     if (index <= activeStep + 1 && index >= 0 && index < steps.length ) {
//       dispatch(incrementstep (index)); // Dispatch Redux action to update step
//       onValueChange(index); // Update local state if needed
//     }
//   };

//   return (
//     <div className="stepper-container">
//       {steps.map((step, index) => (
//         <div
//           key={index}
//           ref={(el) => (stepRefs.current[index] = el)}
//           className={`step ${index === activeStep ? "active" : ""} ${
//             index > activeStep ? "disabled" : ""
//           }`}
//           onClick={() => handleStepClick(index)} // Click to navigate steps
//           // style={{ cursor: "pointer"  }}
//           style={{ cursor: index <= activeStep || index <= activeStep + 1  ? "pointer" : "not-allowed" }}
//         >
//           <span className="step-index">{index + 1}</span>
//           <span className="step-label">{step}</span>
//         </div>
//       ))}

//     </div>
//   );
// };

// export default MultiStepComponent;

import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementstep,
  setSelectedOption,
} from "../Redux/Features/QuestionsSlice";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const steps = [
  "Bekijk verhalen",
  "Verbeter boek",
  "Audio Book",
  "Omslag",
  "Laatste controle",
  "Verzending",
  "Afrekenen",
];

const MultiStepComponent = ({ onValueChange }) => {
  const dispatch = useDispatch();
  const activeStep = useSelector((state) => state.questionCounter.activeStep);
  const selectedOption = useSelector(
    (state) => state.questionCounter.selectedOption
  );
  const stepRefs = useRef([]);
  const [showModal, setShowModal] = useState(false);
  // Check localStorage on component mount
  // useEffect(() => {
  //   const storedOption = localStorage.getItem('storyPreference');
  //   if (storedOption) {
  //     setLocalSelectedOption(storedOption);
  //   }
  // }, []);

  useEffect(() => {
    // Auto-scroll to the active step
    if (stepRefs.current[activeStep]) {
      stepRefs.current[activeStep].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }

    // Show modal when moving to step 2 (Audio Book) if no preference is stored
  }, [activeStep]);

  const handleStepClick = (index) => {
    if (index === 2 && !selectedOption) {
      return; // stop progression
    }
    const cartId = localStorage.getItem("cartId");

    if (index === 6 && !cartId) {
      return; // stop progression
    }

    if (index <= activeStep + 1 && index >= 0 && index < steps.length) {
      dispatch(incrementstep(index));
      onValueChange(index);
      dispatch(setSelectedOption(null));
    }
  };

  return (
    <div className="stepper-container">
      {steps?.map((step, index) => (
        <div
          key={index}
          ref={(el) => (stepRefs.current[index] = el)}
          className={`step ${index === activeStep ? "active" : ""} ${
            index > activeStep || (index === 2 && !selectedOption)
              ? "disabled"
              : ""
          }`}
          onClick={() => handleStepClick(index)}
          style={{
            cursor:
              index <= activeStep + 1 && !(index === 2 && !selectedOption)
                ? "pointer"
                : "not-allowed",
          }}
        >
          <span className="step-index">{index + 1}</span>
          <span className="step-label">{step}</span>
        </div>
      ))}

      {/* Bootstrap Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>Selecteer uw voorkeur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Wat wilt u kiezen?</p>
          <div className="d-flex flex-column gap-2">
            <Button
              style={{ background: "#f39c12", border: "none" }}
              onClick={() => handleOptionSelect("ownStories")}
            >
              1. Je eigen verhalen
            </Button>
            <Button
              style={{ background: "#f39c12", border: "none" }}
              onClick={() => handleOptionSelect("enhancedStories")}
            >
              2. Verbeterde verhalen
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MultiStepComponent;
