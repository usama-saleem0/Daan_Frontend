import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cross from "../assets/cross.png";
import signupImage from "../assets/signup.png";
import Roomtype from "../Components/drop-down/Roomtype";
import Durationtype from "../Components/drop-down/Durationtype";



const Meeting = () => {


  return (
    <section className="signup-section">
      <div className="inner-section-login-ar">
        <div className="signup-form-div">
          <h3>
          Booking Your Meeting
          Room Today!</h3>
          <h5>
          The first time I met my new nephew was an experience I will never forget. Seeing my younger sister with her baby was incredibly heartwarming and filled me with joy.nt.
          </h5>
          <form >
            <div className="form-input-div-arx">
             <Roomtype/>
             <Durationtype/>
            </div>
           
          
            <div className="btn-div">
              <button type="submit"    style={{color:'white'}}>
              Find Space
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

export default Meeting;
