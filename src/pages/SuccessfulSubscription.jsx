import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { ToastContainer, toast } from "react-toastify";
import Successfulpic from "../assets/Successful.png";

const SuccessfulSubscription = () => {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate("");

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const paymentId = query.get("paymentId");
    const token = query.get("token");
    const subscriptionform = localStorage.getItem("subscriptionform");
    const verifyPayment = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/payment-success-subscription`,
          {
            params: { paymentId, token, subscriptionform },
          }
        );
        setStatus(response.data.paid ? "success" : "failed");

        setMessage(response.data.message);
        toast.success(response.data.message);
      } catch (error) {
        setStatus("failed");
        setMessage(error.response?.data?.message || "Error verifying payment");
        toast.error(error.response?.data?.message || "Error verifying payment");
      } finally {
        const formType = subscriptionform; // store before removing
        localStorage.removeItem("subscriptionform");

        setTimeout(() => {
          if (formType === "iWill") {
            navigate("/dashboard");
          } else if (formType === "someoneElse") {
            window.location.href = "https://danbook.appssols.com/";
          }
        }, 5000);
      }
    };

    if (paymentId && token) {
      verifyPayment();
    } else {
      setStatus("failed");
      setMessage("Invalid payment details");
      toast.error("Invalid payment details");
    }
  }, [location]);

  return (
    <>
      <ToastContainer autoClose={1000} />
      <section className="Successful">
        <div className="Successful-main">
          {status === "loading" && <p>Verifying payment...</p>}
          {status === "success" && (
            <>
              <img src={Successfulpic} alt="" />

              <h2>{status ? "Successful" : "Unsuccessful"}</h2>
            </>
          )}
          {status === "failed" && <p style={{ color: "red" }}>{message}</p>}
        </div>
      </section>
    </>
  );
};

export default SuccessfulSubscription;
