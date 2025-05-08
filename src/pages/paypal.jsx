import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButtonComponent = () => {
 
  const createOrder = async () => {
    // Call your backend to create a payment
    const response = await fetch('http://localhost:5000/api/create-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: '90.00', description: 'Test Payment' }),
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
    

    // return data.tokan;
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

export default PayPalButtonComponent;
