import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cross from "../assets/cross.png";
import signupImage from "../assets/signup.png";
import yes from "../assets/yes.png";

import { signup } from "../Redux/Features/UserSlice";
import { useNavigate } from "react-router-dom";

const Ongeschreven = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    buyeremail: "",

    password: "",
    rememberMe: false,
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

    if (!formData.name || !formData.email || !formData.password) {
      alert("All fields are required!");
      return;
    }

    const result = await dispatch(
      signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        buyeremail: formData.buyeremail,
      })
    );

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
        <div className="more-add-Ongeschreven-box">
        <h4>Ongeschreven Membership</h4>
          <p>
          Welcome to the Ongeschreven Membership Plan – an exclusive opportunity to unlock new possibilities, enrich your experience, and be part of a dynamic, forward-thinking community. As an Ongeschreven member, you gain access to a curated collection of resources, personalized benefits, and unique opportunities that cater to your aspirations, passions, and ambitions. Our membership is designed to offer more than just a service – it’s a commitment to growth, learning, and connection.
          </p>

        </div>

<div className="more-add-Ongeschreven-box extara-Ongeschreven">
  <h4>EUR €99.00</h4>
  <ul>
  <li><img src={yes} alt="" /> All Innovator Benefits</li>
    <li><img src={yes} alt="" /> VIP Access to Conferences</li>
    <li><img src={yes} alt="" />Recognition </li>
    <li><img src={yes} alt="" /> Personalized Services</li>
  </ul>
</div>
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

export default Ongeschreven;

