import React, { useState } from "react";
import Informationbook from "../../assets/Information.png";
import { useSelector } from "react-redux";
const Shippingbook = () => {

  const { counter, price } = useSelector((state) => state.questionCounter);
  const [constprice, setConstPrice] = useState(90);
  const [selectedImages, setselectedImages] = useState(localStorage.getItem("image"));



  return (
    <>
      <div className="My-Book-Shippingbook">
        <div className="Shippingbook-part-1">
          <div className="Shippingbook-box">
            <div className="Shippingbook-box-img">
              <img src={selectedImages} alt="" />
            </div>
            <div className="Shippingbook-box-tital">
              <h2>Mijn boek</h2>
              <p>Aantal:{counter}</p>
            </div>
          </div>
          <h2>€{constprice}.00</h2>
        </div>


        <div className="Shippingbook-part-2">
          <span><h2>Subtotaal</h2> <h2>€{price}.00</h2></span>
          <span><h2>Verzending</h2> <h2>00.00</h2></span>
        </div>


        <div className="Shippingbook-part-2">
          <span><h2>
            Totaal
          </h2> <h2>€{price}.00</h2></span>
        </div>

      </div>
    </>
  );
};

export default Shippingbook;
