import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Successfulpic from "../assets/Successful.png";
import axios from "axios";
import { baseUrl } from "../baseUrl";

const Successful = () => {
  const [status, setstatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paidStatus, SetPaidStatus] = useState({
    status: "",
    message: "",
  });
  const params = useParams();
  const navigate = useNavigate("");

  const fetch = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/payment-success?id=${params?.mobilleId}&orderId=${params?.orderId}`
      );
      const data = response.data;
      setstatus(data?.paid);
      setLoading(false);
      SetPaidStatus({ status: data?.paidStatus, message: data?.message });
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        navigate("/dashboard");
      }, 5000);
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  
  return (
    <>
      <section className="Successful">
        <div className="Successful-main">
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <>
              {status && <img src={Successfulpic} alt="" />}
              <h2>{status ? "Successful" : "Unsuccessful"}</h2>
              <p>{paidStatus.status !== "paid" ? paidStatus.message : ""}</p>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Successful;
