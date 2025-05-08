import React, { useState } from "react";
import { Link } from "react-router-dom";
import PayPal from "../../assets/PayPal.png";
import ideal from "../../assets/ideal.jfif";
import PayPalButtonComponent from "../../pages/paypal";
import PayPalButtonComponentCart from "../../pages/paypalcart";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../../baseUrl";
const Drop2Cart = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPopupVisible2, setIsPopupVisible2] = useState(false);
  const [loading, setLoading] = useState(false);
  const { counter, price } = useSelector((state) => state.questionCounter);

  // Function to toggle popup visibility
  const handleViewClick = () => {
    setIsPopupVisible(true); // Show the popup
  };
  const handleViewClick2 = () => {
    setIsPopupVisible2(true); // Show the popup
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setIsPopupVisible(false); // Hide the popup
  };
  const handleClosePopup2 = () => {
    setIsPopupVisible2(false); // Hide the popup
  };

  const handleClick = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const cartId = localStorage.getItem("cartId");
      const userId = localStorage.getItem("userId");

      let body = {
        price,
        counter,
        userId,
        cartId,
      };

      // Step 1: Place the orderF
      const response = await axios.post(`${baseUrl}/orderpayemt`, body);

      if (response.status === 200) {
        body.orderId = response.data?.data?._id;
        try {
          // Step 2: Create iDEAL payment
          const paymentresponse = await axios.post(
            `${baseUrl}/create-payment-ideal`,
            body
          );

          const checkOutUrl = paymentresponse?.data?.checkoutUrl;
          if (checkOutUrl) {
            localStorage.removeItem("cartId");
            window.location.href = checkOutUrl;
          } else {
            throw new Error("No checkout URL received from payment API.");
          }
        } catch (paymentErr) {
          console.error("Payment API error:", paymentErr);
          toast.error("Failed to initiate iDEAL payment.");
        }
      } else {
        toast.error("Failed to place order.");
      }
    } catch (error) {
      console.error("Order API error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="select-station-drop">
        <div onClick={() => handleClick(!isOpen)} className="dropdwon-1-list">
          <h3>{loading ? "Processing..." : "Payment with iDEAL"}</h3>

          <div className="more-box-cion">
            <img src={ideal} alt="" />
          </div>
        </div>

        {/* {isOpen && (
          <div className="taba">
            <PayPalButtonComponentCart />
          </div>
          //    <div className="new-box-item">
          //    <input type="number"  placeholder="0000 0000 0000 0000"/>
          //    <input type="text"placeholder="Name On Card" />

          //    <button>Submit</button>
          //  </div>
        )} */}
      </div>
    </>
  );
};

export default Drop2Cart;
