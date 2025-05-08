import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Storyimg from "../../../src/assets/Story.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Gift_Delivery = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    sendDate: "",
    from: "",
    message: "",
  });
  const [isMessageTouched, setIsMessageTouched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (formData.firstName && !isMessageTouched) {
      setFormData((prev) => ({
        ...prev,
        message: `Hi, ${formData.firstName} I’m giving you a subscription to Storyworth, so you can write and share your stories with me and the family.`,
      }));
    }
  }, [formData.firstName, isMessageTouched]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "message") {
      setIsMessageTouched(true); // Mark message as manually edited
    }
  };

  const validateForm = () => {
    if (!formData.firstName) return "Recipient's first name is required.";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return "A valid recipient's email is required.";
    }
    if (!formData.sendDate) return "Send date is required.";
    if (!formData.from) return "From field is required.";
    return "";
  };

  const handleContinue = () => {
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    // Save form data to localStorage
    localStorage.setItem("giftDeliveryData", JSON.stringify(formData));

    // Navigate to the next page
    navigate("/Inner_page3");
  };

  return (
    <>
      <ToastContainer autoClose={1000} />
      <div className="Will_Purchase">
        <div className="Will_Purchase-step-box">
          <div className="Will_Purchase-step-card with-shot">
            <h3>Personalize</h3>
            <div className="line-border"></div>
          </div>
          <div className="Will_Purchase-step-card with-shot">
            <h3>Delivery</h3>
            <div className="line-border"></div>
          </div>
          <div className="Will_Purchase-step-card with-shot">
            <h3>Billing</h3>
            <div className="line-border"></div>
          </div>
        </div>

        <h2>Gift Delivery Details</h2>

        <div className="Will_Purchase-form">
          <div className="Will_Purchase-group">
            <label>Your gift recipient’s full name</label>
            <div className="hafe-wiy-box">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="Will_Purchase-group">
            <label>Your gift recipient’s email</label>
            <input
              type="email"
              name="email"
              placeholder="dummy@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="Will_Purchase-group">
            <label>Send my gift on</label>
            <input
              type="date"
              name="sendDate"
              value={formData.sendDate}
              onChange={handleInputChange}
            />
          </div>

          <h2>Add a Gift Message</h2>

          <div className="Will_Purchase-group">
            <label>From</label>
            <input
              type="text"
              name="from"
              placeholder="Your name + anyone else the gift is from!"
              value={formData.from}
              onChange={handleInputChange}
            />
          </div>

          <div className="Will_Purchase-group">
            <label>Your Message</label>
            <textarea
              name="message"
              placeholder="Hi, I’m giving you a subscription to Storyworth, so you can write and share your stories with me and the family."
              value={formData.message}
              onChange={handleInputChange}
            />
          </div>

          <div className="Will_Purchase-btn-box">
            <button onClick={handleContinue}>Continue</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gift_Delivery;
