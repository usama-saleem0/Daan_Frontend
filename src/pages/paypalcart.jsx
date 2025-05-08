import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';

const PayPalButtonComponentCart = () => {
  const { counter, price } = useSelector((state) => state.questionCounter);
  const handleCreateOrder = async (data, actions) => {
    // Fetch payment approval URL from backend
    const response = await fetch('http://localhost:5000/api/createPaymentcart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: price, description: 'Book Purchase' }),
    });

    console.log('Payment' , response)
    const { approvalUrl } = await response.json();
    console.log(approvalUrl, 'approval URL');

    // Redirect user to approval URL
    if (approvalUrl) {
        // Redirect user to approval URL in the same tab
        window.location.href = approvalUrl;
      } else {
        console.error('Approval URL not found.');
      }
  };


  const createOrder = async () => {


    localStorage.setItem("pricecart", price);
    localStorage.setItem("countercart", counter);

    // Call your backend to create a payment
    const response = await fetch('http://localhost:5000/api/create-payment-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: price, description: 'Test Payment' }),
    });

    const data = await response.json();
    window.location.href = data.approvalUrl
    console.log(data.approvalUrl , 'dataaass');

    // Ensure order ID is returned

    if (data.approvalUrl) {
        console.log('kkggkkjhj') 
        // Redirect user to approval URL in the same tab
        window.location.href = data.approvalUrl;
      } else {
        console.error('Approval URL not found.');
      }
    

    return data.tokan;
  };


  const handleApprove = async (data, actions) => {
    try {
      // Execute the payment to capture the funds
      await actions.payment.execute();

      // Now, let's get the data from localStorage and send it to your backend
      const savedFormData = JSON.parse(localStorage.getItem('signupData'));

      // Send the saved user data to your backend (user save API)
      const apiResponse = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(savedFormData),
      });

      if (apiResponse.ok) {
        console.log('User data saved successfully!');
        // Optionally, you can clear localStorage after saving the data
        localStorage.removeItem('signupData');
        // Redirect user to the next step (e.g., a success page)
        navigate("/login");
      } else {
        console.error('Failed to save user data:', apiResponse.statusText);
      }
    } catch (error) {
      console.error('Error during payment approval:', error);
    }
  };


  return (
    <PayPalScriptProvider options={{ 'client-id': 'AcPjWOnu_FwvdRdDpG1jCZ1FbEiXamQpwi3t4lUGY_GIH8lpLKsg7RNWl7qO2qK-Mt5TikR8XUWdL6EQ' }}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={handleApprove}
        onError={(err) => console.error('PayPal button error:', err)}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButtonComponentCart;
