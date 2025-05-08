import React from "react";
import CardMembership from "./ui-components/CardMembership";
import { CheckmarkIcon1 } from "../svgsIcons/CheckmarkIcon";

const OngeschrevenMembership = () => {
  const benefits = [
    "All Innovator Benefits",
    "VIP Access to Conferences",
    "Recognition",
    "Personalized Services",
  ];

  return (
    <>
      <section className="OngeschrevenMembership-sec">
        <div className="container-ar">
          <div className="main-OngeschrevenMembership">
            <div className="OngeschrevenMembership-tital">
              <h2>Ongeschreven Membership</h2>
              <p>
                Welcome to the Ongeschreven Membership Plan – an exclusive opportunity to unlock new possibilities, enrich your experience, and be part of a dynamic, forward-thinking community. As an Ongeschreven member, you gain access to a curated collection of resources, personalized benefits, and unique opportunities that cater to your aspirations, passions, and ambitions. Our membership is designed to offer more than just a service – it’s a commitment to growth, learning, and connection.
              </p>
            </div>

            <div className="OngeschrevenMembership-box">
              <CardMembership title={"Basic"} Bookname={"Written"} amount={"€99.00"} />
              <CardMembership title={"Standard"} Bookname={"Audio"} amount={"€100.00"} />
              <CardMembership title={"Premium"} Bookname={"Virtual"} amount={"€300.00"} />
            </div>

           
            <div className="OngeschrevenMembership-Benefits-icon-box">
              {benefits.map((benefit, index) => (
                <div key={index} className="OngeschrevenMembership-Benefits-icon">
                  <CheckmarkIcon1 />
                  <p>{benefit}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default OngeschrevenMembership;
