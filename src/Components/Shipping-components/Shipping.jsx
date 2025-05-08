import React, { useEffect, useState } from "react";
import Informationbook from "../../assets/Information.png";
import Shippingbook from "./Shippingbook";
import {
  decrementcounter,
  increment,
  incrementcounter,
  updateCounterAndPrice,
  incrementstep,
  decrementstep,
  setUserDetails,
} from "../../Redux/Features/QuestionsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AddtoCart, getCartElement } from "../../Redux/Features/UserSlice";
import { toast, ToastContainer } from "react-toastify";
import ArrowRightIcon from "../../svgsIcons/ArrowRightIcon copy";
import ArrowLeftIcon from "../../svgsIcons/ArrowLeftIcon";
import { baseUrl } from "../../baseUrl";
import Game from "../../assets/Game.png";
import Audio from "../../assets/Audio.png";
import * as yup from "yup";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

const userSchema = yup.object().shape({
  userDetails: yup.array().of(
    yup.object().shape({
      firstName: yup.string().required("Name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      address: yup.string().required("Address is required"),
      country: yup.string().required("Country is required"),
      city: yup.string().required("City is required"),
      mybook: yup.string().required("Book is required"),
      zipcode: yup.string().required("Zip code is required"),
    })
  ),
});

const Shipping = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      userDetails: [
        {
          firstName: "",
          email: "",
          address: "", // Initialize with array of objects
          country: "",
          city: "",
          mybook: "",
          zipcode: "",
        },
      ],
    },
  });

  const currentStep = useSelector((state) => state.questionCounter.activeStep);
  const [selectedImages, setSelectedImages] = useState(
    localStorage.getItem("image")
  );
  const activeStep = useSelector((state) => state.questionCounter.activeStep);
  const [bookData, setBookData] = useState(() => {
    const stored = localStorage.getItem("groupedData");
    return stored ? JSON.parse(stored) : null;
  });
  const { counter, price } = useSelector((state) => state.questionCounter);
  const [formData, setFormData] = useState([]);
  const [cartData, setCartData] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const navigate = useNavigate();
  const audioBookPrice = 300.0;
  const playGamePrice = 900.0;
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  // Main user details field array
  const {
    fields: userFields,
    append: appendUser,
    remove: removeUser,
  } = useFieldArray({
    control,
    name: "userDetails",
  });

  // Create an array of address field arrays for each user
  // const addressFieldArrays = userFields?.map((_, index) => {
  //   return useFieldArray({
  //     control,
  //     name: `userDetails.${index}.address`,
  //   });
  // });

  const handleSelection = (item, itemPrice) => {
    setSelectedItems((prev) => {
      const updatedItems = { ...prev };

      if (updatedItems[item]) {
        delete updatedItems[item];
      } else {
        updatedItems[item] = itemPrice;
      }

      const newPrice =
        90 + Object.values(updatedItems).reduce((sum, val) => sum + val, 0);
      dispatch(updateCounterAndPrice({ counter, price: newPrice }));

      return updatedItems;
    });
  };

  const handleInputChanges = (index, field, value) => {
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...updatedFormData[index],
      [field]: value,
      userId,
    };
    setFormData(updatedFormData);
  };

  const handleInputChange = (index, field, value) => {
    setCartData((prev) => {
      const updatedFormData = [...prev.formData];
      updatedFormData[index] = {
        ...updatedFormData[index],
        [field]: value,
        userId,
      };
      return {
        ...prev,
        formData: updatedFormData,
      };
    });
  };

  const getCart = async () => {
    const result = await dispatch(getCartElement(userId));
    if (result.payload && result.payload.cart) {
      setCartData(result.payload.cart);
      const newCounter = result.payload.cart.counter;
      const newPrice = result.payload.cart.price;
      dispatch(updateCounterAndPrice({ counter: newCounter, price: newPrice }));
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const hanldeSend = async () => {
    try {
      if (!cartData) {
        toast.error("Cart data is missing. Please fill out the form first.");
        return;
      }

      const payloads = {
        userId,
        formData: cartData.formData,
        counter,
        price,
        book: bookData,
        cover: selectedImages,
      };
      const result = await dispatch(AddtoCart(payloads)).unwrap();
      toast.success(
        "Successfully added to cart now you can proceed to Checkout"
      );

      setTimeout(() => {
        getCart();
      }, 1000);
    } catch (error) {
      console.error("Cart update failed:", error);
      toast.error("Failed to update cart");
    }
  };

  const decrementcount = () => {
    dispatch(decrementcounter());
    removeUser(userFields.length - 1);
  };

  const incrementcount = () => {
    dispatch(incrementcounter());
    appendUser({
      firstName: "",
      email: "",
      address: "", // ✅ now a single string
      country: "",
      city: "",
      mybook: "",
      zipcode: "",
    });
  };

  const onSubmit = async (data) => {
    try {
          

      const payloads = {
        userId,
        formData: data?.userDetails,
        counter,
        price,
        book: bookData,
        cover: selectedImages,
      };
      const result = await dispatch(AddtoCart(payloads)).unwrap();

      if (result.cart._id) {
        localStorage.setItem("cartId", result.cart._id);
        dispatch(incrementstep(6));
        toast.success(
          "Successfully added to cart now you can proceed to Checkout"
        );
        setTimeout(() => {
          getCart();
        }, 1000);
      } else {
        toast.error("Failed to update cart");
      }
    } catch (error) {
      console.error("Cart update failed:", error);
      toast.error("Failed to update cart");
    }
  };

  return (
    <>
      <div className="navigation--site">
        <button
          className="animated-button"
          onClick={() => dispatch(decrementstep())}
          disabled={activeStep === 0}
        >
          <svg
            viewBox="0 0 24 24"
            className="arr-2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
          <span className="text">Terug naar Laatste controle</span>
          <span className="circle"></span>
          <svg
            viewBox="0 0 24 24"
            className="arr-1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
        </button>
        <button
          className="animated-button"
          onClick={() => dispatch(incrementstep(5))}
          disabled={!cartData || cartData <= 0}
          style={{
            backgroundColor: !cartData || cartData <= 0 ? "#9e9e9e" : "",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className="arr-2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
          <span className="text">Ga naar Afrekenen</span>
          <span className="circle"></span>
          <svg
            viewBox="0 0 24 24"
            className="arr-1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
        </button>
      </div>

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
                    <h2>Mijn boek</h2>
                    <p>
                      Voorlopig geen geschenkdoosoptie. Ze praten ook over het
                      afdrukken van kredieten. Iets om op te letten.
                    </p>
                  </div>
                </div>

                <div className="Information-Book-no-box">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="6"
                      viewBox="0 0 26 6"
                      fill="none"
                      onClick={decrementcount}
                    >
                      <path
                        d="M22.9413 0H16.0952H9.90476H3.05871C1.37676 0 0 1.3692 0 3C0 4.6308 1.37676 6 3.05871 6H9.90476H16.0952H22.9413C24.6232 6 26 4.6308 26 3C26 1.3692 24.6232 0 22.9413 0Z"
                        fill="black"
                      />
                    </svg>

                    <p>{counter}</p>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="23"
                      viewBox="0 0 23 23"
                      fill="none"
                      onClick={incrementcount}
                    >
                      <g clipPath="url(#clip0_4184_2992)">
                        <path
                          d="M20.9785 9.47852H13.5215V2.02148C13.5215 0.905041 12.6164 0 11.5 0C10.3836 0 9.47852 0.905041 9.47852 2.02148V9.47852H2.02148C0.905041 9.47852 0 10.3836 0 11.5C0 12.6164 0.905041 13.5215 2.02148 13.5215H9.47852V20.9785C9.47852 22.095 10.3836 23 11.5 23C12.6164 23 13.5215 22.095 13.5215 20.9785V13.5215H20.9785C22.095 13.5215 23 12.6164 23 11.5C23 10.3836 22.095 9.47852 20.9785 9.47852Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4184_2992">
                          <rect width="23" height="23" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>

                  <p>€{price}.00</p>
                </div>
              </div>

              <div className="Information-box">
                <div className="Information-Book-box">
                  <div className="Information-Book-img">
                    <img src={selectedImages} alt="" />
                  </div>
                  <div className="Information-Book-tital">
                    <h2>Audio Book</h2>
                    <p>
                      door naar ons audioboek te luisteren moet je het leuk
                      gevonden hebben. koop het dan
                    </p>
                  </div>
                </div>

                <div className="Information-Book-no-box">
                  <input
                    type="checkbox"
                    checked={!!selectedItems["AudioBook"]}
                    onChange={() =>
                      handleSelection("AudioBook", audioBookPrice)
                    }
                  />
                  <p>€{audioBookPrice}</p>
                </div>
              </div>

              <div className="Information-box">
                <div className="Information-Book-box">
                  <div className="Information-Book-img">
                    <img src={Game} alt="" />
                  </div>
                  <div className="Information-Book-tital">
                    <h2>Play Game</h2>
                    <p>Speel spelletjes met ons boek</p>
                  </div>
                </div>
                <div className="Information-Book-no-box">
                  <input
                    type="checkbox"
                    checked={!!selectedItems["PlayGame"]}
                    onChange={() => handleSelection("PlayGame", playGamePrice)}
                  />
                  <p>€{playGamePrice}</p>
                </div>
              </div>

              <h2>Verzendinformatie</h2>

              <div className="Information-from-box">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div
                    style={{ width: "100%" }}
                    className="Information-from-box"
                  >
                    {userFields.map((field, userIndex) => {
                    

                      return (
                        <div key={field.id} className="Information-from-box">
                          <div className="Information-group">
                            <label>Naam</label>
                            <input
                              type="text"
                              placeholder="Naam"
                              {...register(
                                `userDetails.${userIndex}.firstName`
                              )}
                            />
                            <p style={{ color: "red" }}>
                              {
                                errors?.userDetails?.[userIndex]?.firstName
                                  ?.message
                              }
                            </p>
                          </div>

                          <div className="Information-group">
                            <label>E-mailadres</label>
                            <input
                              type="email"
                              placeholder="E-mailadres"
                              {...register(`userDetails.${userIndex}.email`)}
                            />
                            <p style={{ color: "red" }}>
                              {errors?.userDetails?.[userIndex]?.email?.message}
                            </p>
                          </div>

                          <div className="Information-group">
                            <label>Adres</label>
                            <input
                              type="text"
                              placeholder="Adres"
                              {...register(`userDetails.${userIndex}.address`)}
                            />
                            <p style={{ color: "red" }}>
                              {
                                errors?.userDetails?.[userIndex]?.address
                                  ?.message
                              }
                            </p>
                          </div>

                          <div className="Information-group">
                            <label>Country</label>
                            <input
                              type="text"
                              placeholder="Country"
                              {...register(`userDetails.${userIndex}.country`)}
                            />
                            <p style={{ color: "red" }}>
                              {
                                errors?.userDetails?.[userIndex]?.country
                                  ?.message
                              }
                            </p>
                          </div>

                          <div className="Information-group">
                            <label>City</label>
                            <input
                              type="text"
                              placeholder="City"
                              {...register(`userDetails.${userIndex}.city`)}
                            />
                            <p style={{ color: "red" }}>
                              {errors?.userDetails?.[userIndex]?.city?.message}
                            </p>
                          </div>

                          <div className="Information-group">
                            <label>My Book</label>
                            <input
                              type="text"
                              placeholder="My Book"
                              {...register(`userDetails.${userIndex}.mybook`)}
                            />
                            <p style={{ color: "red" }}>
                              {
                                errors?.userDetails?.[userIndex]?.mybook
                                  ?.message
                              }
                            </p>
                          </div>

                          <div className="Information-group">
                            <label>Zip Code</label>
                            <input
                              type="text"
                              placeholder="Zip Code"
                              {...register(`userDetails.${userIndex}.zipcode`)}
                            />
                            <p style={{ color: "red" }}>
                              {
                                errors?.userDetails?.[userIndex]?.zipcode
                                  ?.message
                              }
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="btn-box-Confirm">
                    <button type="submit">Bevestig mijn gegevens</button>
                  </div>
                </form>
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
