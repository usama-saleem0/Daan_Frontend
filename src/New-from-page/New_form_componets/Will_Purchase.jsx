import React, { useState, useEffect } from "react";
import Storyimg from "../../../src/assets/Story.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../baseUrl";
import axios from "axios";
import ideal from "../../assets/ideal.jfif";
import { Link } from "react-router-dom";

const Will_Purchase = () => {
  const [giftData, setgiftData] = useState();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    receiveEmails: false,
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("ideal"); // Default to iDEAL

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleClick = (open) => {
    setIsOpen(open);
    setPaymentMethod("ideal"); // Set payment method to iDEAL
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.fullName) return "Full name is required.";
    if (!emailRegex.test(formData.email))
      return "Please enter a valid email address.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      setLoading(false);
      return;
    }

    const payload = {
      type: "user",
      fullName: formData.fullName,
      email: formData.email,
      amount: 600, // Consider making dynamic (confirm if USD or EUR)
      paymentMethod,
      receiveEmails: formData.receiveEmails,
      giftData,
    };

    console.log("payload", payload);

    try {
      const response = await axios.post(`${baseUrl}/subscription`, payload);
      toast.success("Redirecting to payment...");
      window.location.href = response.data.checkoutUrl;

      localStorage.removeItem("giftDeliveryData");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to initiate payment"
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const giftData = localStorage.getItem("giftDeliveryData");
    if (giftData) {
      const parsedData = JSON.parse(giftData);
      setgiftData(parsedData);
    }
  }, []);

  console.log("giftData", giftData);
  return (
    <>
      <ToastContainer autoClose={1000} />
      <div className="Will_Purchase">
        <div className="Will_Purchase-step-box">
          <div className="Will_Purchase-step-card">
            <h3>Personalize</h3>
            <div className="line-border"></div>
          </div>
          <div className="Will_Purchase-step-card">
            <h3>Billing</h3>
            <div className="line-border"></div>
          </div>
        </div>

        <h2>Purchase Storyworth</h2>

        <div className="Will_Purchase-form">
          <div className="Will_Purchase-group">
            <label>Your full name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>

          <div className="Will_Purchase-group">
            <label>Your email address</label>
            <input
              type="email"
              name="email"
              placeholder="dummy@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="Subscriptionform-card">
            <input
              type="checkbox"
              name="receiveEmails"
              checked={formData.receiveEmails}
              onChange={handleInputChange}
            />
            <p>
              I would like to get story writing tips, inspiration, customer
              stories, and promotions via email
            </p>
          </div>

          <div className="Privacy-box">
            <p>
              Privacy is important to us. By purchasing, you acknowledge that
              you have read and accept Storyworth's{" "}
              <a href="/terms">terms of service</a> and{" "}
              <a href="/privacy">privacy policy</a>.
            </p>
          </div>

          <div className="select-station-drop">
            <div
              onClick={() => handleClick(!isOpen)}
              className="dropdwon-1-list"
            >
              <h3>{loading ? "Processing..." : "Payment with iDEAL"}</h3>

              <div className="more-box-cion">
                <img src={ideal} alt="" />
              </div>
            </div>
          </div>

          <div
            className="Will_Purchase-btn-box"
            style={{ padding: "10px 0px" }}
          >
            <button disabled={loading} onClick={handleSubmit}>
              {loading ? "Processing..." : `Purchase for $600`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Will_Purchase;
