import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import cross from "../assets/cross.png";
import loginImg from "../assets/login.png";
import { login } from "../Redux/Features/UserSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../baseUrl";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    setError(""); // Reset the error state

    const credentials = { email, password };

    const result = await dispatch(login(credentials));
    console.log(result, "tS");

    if (login.fulfilled.match(result)) {
      const user = localStorage.getItem("user");

      if (user) {
        try {
          const response = await fetch(`${baseUrl}/protected`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            // console.log(data.user.id, "userid");
            localStorage.setItem("userId", data.user.id);
            // localStorage.setItem("currentuser", data.user);
            // localStorage.setItem("currentuser", data.user);

            // toast.success("User logged in successfully.");
            // navigate("/dashboard");
            // setTimeout(() => {
            // }, 2000);
            navigate("/dashboard");
          } else {
            // Unauthorized access
            toast.error("Invalid username or password.");
            localStorage.removeItem("user");
            // navigate("/login");
          }
        } catch (error) {
          // Network error or other issues during the fetch
          console.error("Error during protected request:", error);
          toast.error("An error occurred. Please try again.");
    setIsDisabled(false);

        }
      } else {
        // Token missing or invalid
        toast.error("Token missing or invalid. Please log in again.");
        // navigate("/login");
    setIsDisabled(false);

      }
    } else {
    setIsDisabled(false);

      // Login failed
      toast.error(result.payload || "Login failed. Please try again.");
    }
  };

  const [isDisabled, setIsDisabled] = useState(false);

  // const handleClick = () => {
  //   setIsDisabled(true); // Button ko disable kar do
  // };
  return (
    <section className="signup-section">
      {/* <ToastContainer /> */}
      <div className="inner-section-login-ar">
        <div className="signup-form-div">
          <h3>Welkom terug</h3>
          <h5>
            Voer het e-mailadres in om in te loggen op jouw account. We sturen
            je een beveiligde link om in te loggen
          </h5>
          <form onSubmit={handleSubmit}>
            <div className="form-input-div-ar">
              <label htmlFor="email">E-mailadres *</label>
              <input
                id="email"
                className="input-ar"
                type="email"
                placeholder="john.doe@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="password">Wachtwoord *</label>
              <input
                id="password"
                className="input-ar"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <span
                onClick={togglePasswordVisibility}
                style={{
                  position: "relative",
                  left: "95%",
                  bottom: "35px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? (
                  <svg
                    className="eye"
                    xmlns="http://www.w3.org/2000/svg"
                    height="12px"
                    viewBox="0 0 576 512"
                  >
                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                  </svg>
                ) : (
                  <svg
                    className="eye-slash"
                    xmlns="http://www.w3.org/2000/svg"
                    height="12px"
                    viewBox="0 0 640 512"
                  >
                    <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                  </svg>
                )}
              </span>
            </div>
            {/* <div className="rememberme-ar">
              <input style={{ margin: "0" }} type="checkbox" />
              <p>Blijf ingelogd</p>
            </div> */}
            <div className="btn-div">
              <button
                style={{
                  backgroundColor: "#F5D39D",
                  opacity: isDisabled ? 0.5 : 1, // Opacity ko kam karo jab disable ho
                  cursor:
                    email === "" || password === "" || isDisabled
                      ? "not-allowed"
                      : "pointer", // Cursor ko bhi change karo
                }}
                type="submit"
                onClick={handleSubmit}
                disabled={email === "" || password === "" || isDisabled} // Disable attribute lagao
              >
                Login
              </button>
              <p>
                Heeft u geen account?{" "}
                <strong
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/signup")}
                >
                  Schrijf je in
                </strong>
              </p>
            </div>
          </form>
        </div>
        <div className="right-img-div-ar">
          <div className="login-img-ar">
            <img src={loginImg} alt="Login Illustration" />
          </div>
          {/* <div className="cross-div-ar">
            <img src={cross} alt="Close" />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Login;
