//@ts-nocheck
// import React from "react";
import { useRoutes } from "react-router-dom";

import PDFGenerator from "../Components/Createpdf";
import FontCustomizer from "../Components/EditablePage";
import Dashboard from "../pages/Dashboard";
// import Chat1 from "../Components/Chat1";
import SampleBook from "../pages/SampleBook";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AudioRecorder from "../Components/texttospeech";
import VideoQr from "../Components/videoqr";
import FutureBook from "../pages/FutureBook";
import ReviewBook from "../pages/ReviewBook";
import Billing from "../pages/Billing";
import Payment from "../pages/Payment";
// import Shippingbook from "../Components/Shipping-components/Shippingbook";
import Shipping from "../Components/Shipping-components/Shipping";
import Checkout from "../Components/Shipping-components/Checkout";
import Ongeschreven from "../pages/Ongeschreven";
// import Loginmain from "../pages/Loginmain";
import Myaccount from "../pages/Myaccount";
import PayPalButtonComponent from "../pages/paypal";
import SuccessPage from "../pages/success";
import SuccessCartPage from "../pages/successcart";
import TextToSpeechComponent from "../pages/audiopage";

// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextToSpeechComponentss from "../pages/TextToSpeachComponent";

import Questionoftheweek from "../Components/Questionoftheweek";
import Chaptersfuture from "../Components/Chaptersfuture";
import AllQuestions from "../Components/AllQuestions";
import OngeschrevenMembership from "../Components/OngeschrevenMembership";
import Page404 from "../pages/Page404";
import Chapters from "../Components/Chapters";
import ChatModule from "../pages/ChatModule";
import UserChat from "../Components/UserChat";
import MyBook from "../Components/ExampleBook";
import Meeting from "../pages/Meeting";
import Chapterwithai from "../Components/withAi/Chapterwithai";
import UserChatWithAi from "../Components/withAi/UserChatWithAi";
import Chatwithai from "../Components/withAi/chatwithai";
import Qustionchat from "../pages/Qustionchat";
import ExploreQuestions from "../pages/ExploreQuestions";
import Main_page1 from "../New-from-page/Main_page1";
import Inner_page1 from "../New-from-page/Inner_page1";
import Inner_page2 from "../New-from-page/Inner_page2";
import Inner_page3 from "../New-from-page/Inner_page3";
import Overjou from "../Components/Overjou";
import Successful from "../pages/Successful";
import SuccessfulSubscription from "../pages/SuccessfulSubscription";
import Emailt1 from "../Components/page-email/Emailt1";


const Routes = () => {
  return useRoutes([
    {
      path: "*",
      element: <Page404 />,
    },
    {
      path: "/chat",
      element: <Dashboard />,
    },
    {
      path: "/chat-module/:questionId",
      element: <ChatModule />,
    },
    {
      path: "/exploreQuestion",
      element: <ExploreQuestions />,
    },
    {
      path: "/chat-moduleai/:questionId",
      element: <Chatwithai />,
    },
    {
      path: "/chapter/:userId",
      element: <Chapters />,
    },
    {
      path: "/chapterai/:userId",
      element: <Chapterwithai />,
    },

    {
      path: "/samplebook",
      element: <SampleBook />,
    },
    {
      path: "/dashboard",
      element: <FutureBook />,
    },
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/test",
      element: <TextToSpeechComponentss />,
    },
    {
      path: "/MyBook",
      element: <MyBook />,
    },
    {
      path: "/Qustionchat",
      element: <Qustionchat />,
    },





    {
      path: "/questionOfWeek",
      element: <Questionoftheweek />,
    },
    // {
    //   path: "/chapter",
    //   element: <Chaptersfuture/>,
    // },
    {
      path: "/Overjou",
      element: <Overjou />,
    },
    {
      path: "/allQuestions",
      element: <AllQuestions />,
    },
    // {
    //   path: "/",
    //   element: <Loginmain/>,
    // },
    {
      path: "/signup",
      element: <Signup />,
    },

    {
      path: "/Meeting",
      element: <Meeting />,
    },
    {
      path: "/Billing",
      element: <Billing />,
    },
    {
      path: "/Payment",
      element: <Payment />,
    },
    // {
    //   path: "/chat",
    //   element: <Chat1 />,
    // },
    // {
    //   path: "/chat2",
    //   element: <UserChat />,
    // },
    {
      path: "/pdf",
      element: <PDFGenerator />,
    },
    {
      path: "/userchatwithai",
      element: <UserChatWithAi />,
    },
    {
      path: "/font",
      element: <FontCustomizer />,
    },
    {
      path: "/speechtotext",
      element: <AudioRecorder />,
    },
    {
      path: "/videoqr",
      element: <VideoQr />,
    },
    {
      path: "/ReviewBook",
      element: <ReviewBook />,
    },
    {
      path: "/Myaccount",
      element: <Myaccount />,
    },
    {
      path: "/Shipping",
      element: <Shipping />,
    },
    {
      path: "/Checkout",
      element: <Checkout />,
    },
    {
      path: "/paypal",
      element: <PayPalButtonComponent />,
    },
    {
      path: "/onge-schreven",
      element: <Ongeschreven />,
    },

    {
      path: "/success",
      element: <SuccessPage />,
    },
    {
      path: "/success_cart",
      element: <SuccessCartPage />,
    },
    {
      path: "/audio",
      element: <TextToSpeechComponent />,
    },


    {
      path: "/OngeschrevenMembership",
      element: <OngeschrevenMembership />,
    },

    /* my-new-code-from *//* my-new-code-from *//* my-new-code-from *//* my-new-code-from *//* my-new-code-from *//* my-new-code-from */
    /* my-new-code-from *//* my-new-code-from *//* my-new-code-from *//* my-new-code-from *//* my-new-code-from *//* my-new-code-from */
    /* my-new-code-from *//* my-new-code-from *//* my-new-code-from *//* my-new-code-from *//* my-new-code-from *//* my-new-code-from */
    /* my-new-code-from *//* my-new-code-from *//* my-new-code-from *//* my-new-code-from *//* my-new-code-from *//* my-new-code-from */
    {
      path: "/Main_page1",
      element: <Main_page1 />,
    },

    {
      path: "/Inner_page1",
      element: <Inner_page1 />,
    },

    {
      path: "/Inner_page2",
      element: <Inner_page2 />,
    },
    {
      path: "/Inner_page3",
      element: <Inner_page3 />,
    },

    {
      path: "/Emailt1",
      element: <Emailt1 />,
    },


    {
      path: "/Successful/:mobilleId/:orderId",
      element: <Successful />,
    },
    {
      path: "/Successful_Subscription",
      element: <SuccessfulSubscription />,
    },
    /* my-new-code-from *//* my-new-code-from *//* my-new-code-from *//* my-new-code-from *//* my-new-code-from *//* my-new-code-from */
    /* my-new-code-from *//* my-new-code-from *//* my-new-code-from *//* my-new-code-from *//* my-new-code-from *//* my-new-code-from */
    /* my-new-code-from *//* my-new-code-from *//* my-new-code-from *//* my-new-code-from *//* my-new-code-from *//* my-new-code-from */
    /* my-new-code-from *//* my-new-code-from *//* my-new-code-from *//* my-new-code-from *//* my-new-code-from *//* my-new-code-from */
  ]);
};

export default Routes;
