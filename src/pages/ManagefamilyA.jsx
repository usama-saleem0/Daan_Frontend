import React, { useState } from "react";

import book from '../assets/book.png'
import AddNewFamilypopup from "./AddNewFamilypopup ";
import axios from "axios";
import { baseUrl } from "../baseUrl";

import { toast, ToastContainer } from "react-toastify";

const ManagefamilyA = () => {

  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    frequency: "",
    hide: "",
    pause: "",
  });


  // Function to toggle popup
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };


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

    console.log('form submit' , formData);
  
    try {
      const response = await axios.put(`${baseUrl}/user_settings/${userId}`, formData);
      // localStorage.setItem("currentuser", response.data.user);
      localStorage.setItem("currentuser", JSON.stringify(response.data.user));
      
      toast.success('Successfully added settings')
     
    
    } catch (error) {
      console.error("Error updating user data:", error);
     
    }
  };

  return (
    <>
      <section className="My-profile-sec">
        {/* <ToastContainer/> */}
        <div className="container-ar">
          <div className="main-My-profile">
            <div className="My-profile-form">

              <div className="book-img-book">
                <img src={book} alt="" />
              </div>
              <h2>Beheer toegang voor mijn familie</h2>
<div className="admin-box">
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
  <path d="M15.0227 6.46631C10.7766 6.46631 7.30762 9.93532 7.30762 14.1814C7.30762 16.4016 8.27894 18.5385 9.91631 19.9816C11.1374 21.2027 11.0264 23.8114 10.9986 23.8391C10.9986 23.9779 11.0264 24.0889 11.1374 24.1999C11.2207 24.2831 11.3594 24.3386 11.4704 24.3386H18.5472C18.686 24.3386 18.797 24.2831 18.8802 24.1999C18.9635 24.1166 19.019 23.9779 19.019 23.8391C19.019 23.8114 18.8802 21.2027 20.1013 19.9816C20.1291 19.9538 20.1568 19.9261 20.1846 19.8983C21.7942 18.4275 22.7378 16.3461 22.7378 14.1814C22.7378 9.93532 19.2688 6.46631 15.0227 6.46631ZM19.463 19.26C19.4353 19.2878 19.3798 19.3433 19.3798 19.371C18.2974 20.5366 18.1032 22.4515 18.0754 23.3673H11.9422C11.9145 22.4515 11.7202 20.4534 10.5546 19.26C9.08375 17.9834 8.22344 16.124 8.22344 14.1536C8.22344 10.4071 11.2484 7.38213 14.9949 7.38213C18.7415 7.38213 21.7665 10.4071 21.7665 14.1536C21.7665 16.124 20.9339 17.9834 19.463 19.26Z" fill="#231F20"/>
  <path d="M14.9952 8.43652C14.7455 8.43652 14.5234 8.65854 14.5234 8.90831C14.5234 9.15808 14.7455 9.38009 14.9952 9.38009C17.7982 9.38009 20.0461 11.6558 20.0461 14.431C20.0461 14.6807 20.2681 14.9028 20.5179 14.9028C20.7677 14.9028 20.9897 14.6807 20.9897 14.431C21.0174 11.1285 18.3255 8.43652 14.9952 8.43652Z" fill="#231F20"/>
  <path d="M18.0756 24.866H11.9146C11.2763 24.866 10.749 25.3933 10.749 26.0316C10.749 26.6699 11.2763 27.1971 11.9146 27.1971H18.0478C18.7139 27.1694 19.2412 26.6699 19.2412 26.0316C19.2412 25.3933 18.7139 24.866 18.0756 24.866ZM18.0756 26.2258H11.9146C11.8036 26.2258 11.6926 26.1426 11.6926 26.0038C11.6926 25.865 11.7759 25.7818 11.9146 25.7818H18.0478C18.1588 25.7818 18.2698 25.865 18.2698 26.0038C18.2698 26.1426 18.1866 26.2258 18.0756 26.2258Z" fill="#231F20"/>
  <path d="M17.16 27.6689H12.8306C12.1923 27.6689 11.665 28.1962 11.665 28.8345C11.665 29.4728 12.1923 30.0001 12.8306 30.0001H17.16C17.7982 30.0001 18.3255 29.4728 18.3255 28.8345C18.3255 28.1685 17.7982 27.6689 17.16 27.6689ZM17.16 29.0288H12.8306C12.7196 29.0288 12.6086 28.9455 12.6086 28.8068C12.6086 28.668 12.6919 28.5848 12.8306 28.5848H17.16C17.271 28.5848 17.382 28.668 17.382 28.8068C17.382 28.9455 17.271 29.0288 17.16 29.0288Z" fill="#231F20"/>
  <path d="M14.9952 4.16281C15.2727 4.16281 15.467 3.9408 15.467 3.69103V0.471785C15.467 0.222017 15.245 0 14.9952 0C14.7455 0 14.5234 0.222017 14.5234 0.471785V3.69103C14.5234 3.9408 14.7455 4.16281 14.9952 4.16281Z" fill="#231F20"/>
  <path d="M22.8491 2.38664C22.6271 2.22013 22.3496 2.30339 22.2108 2.49765L20.4347 5.16185C20.2682 5.38387 20.3237 5.68914 20.5457 5.8279C20.629 5.8834 20.7122 5.91116 20.7955 5.91116C20.962 5.91116 21.1008 5.8279 21.184 5.68914L22.9601 3.02494C23.1267 2.83068 23.0712 2.5254 22.8491 2.38664Z" fill="#231F20"/>
  <path d="M9.361 5.8002C9.44426 5.8002 9.52751 5.77245 9.61077 5.71694C9.83278 5.57818 9.88829 5.27291 9.74953 5.0509L8.0289 2.35894C7.89014 2.13693 7.58487 2.08142 7.36285 2.22018C7.14083 2.35894 7.08533 2.66422 7.22409 2.88623L8.94472 5.57818C9.05573 5.7447 9.19449 5.8002 9.361 5.8002Z" fill="#231F20"/>
  <path d="M6.00322 8.74182L3.20026 7.21546C2.97824 7.10445 2.67297 7.18771 2.56196 7.40972C2.4232 7.63174 2.50646 7.93701 2.75623 8.04802L5.55919 9.57439C5.64244 9.60214 5.69795 9.62989 5.7812 9.62989C5.94772 9.62989 6.11423 9.54663 6.19749 9.38012C6.30849 9.15811 6.22524 8.85283 6.00322 8.74182Z" fill="#231F20"/>
  <path d="M27.4554 7.40972C27.3444 7.18771 27.0391 7.10445 26.8171 7.21546L23.9864 8.74182C23.7644 8.85283 23.6811 9.15811 23.7921 9.38012C23.8754 9.54663 24.0419 9.62989 24.2084 9.62989C24.2917 9.62989 24.3749 9.60214 24.4304 9.57439L27.2611 8.04802C27.4831 7.93701 27.5664 7.63174 27.4554 7.40972Z" fill="#231F20"/>
</svg>
<p>Een beheerder (admin) kan de vragen aanpassen. Een gebruiker met alleen-lezen rechten kan alleen de verhalen bekijken.
</p>
</div>

<div className="Wouter-main-box">
  <div className="Wouter-box">
    <h4>Wouter</h4>
    <h5>woutervbreemen@gmail.com</h5>
    <p>Schrijver</p>
  </div>

  <div className="Wouter-Edit-box">
    <p>E-mail geschiedenis</p>
    <p>Bewerken</p>
    <p>Verwijderen</p>
  </div>

  
</div>

<div className="Add-New-Family-Member-btn">
<button onClick={togglePopup}>Voeg een nieuw familielid toe</button>
              </div>
              <div className="My-profile-form-group-box">
                <h2>E-mailvoorkeuren voor je boek
                </h2>
                <div className="My-profile-form-group full-with-box">
                  <label htmlFor="">Hoe vaak wil je vragen ontvangen?</label>
                  <select name="frequency" id="cars" value={formData.frequency} onChange={handleChange}>
                    <option value="" selected disabled>select</option>
                    <option value="every day">Elke dag</option>
                    <option value="every week">elke week</option>

                    <option value="every month">elke maand</option>
                    
                  
                
                  </select>
                </div>


                <div className="My-profile-form-group full-with-box">
                  <label htmlFor="">	Komende vragen verbergen? </label>
                  <select  id="cars"   name="hide"  value={formData.hide} onChange={handleChange}>
                    <option value="" selected disabled>select</option>
                    <option value="no">Nee</option>
                    <option value="yes">ja</option>
                    
                  </select>
                </div>


                <div className="My-profile-form-group full-with-box">
                  <label htmlFor="">	Wil je de vragen tijdelijk pauzeren?</label>
                  <select id="cars"   name="pause"  value={formData.pause} onChange={handleChange}>
                    <option value="" selected disabled>select</option>
                    <option value="no">Nee</option>
                    <option value="yes">ja</option>
                  </select>
                </div>

                {/* <div className="My-profile-form-group full-with-box">
                  <label htmlFor="">Taal van het boek</label>
                  <select name="cars" id="cars">
                    <option value="" selected disabled>select</option>
                    <option value="Option1">Engels </option>
                 
                  </select>

                </div> */}


              </div>

              <div className="My-profile-form-btn-box">
                <button onClick={handleSubmit}>Opslaan</button>
           
              </div>

      
            </div>

     
          

              {/* <div className="History-box">
                <h2> Cadeau-e-mail instellen</h2>
                <p>Hier kun je de details aanpassen voor de cadeau-e-mail die naar de ontvanger wordt gestuurd.</p>

             
                <div className="My-profile-form-group full-with-boxx">
                  <label htmlFor="">Verzonden door:</label>
                  <input type="text" placeholder="E-mail adres" />
                </div>


       <div className="email-gift-box">
        <p>Ontvangers</p>
        <p>
Alle schrijvers van het boek ontvangen deze e-mail.
</p>
       </div>
                
                   
                <div className="My-profile-form-group full-with-boxx">
                  <label htmlFor="">Verzenddatum</label>
                  <input type="date" placeholder="" />
                </div>

                <div className="My-profile-form-group full-with-boxx">
                  <label htmlFor="">Jouw persoonlijke boodschap</label>
                  <textarea name="" id=""></textarea>
                </div>

                <div className="My-profile-form-btn-box">
                <button>Opslaan</button>
                <button className="Change">Bericht opnieuw verzenden</button>
              </div>
              </div> */}



              

    
          </div>
        </div>
        {showPopup && (
  <>
    <div className="popup-backdrop" onClick={togglePopup}></div>
    <div className="Add-New-Family-Member-popup-box">
      <AddNewFamilypopup />
      <button className="clous-btn" onClick={togglePopup}><svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 65 65" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M32.5 0C14.5632 0 0 14.5632 0 32.5C0 50.4367 14.5632 65 32.5 65C50.4367 65 65 50.4367 65 32.5C65 14.5632 50.4367 0 32.5 0ZM27.9013 32.5L18.7103 23.3057C17.4427 22.0382 17.4427 19.9778 18.7103 18.7103C19.9778 17.4427 22.0382 17.4427 23.3057 18.7103L32.5 27.9045L41.691 18.7103C42.9585 17.4427 45.019 17.4427 46.2865 18.7103C47.5573 19.9778 47.5573 22.0382 46.2865 23.3057L37.0955 32.5L46.2865 41.691C47.5573 42.9585 47.5573 45.019 46.2865 46.2865C45.019 47.5573 42.9585 47.5573 41.691 46.2865L32.5 37.0955L23.3057 46.2865C22.0382 47.5573 19.9778 47.5573 18.7103 46.2865C17.4427 45.019 17.4427 42.9585 18.7103 41.691L27.9013 32.5Z" fill="black"/>
</svg></button>
    </div>
  </>
)}
      </section>
    </>
  );
};

export default ManagefamilyA;
