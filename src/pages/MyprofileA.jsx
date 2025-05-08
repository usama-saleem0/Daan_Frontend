import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { toast, ToastContainer } from "react-toastify";

const MyprofileA = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    buyeremail: "",
    UserImage: "",
  });
  const [loading, setLoading] = useState();


  const fetchUserData = async () => {
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.get(`${baseUrl}/user/${userId}`);
      setFormData({
        firstname: response.data.firstname,
        lastname: response.data.lastname,
        buyeremail: response.data.buyeremail,
        // UserImage: response.data.UserImage,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.put(`${baseUrl}/user/${userId}`, formData);
      // setMessage("Profile updated successfully!");

      toast.success("Successfully updated Profile");

      console.log("Updated user data:", response.data);
    } catch (error) {
      console.error("Error updating user data:", error);
      // setMessage("Failed to update profile.");
    }
  };

  return (
    <>
      <section className="My-profile-sec">
        {/* <ToastContainer /> */}
        <div className="container-ar">
          <div className="main-My-profile">
            <div className="My-profile-form">
              <h2>Profiel informatie</h2>

              <div className="My-profile-form-group-box">
                <div className="My-profile-form-group imger-uploder-box">
                  <label htmlFor="">Upload uw afbeelding</label>
                  <div className="imger-uploder-icon">
                    <input type="file" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="47"
                      height="47"
                      viewBox="0 0 47 47"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_4689_314)">
                        <path
                          d="M47 19.0173V27.9827C47 28.6576 46.4532 29.2053 45.7774 29.2053H29.2054V45.7773C29.2054 46.4531 28.6577 46.9999 27.9828 46.9999H19.0173C18.3428 46.9999 17.7948 46.453 17.7948 45.7773V29.2053H1.22257C0.547119 29.2053 0 28.6576 0 27.9827V19.0173C0 18.3422 0.547119 17.7947 1.22257 17.7947H17.7948V1.22256C17.7948 0.546848 18.3427 0 19.0173 0H27.9828C28.6577 0 29.2054 0.546848 29.2054 1.22256V17.7947H45.7774C46.4533 17.7947 47 18.3422 47 19.0173Z"
                          fill="black"
                          fill-opacity="0.2"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4689_314">
                          <rect width="47" height="47" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>

                <div className="My-profile-form-group">
                  <label htmlFor="">Voornaam</label>
                  <input
                    type="text"
                    placeholder="Voornaam"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                </div>

                <div className="My-profile-form-group">
                  <label htmlFor="">Achternaam</label>
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Achternaam"
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                </div>

                <div className="My-profile-form-group">
                  <label htmlFor=""> E-mailadres</label>
                  <input
                    type="email"
                    placeholder="E-mailadres"
                    name="buyeremail"
                    value={formData.buyeremail}
                    onChange={handleChange}
                  />
                </div>

                {/* <div className="My-profile-form-group">
                  <label htmlFor="">Interface taal</label>
                  <select name="cars" id="cars">
                    <option value="" selected disabled>select</option>
                    <option value="Option1">Option1</option>
                    <option value="Option2">Option2</option>
                    <option value="Option3">Option3</option>
                    <option value="Option4">Option4</option>
                  </select>

                </div> */}
              </div>
              <div className="My-profile-form-btn-box">
                <button onClick={handleSubmit}>Opslaan</button>
                {/* <button className="Change">Wachtwoord aanpassen</button> */}
              </div>
            </div>
            {/* 
            <div className="Email-Settings-box">
              <h2>Email Settings</h2>

              <div className="Email-Settings-group">
                <div className="Email-Settings-group-box">
                  <p>Email subscription status</p>
                </div>
                <button> <svg xmlns="http://www.w3.org/2000/svg" width="13" height="10" viewBox="0 0 13 10" fill="none">
                  <path d="M5.30827 10L4.34972 8.59137C3.47141 7.29993 0.911828 5.89602 0 5.46417L0.686563 3.98473C0.808844 4.0424 3.18277 5.17662 4.76369 6.63205C5.6483 4.85171 7.81727 1.64775 12.4646 0L13 1.54205C7.26131 3.57649 5.80552 8.31407 5.79109 8.3619L5.30827 10Z" fill="black" />
                </svg>Subscribed</button>
              </div>

              <div className="History-box">
                <h2>Email History</h2>
                <p>The following table lists all the emails sent to you. If you can’t find an email, please search for the Email subject in your  inbox and check your spam folder</p>
              </div>


              <div className="Question-box">
                <div className="Question-card">
                  <h3>Question of the week</h3>
                  <p>12/16/2024</p>
                </div>

                <div className="Question-card">
                  <h3>Confirmation gift email</h3>
                  <p>12/16/2024</p>
                </div>


                <div className="Question-card">
                  <h3>Log in to your account</h3>
                  <p>12/16/2024</p>
                </div>


                <div className="Question-card">
                  <h3>Purchase confirmation</h3>
                  <p>12/16/2024</p>
                </div>


      

              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default MyprofileA;
