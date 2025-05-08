import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import { useNavigate } from "react-router-dom";
const Emailt1 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetloading, setResetLoading] = useState(false);

  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState("");

  const navigate = useNavigate("");
  const onSubmit = async () => {
    console.log("ok");
    // Check if fields are empty
    if (!email || !password) {
      toast.error("All fields are required");
      return; // Exit early if fields are empty
    }
    setLoading(true);

    try {
      // Sending the POST request
      const response = await axios.post(`${baseUrl}/set-password`, {
        email,
        password,
      });
      console.log(response.data, "response");

      // If response is successful, handle success
      if (response.data.token) {
        // Save data in localStorage (or whatever data you want to store)
        localStorage.setItem("userId", response.data.user._id);

        navigate("/dashboard");

        // Show success toast
        toast.success("Password set successfully!");
      } else {
        // Handle unexpected successful responses (if needed)
        toast.error("Something went wrong! Please try again.");
      }
    } catch (error) {
      // If there is an error, show the error message
      console.error("Error:", error);
      toast.error(
        error.response?.data?.message || "Error occurred while setting password"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForget = async () => {
    if (!email) {
      toast.error("Email feild is required");
      return; // Exit early if fields are empty
    }
    try {
      // Sending the POST request
      const response = await axios.post(`${baseUrl}/forgot-pass`, {
        email,
      });
      console.log(response.data, "response");
      // If response is successful, handle success
      if (response.data.message) {
        toast.success("Code sent to your email!");
        setShowCodeInput(true); // Show the code input field
      } else {
        // Handle unexpected successful responses (if needed)
        toast.error("Something went wrong! Please try again.");
      }
    } catch (error) {
      // If there is an error, show the error message
      console.error("Error:", error);
      toast.error(
        error.response?.data?.message || "Error occurred while setting password"
      );
    }
  };

  const onResetSubmit = async () => {
    if (!email || !password || !code) {
      toast.error("All feilds is required");
      return; // Exit early if fields are empty
    }
    setResetLoading(true);
    try {
      // Sending the POST request
      const response = await axios.post(`${baseUrl}/reset-pass`, {
        email,
        password,
        code,
      });
      // If response is successful, handle success
      if (response.data.token) {
        localStorage.setItem("userId", response.data.user._id);

        navigate("/dashboard");

        
        // Show success toast
        toast.success("Password set successfully!");
      } else {
        // Handle unexpected successful responses (if needed)
        toast.error("Something went wrong! Please try again.");
      }
    } catch (error) {
      // If there is an error, show the error message
      console.error("Error:", error);
      toast.error(
        error.response?.data?.message || "Error occurred while setting password"
      );
    } finally {
      setResetLoading(false);
    }
  };
  return (
    <>
      <section className="Emailt1">
        <div className="main-Emailt1">
          <div className="Emailt1-logo">
            <img src={logo} alt="" />
          </div>
          <div className="Emailt1-heading">
            <h2>Welcome Back</h2>
            <p>
              Enter your email address to log in to your account. We'll send you
              a secured link to log in.
            </p>
          </div>
          <div className="Emailt1-group-box">
            <div className="Emailt1-group">
              <label>Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Your email here"
              />
            </div>
            <div className="Emailt1-group">
              <label>Set Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="*******"
              />
            </div>
            {showCodeInput && (
              <div className="Emailt1-group">
                <label>Enter Code</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter the 5-digit code"
                />
              </div>
            )}
            {!showCodeInput ? (
              <div className="Emailt1-btn">
                <button disabled={loading} onClick={() => onSubmit()}>
                  {loading ? "Processing..." : "Set Password"}
                </button>
              </div>
            ) : (
              <div className="Emailt1-btn">
                <button disabled={resetloading} onClick={() => onResetSubmit()}>
                  {resetloading ? "Processing..." : "Reset Password"}
                </button>
              </div>
            )}

            <div className="Emailt1-link">
              <p>
                NEW TO Ongeschrevan Levan?{" "}
                <span onClick={handleForget}> Forget</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Emailt1;
