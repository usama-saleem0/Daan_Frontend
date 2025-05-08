import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const SuccessCartPage = () => {



  const navigate = useNavigate();
  const [orderdone, setOrderdone] = useState(false);


  // const { counter, price } = useSelector((state) => state.questionCounter);


  // useEffect(() => {
  //   handleSubmit()
   
  // }, []);


  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (!orderdone) {
        handleSubmit()
        
      }

      
    }, 500);  // Delay API call by 500ms after the user stops interacting
  
    return () => clearTimeout(debounceTimer);
  }, [orderdone]);






  const handleSubmit = async (actions) => {
    try {
   
   

     
      const userId = localStorage.getItem("userId");

      const cartId = localStorage.getItem("cartId");
      const counter = localStorage.getItem("countercart");

      const price = localStorage.getItem("pricecart");


      const saveData ={
        userId,
        cartId,
        price,
        counter
      
      }

   
      const apiResponse = await fetch('http://localhost:5000/api/orderpayemt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saveData),
      });

      if (apiResponse.ok) {
        console.log('User data saved successfully!');
       
        localStorage.removeItem('countercart');
        localStorage.removeItem('pricecart');
        localStorage.removeItem('cartId');
        setOrderdone(true)


       
        setTimeout(() => {
          navigate("/dashboard");
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

export default SuccessCartPage;
