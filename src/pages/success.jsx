import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const SuccessPage = () => {

  const navigate = useNavigate();


  useEffect(() => {
    handleSubmit()

  }, []);






  const handleSubmit = async (data, actions) => {
    try {




      const savedFormData = JSON.parse(localStorage.getItem('signupData'));


      const apiResponse = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(savedFormData),
      });

      if (apiResponse.ok) {
        console.log('User data saved successfully!');

        localStorage.removeItem('signupData');

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        console.error('Failed to save user data:', apiResponse.statusText);
      }
    } catch (error) {
      console.error('Error during payment approval:', error);
    }
  };


  return (

    <div>
      <div
      >
        <h1>
          Succesvol
        </h1>

      </div>


    </div>

  );
};

export default SuccessPage;
