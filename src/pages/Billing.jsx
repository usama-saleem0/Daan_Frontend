import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cross from "../assets/cross.png";
import signupImage from "../assets/signup.png";
import logopostion from "../assets/logopostion.png";
import { signup } from "../Redux/Features/UserSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { CiTrophy } from "react-icons/ci";

const Billing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const audio = location.state;
  console.log({ audio });
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    number: "",
    address: "",
    city: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.number ||
      !formData.address ||
      !formData.city
    ) {
      alert("All fields are required!");
      return;
    }

    console.log(formData, "Please enter");
    // localStorage.setItem('billingData', JSON.stringify(formData));

    const existingSignupData =
      JSON.parse(localStorage.getItem("signupData")) || {};

    // Merge billingData with existing signupData
    const updatedSignupData = {
      ...existingSignupData, // Keep existing signupData
      billingData: formData, // Add/Update billingData
    };

    // Save updated data back to localStorage
    localStorage.setItem("signupData", JSON.stringify(updatedSignupData));
    navigate("/Payment", { state: audio });
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

            <h3> Factureringsinformatie</h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-input-div-ar form-input-div-ar-extara">
              <div className="morshort-with">
                <label htmlFor="name">Voornaam *</label>
                <input
                  className="input-ar"
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  placeholder="John"
                  onChange={handleChange}
                />
              </div>

              <div className="morshort-with">
                <label htmlFor="email">Achternaam*</label>
                <input
                  className="input-ar"
                  type="email"
                  name="lastname"
                  value={formData.lastname}
                  placeholder="doe"
                  onChange={handleChange}
                />
              </div>

              <input
                className="input-ar"
                type="number"
                name="number"
                placeholder="+31 (Netherlands)"
                value={formData.number}
                onChange={handleChange}
              />

              <input
                className="input-ar extra-short-class"
                type="text"
                placeholder="Street Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />

              <input
                className="input-ar extra-short-class"
                type="text"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="btn-div more-btn-div">
              <button type="submit" disabled={loading} onClick={handleSubmit}>
                Doorgaan
              </button>
            </div>
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
          </form>

          {/* <div className="postion-logo">
            <img src={logopostion} alt="" />
          </div> */}
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

export default Billing;
