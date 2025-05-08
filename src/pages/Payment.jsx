import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cross from "../assets/cross.png";
import signupImage from "../assets/signup.png";

import Stripe from "../assets/Stripe.png";
import PayPal from "../assets/PayPal.png";
import Google from "../assets/Google.png";

import { signup } from "../Redux/Features/UserSlice";
import { useLocation, useNavigate } from "react-router-dom";
import logopostion from "../assets/logopostion.png";
import Drop1 from "../Components/drop-down/Drop1";
import Drop2 from "../Components/drop-down/Drop2";
import Drop3 from "../Components/drop-down/Drop3";
import Drop2Cart from "../Components/drop-down/Drop2cart";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPayment, setSelectedPayment] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const audioBlob = location.state || null;

  console.log(audioBlob);

  const handleSelectPayment = (payment) => {
    setSelectedPayment(payment);
    setIsDropdownOpen(false); // Close dropdown after selecting an option
  };

  const storedData = JSON.parse(localStorage.getItem("signupData")) || {};
  const [formData, setFormData] = useState({
    name: storedData.name || "",
    email: storedData.email || "",
    password: storedData.password || "",
    buyeremail: storedData.buyeremail || "",
    description: storedData.description || "",
    address: storedData?.billingData?.address || "",
    city: storedData?.billingData?.city || "",
    number: storedData?.billingData?.number || "",
    firstname: storedData?.billingData?.firstname || "",
    lastname: storedData?.billingData?.lastname || "",
    rememberMe: storedData.rememberMe || false,
  });

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!formData.name || !formData.email || !formData.password) {
  //     alert("All fields are required!");
  //     return;
  //   }

  //   const result = await dispatch(
  //     signup({
  //       name: formData.name,
  //       email: formData.email,
  //       password: formData.password,
  //     })
  //   );

  //   if (signup.fulfilled.match(result)) {
  //     navigate("/login");
  //   } else {
  //     console.error("Signup failed:", result.payload || "Unknown error");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("All fields are required!");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("buyeremail", formData.buyeremail);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("number", formData.number);
    formDataToSend.append("firstname", formData.firstname);
    formDataToSend.append("lastname", formData.lastname);
    if (audioBlob) {
      formDataToSend.append("audio", audioBlob, "voice_recording.wav");
    }

    const result = await dispatch(signup(formDataToSend));

    if (signup.fulfilled.match(result)) {
      navigate("/login");
    } else {
      console.error("Signup failed:", result.payload || "Unknown error");
    }
  };

  return (
    <section className="signup-section">
      <div className="inner-section-login-ar">
        <div className="signup-form-div">
          <div className="dot-plus-svg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
            >
              <circle cx="25" cy="25" r="25" fill="#D5A6BD" />
            </svg>

            <h3> Billing Information</h3>
          </div>

          <br />
          <br />
          <div className="dot-plus-svg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
            >
              <circle cx="25" cy="25" r="25" fill="#D5A6BD" />
            </svg>
            <h3> Betaling</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="Instant-Pay-box">
              <h2>Direct betalen:</h2>

              <div className="Instant-pay-select-box">
                <Drop1 />

                <Drop2 />

                <Drop3 />
              </div>
            </div>

            <div className="btn-div more-btn-div">
              <button type="submit" disabled={loading}>
                {loading ? "Continue..." : "Continue"}
              </button>
            </div>
          </form>
        </div>
        <div className="right-img-div-ar">
          <div className="login-img-ar">
            <img src={signupImage} alt="Sign up" />
          </div>
          {/* <div className="cross-div-ar">
            <img src={cross} alt="Close" />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Payment;
