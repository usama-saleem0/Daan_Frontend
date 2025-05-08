import React from "react";
import Storyimg from "../../../src/assets/Story.png";

const StorySubscription = ({
  title = "",
  price = "",
  discount = "",
  promo = "",
  total = "",
  includes = [],
  note = "",
  deliverTo = null, // object: { name, email, date }
  giftMessage = "", 
  headDeliver ="",
  headGift ="",
}) => {
  return (
    <div className="StorySubscription">
      <div className="StorySubscription-img">
        <img src={Storyimg} alt="" />
      </div>

      <div className="StorySubscription-tital-box">
        {title && <h2>{title}</h2>}
        {price && (
          <span>
            Price :<p>{price}</p>
          </span>
        )}
        {discount && (
          <span>
          <div className="Discount">   Discount:</div> <div className="Discount-p">{discount}</div>      <div className="Discountx">{promo && `${promo}`}</div>
          </span>
        )}
        {total && (
          <span>
            Total :<p>{total}</p>
          </span>
        )}
      </div>

      {includes.length > 0 && (
        <div className="StorySubscription-tital-box">
          <h2>Includes:</h2>
          <ul>
            {includes.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {note && (
        <div className="StorySubscription-p">
          <p>{note}</p>
        </div>
      )}

      {/* ✅ Deliver To Section */}
      {deliverTo && (
        <div className="StorySubscription-tital-box">
            <h2>{headDeliver}</h2>
          <span>{deliverTo.name}</span>
          <span>{deliverTo.email}</span>
          <span>{deliverTo.date}</span>
        </div>
      )}

      {/* ✅ Gift Message Section */}
      {giftMessage && (
        <div className="StorySubscription-tital-box">
          <h2>{headGift}</h2>
          <span>{giftMessage}</span>
        </div>
      )}
    </div>
  );
};

export default StorySubscription;
