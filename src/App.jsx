import React from "react";

import SpeechToTextComponent from "./Components/SpeechToText";
import Routes from "./Routes/Routes";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <div>
      {/* <Dashboard /> */}
      {/* <SpeechToTextComponent/> */}
      <BrowserRouter>
      <Routes/>
      
      </BrowserRouter>



    </div>
  );
};

export default App;
