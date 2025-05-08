import React, { useState } from "react";
import logo from "../../assets/logo.png";
const EmailtForget = () => {

  return (
    <>

      <section className="Emailt1">
        <div className="main-Emailt1">

          <div className="Emailt1-logo">

<img src={logo} alt="" />

          </div>
          <div className="Emailt1-heading">
            <h2>Welcome Back</h2>
            <p>Enter your email address to log in to your account. We'll send you a
            secured link to log in.</p>
          </div>
          <div className="Emailt1-group-box">
            <div className="Emailt1-group">
              <label >Email
              </label>
              <input type="text" placeholder="Your email here"/>
            </div>

            <div className="Emailt1-btn">
              <button>LOG IN WITH EMAIL LINK</button>
            </div>

            <div className="Emailt1-link">
              <p>NEW TO MY LIFE IN A BOOK? <span> Forget</span></p>
            </div>
          </div>
        </div>

      </section>

    </>
  );
};

export default EmailtForget;
