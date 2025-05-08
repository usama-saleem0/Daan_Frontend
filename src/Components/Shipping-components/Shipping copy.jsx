import React, { useEffect, useState } from "react";
import Informationbook from "../../assets/Information.png";
import Shippingbook from "./Shippingbook";
import { decrementcounter, increment, incrementcounter, updateCounterAndPrice } from "../../Redux/Features/QuestionsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AddtoCart, getCartElement } from "../../Redux/Features/UserSlice";
import { toast, ToastContainer } from "react-toastify";
const Shipping = () => {


  const [selectedImages, setselectedImages] = useState(localStorage.getItem("image"));
  // const [price, setPrice] = useState(90);
  // const [counter, setCounter] = useState(1);

  const { counter, price } = useSelector((state) => state.questionCounter);
  const [formData, setFormData] = useState([]);
  const [cartData, setcartData] = useState(null);


  const userId = localStorage.getItem("userId");

  const dispatch = useDispatch();

  const handleInputChanges = (index, field, value) => {
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...updatedFormData[index],
      [field]: value,
      userId, // Add userId to each entry
    };
    setFormData(updatedFormData);
  };


  const handleInputChange = (index, field, value) => {
    setcartData((prev) => {
      // Make a shallow copy of cartData's formData array
      const updatedFormData = [...prev.formData];

      // Update the specific field in the specified index
      updatedFormData[index] = {
        ...updatedFormData[index], // Retain other fields
        [field]: value,
        userId, // Ensure userId is present
      };

      // Return the updated cartData object
      return {
        ...prev,
        formData: updatedFormData,
      };
    });
  };



  useEffect(() => {

    getCart()


  }, []);


  const handleSubmit = async (e) => {


    const savedContent = localStorage.getItem("savedHTMLContent");



    const payloads = {
      userId,
      formData: cartData.formData,
      counter,
      price,
      book: savedContent,
      cover: selectedImages
    };
    console.log('Submit', payloads)






    const result = await dispatch(AddtoCart(payloads));



    console.log(result.payload, "Ussssssk");

    toast.success('Successfully added to cart now you can proceed to Checkout')

  }



  const handleSubmits = async (e) => {


    const savedContent = localStorage.getItem("savedHTMLContent");



    const payloads = {
      userId,
      formData,
      counter,
      price,
      book: savedContent,
      cover: selectedImages
    };
    console.log('Submit', payloads)






    const result = await dispatch(AddtoCart(payloads));



    console.log(result.payload, "Ussssssk");

    toast.success('Successfully added to cart now you can proceed to Checkout')

  }


  const getCart = async (e) => {
    const result = await dispatch(getCartElement(userId));

    if (result.payload && result.payload.cart) {

      setcartData(result.payload.cart)

      const newCounter = result.payload.cart.counter

      const newPrice = result.payload.cart.price



      dispatch(updateCounterAndPrice({ counter: newCounter, price: newPrice }));


      console.log(result.payload.cart, "Ussssssk");

    }






  }


  const decrementcount = async (e) => {

    dispatch(decrementcounter())

  }


  const incrementcount = async (e) => {

    dispatch(incrementcounter())



  }






  return (
    <>
      {/* <ToastContainer /> */}
      <div className="Shipping-box">
        <div className="container-ar">
          <div className="main-Shipping">
            <div className="Shipping-box-1">
              <h2>Verzendinformatie</h2>

              <div className="Information-box">
                <div className="Information-Book-box">
                  <div className="Information-Book-img">
                    <img src={selectedImages} alt="" />
                  </div>
                  <div className="Information-Book-tital">
                    <h2>Mijn boek
                    </h2>
                    <p>Voorlopig geen geschenkdoosoptie. Ze praten ook over het afdrukken van kredieten. Iets om op te letten. </p>
                  </div>
                </div>

                <div className="Information-Book-no-box">
                  <span><svg xmlns="http://www.w3.org/2000/svg" width="26" height="6" viewBox="0 0 26 6" fill="none" onClick={decrementcount} >
                    <path d="M22.9413 0H16.0952H9.90476H3.05871C1.37676 0 0 1.3692 0 3C0 4.6308 1.37676 6 3.05871 6H9.90476H16.0952H22.9413C24.6232 6 26 4.6308 26 3C26 1.3692 24.6232 0 22.9413 0Z" fill="black" />
                  </svg>

                    <p>{counter}</p>

                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none" onClick={incrementcount}>
                      <g clip-path="url(#clip0_4184_2992)">
                        <path d="M20.9785 9.47852H13.5215V2.02148C13.5215 0.905041 12.6164 0 11.5 0C10.3836 0 9.47852 0.905041 9.47852 2.02148V9.47852H2.02148C0.905041 9.47852 0 10.3836 0 11.5C0 12.6164 0.905041 13.5215 2.02148 13.5215H9.47852V20.9785C9.47852 22.095 10.3836 23 11.5 23C12.6164 23 13.5215 22.095 13.5215 20.9785V13.5215H20.9785C22.095 13.5215 23 12.6164 23 11.5C23 10.3836 22.095 9.47852 20.9785 9.47852Z" fill="black" />
                      </g>
                      <defs>
                        <clipPath id="clip0_4184_2992">
                          <rect width="23" height="23" fill="white" />
                        </clipPath>
                      </defs>
                    </svg></span>

                  <p>€{price}.00</p>
                </div>
              </div>
              <h2>Verzendinformatie</h2>


              <div className="Information-from-box">

                <div style={{ width: '100%' }} className="Information-from-box">


                  {/* {Array.from({ length: counter }).map((_, index) => (
          <div key={index} className="Information-from-box">
            <div className="Information-group">
              <label htmlFor="">First Name</label>
              <input
                type="text"
                placeholder="First name"
                onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
              />
            </div>

            <div className="Information-group">
              <label htmlFor="">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                onChange={(e) => handleInputChange(index, 'email', e.target.value)}
              />
            </div>

            <div className="Information-group more-Information-group">
              <label htmlFor="">Shipping Address</label>
              <input
                type="text"
                placeholder="Street address"
                onChange={(e) => handleInputChange(index, 'address', e.target.value)}
              />
            </div>
          </div>
        ))} */}




                  {/* {cartData?.formData.length > 0 
                ? cartData.formData.map((cartItem, index) => (
                    <div key={index} className="Information-from-box">
                      <div className="Information-group">
                        <label htmlFor="">First Name</label>
                        <input
                          type="text"
                          placeholder="First name"
                          value={cartItem.firstName || ''}
                          onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                        />
                      </div>

                      <div className="Information-group">
                        <label htmlFor="">Email Address</label>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={cartItem.email || ''}
                          onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                        />
                      </div>

                      <div className="Information-group more-Information-group">
                        <label htmlFor="">Shipping Address</label>
                        <input
                          type="text"
                          placeholder="Street address"
                          value={cartItem.address || ''}
                          onChange={(e) => handleInputChange(index, 'address', e.target.value)}
                        />
                      </div>
                    </div>
                  ))
                : Array.from({ length: counter }).map((_, index) => (
                    <div key={index} className="Information-from-box">
                      <div className="Information-group">
                        <label htmlFor="">First Name</label>
                        <input
                          type="text"
                          placeholder="First name"
                          onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                        />
                      </div>

                      <div className="Information-group">
                        <label htmlFor="">Email Address</label>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                        />
                      </div>

                      <div className="Information-group more-Information-group">
                        <label htmlFor="">Shipping Address</label>
                        <input
                          type="text"
                          placeholder="Street address"
                          onChange={(e) => handleInputChange(index, 'address', e.target.value)}
                        />
                      </div>
                    </div>
                  ))
              } */}




                  {cartData?.formData.length > 0
                    ? Array.from({ length: counter }).map((_, index) => (
                      <div key={index} className="Information-from-box">
                        <div className="Information-group">
                          <label htmlFor="">Naam     </label>
                          <input
                            type="text"
                            placeholder="Naam     "


                            value={cartData.formData[index]?.firstName || ''}
                            onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                          />
                        </div>

                        <div className="Information-group">
                          <label htmlFor="">
                            E-mailadres</label>
                          <input
                            type="email"
                            placeholder="Enter 
E-mailadres"
                            value={cartData.formData[index]?.email || ''}
                            onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                          />
                        </div>

                        <div className="Information-group more-Information-group">
                          <label htmlFor="">Adres</label>
                          <input
                            type="text"
                            placeholder="Adres"
                            value={cartData.formData[index]?.address || ''}
                            onChange={(e) => handleInputChange(index, 'address', e.target.value)}
                          />
                        </div>


                        <div className="Information-group">
                          <label htmlFor="">Country</label>
                          <input
                            type="text"
                            placeholder="city"
                            value={cartData.formData[index]?.country || ''}
                            onChange={(e) => handleInputChange(index, 'country', e.target.value)}
                          />
                        </div>


                        <div className="Information-group">
                          <label htmlFor="">City</label>
                          <input
                            type="text"
                            placeholder="city"
                            value={cartData.formData[index]?.city || ''}
                            onChange={(e) => handleInputChange(index, 'city', e.target.value)}
                          />
                        </div>




                        <div className="Information-group">
                          <label htmlFor="">My Book</label>
                          <input
                            type="text"
                            placeholder="mybook"
                            value={cartData.formData[index]?.mybook || ''}
                            onChange={(e) => handleInputChange(index, 'mybook', e.target.value)}
                          />
                        </div>


                        <div className="Information-group">
                          <label htmlFor="">Zip Code</label>
                          <input
                            type="text"
                            placeholder="zipcode"
                            value={cartData.formData[index]?.zipcode || ''}
                            onChange={(e) => handleInputChange(index, 'zipcode', e.target.value)}
                          />
                        </div>






                      

                      </div>
                    ))
                    : Array.from({ length: counter }).map((_, index) => (
                      <div key={index} className="Information-from-box">
                        <div className="Information-group">
                          <label htmlFor="">Naam</label>
                          <input
                            type="text"
                            placeholder="Naam"
                            onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}

                          />
                        </div>

                        <div className="Information-group">
                          <label htmlFor=""> E-mailadres</label>
                          <input
                            type="email"
                            placeholder="E-mailadres"
                            onChange={(e) => handleInputChange(index, 'email', e.target.value)}


                          />
                        </div>

                        <div className="Information-group more-Information-group">
                          <label htmlFor="">Adress</label>
                          <input
                            type="text"
                            placeholder="Adress"
                            onChange={(e) => handleInputChange(index, 'address', e.target.value)}


                          />
                        </div>

                        {/* <div className="Information-group">
                          <label htmlFor="">Country</label>
                          <input
                            type="text"
                            placeholder="country"
                           
                            onChange={(e) => handleInputChange(index, 'country', e.target.value)}
                          />
                        </div>


                        <div className="Information-group">
                          <label htmlFor="">City</label>
                          <input
                            type="text"
                            placeholder="city"
                           
                            onChange={(e) => handleInputChange(index, 'city', e.target.value)}
                          />
                        </div>


                        <div className="Information-group">
                          <label htmlFor="">My Book</label>
                          <input
                            type="text"
                            placeholder="mybook"
                           
                            onChange={(e) => handleInputChange(index, 'mybook', e.target.value)}
                          />
                        </div>


                        <div className="Information-group">
                          <label htmlFor="">Zip Code</label>
                          <input
                            type="text"
                            placeholder="zipcode"
                           
                            onChange={(e) => handleInputChange(index, 'zipcode', e.target.value)}
                          />
                        </div> */}



                      </div>
                    ))}


                </div>

                <div className="btn-box-Confirm">
                  <button onClick={handleSubmit}>Bevestig mijn gegevens</button>

                  {
                    cartData?.formData.length > 0 ?
                      <button onClick={handleSubmit}>Confirm</button>
                      :
                      <button onClick={handleSubmits}>Confirm</button>


                  }
                </div>


              </div>
            </div>

            <div className="Shipping-box-2">
              <Shippingbook />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
