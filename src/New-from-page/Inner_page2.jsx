import React, { useState } from "react";
import StorySubscription from "./New_form_componets/StorySubscription";
import logopostion from "../../src/assets/logopostion.png";
import Gift_Delivery from "./New_form_componets/Gift_Delivery ";
import { Link } from "react-router-dom";

const Inner_page2 = () => {
  return (
    <>
      <section className="Main_page1-sec   add-class-2">
        <div className="container-ar">
          <div className="Main_page1-logo">
            <Link to="/Main_page1">
              <img src={logopostion} alt="" />
            </Link>
          </div>
          <div className="main-Main_page1">
            <div className="Main_page1-from">
              <Gift_Delivery />
            </div>
            <div className="Main_page1-side-compo">
              <StorySubscription
                title="One year Storyworth subscription"
                price="$900.00"
                discount="$10 off"
                promo=" ( Promo code hhjjgg Applied )"
                total="$600"
                includes={["Weekly story Prompts", "1 Black & White hardcover book"]}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Inner_page2;
