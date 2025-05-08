import React, { useState, useEffect } from "react";
import StorySubscription from "./New_form_componets/StorySubscription";
import Will_Purchase from "./New_form_componets/Will_Purchase";
import logopostion from "../../src/assets/logopostion.png";
import { Link } from "react-router-dom";

const Inner_page3 = () => {
  const [giftData, setgiftData] = useState();
  useEffect(() => {
    const giftData = localStorage.getItem("giftDeliveryData");
    if (giftData) {
      const parsedData = JSON.parse(giftData);
      setgiftData(parsedData)
    }
  }, []);


  return (
    <>
      <section className="Main_page1-sec    add-class-3">
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
                title="Special Deal"
                price="$500"
                discount="$50 off"
                promo="Promo code WOW50 applied"
                total="$450"
                includes={["Free delivery", "Gift pack"]}

                deliverTo={{
                  name: giftData?.firstName,
                  email: giftData?.email,
                  date: giftData?.sendDate,
                }}
                giftMessage= {giftData?.message}
                headGift="Deliver to:"
                headDeliver="Gift message:"
              />

            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Inner_page3;
