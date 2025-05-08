import React, { useState } from "react";

import book from '../assets/book.png'
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { toast, ToastContainer } from "react-toastify";

const AddNewFamilypopup  = () => {


  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",

  });



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
      const response = await axios.put(`${baseUrl}/add_member/${userId}`, formData);
    
      localStorage.setItem("currentuser", JSON.stringify(response.data.user));
      
      toast.success('Successfully added settings')
     
    
    } catch (error) {
      console.error("Error updating user data:", error);
     
    }
  };



  return (
    <>
    {/* <ToastContainer/> */}
   <section className="AddNew-Family-popup">
<div className="AddNew-Family-popup-main">
  <h2>
  Nieuw familielid toevoegen</h2>

  <div className="AddNew-Family-popup-form">
    <div className="AddNew-Family-popup-group">
      <label htmlFor=""> 
      Voornaam</label>
      <input type="text"placeholder="Voornaam"
        name="firstname"
        value={formData.firstname}
        onChange={handleChange}
      />
    </div>

    <div className="AddNew-Family-popup-group">
      <label htmlFor=""> 
      Achternaam</label>
      <input type="text"placeholder="Achternaam" 
       name="lastname"
       value={formData.lastname}
       onChange={handleChange}
      />
    </div>


    <div className="AddNew-Family-popup-group">
      <label htmlFor="">E-mail</label>
      <input type="email"placeholder="E-mail" 
       name="email"
       value={formData.email}
       onChange={handleChange} />
    </div>


    <div className="AddNew-Family-popup-group">
      <label htmlFor="">Rol</label>
      <input type="email"placeholder="Rol" 
      name="role"
      value={formData.role}
      onChange={handleChange}
      />
    </div>

    <div className="My-profile-form-btn-box">
                <button onClick={handleSubmit}>Wijziging opslaan</button>
                <button className="Change">Annuleren</button>
              </div>
  </div>
</div>
   </section>
    </>
  );
};
export default AddNewFamilypopup;
