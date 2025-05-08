import React, { useState } from "react";
import StorySubscription from "./New_form_componets/StorySubscription";
import Will_Purchase from "./New_form_componets/Will_Purchase";
import logopostion from "../../src/assets/logopostion.png";
import { Link } from "react-router-dom";

const Inner_page1 = () => {
  return (
    <>
      <section className="Main_page1-sec   add-class-1">
        <div className="container-ar">
          <div className="Main_page1-logo">
            <Link to="/Main_page1">
              <img src={logopostion} alt="" />
            </Link>
          </div>

          <div className="main-Main_page1">
            <div className="Main_page1-from">
              <Will_Purchase />
            </div>
            <div className="Main_page1-side-compo">
              <StorySubscription
                title="One year Storyworth subscription"
                price="$900.00"
                discount="$10 off"
                promo=" ( Promo code hhjjgg Applied )"
                total="$600"
                includes={["Weekly story Prompts", "1 Black & White hardcover book"]}
                note="Your subscription will renew annually. You can cancel anytime."
              />

            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Inner_page1;
