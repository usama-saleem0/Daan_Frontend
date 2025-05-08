import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SpeechToTextComponent from "./Components/SpeechToText";
import Routes from "./Routes/Routes";
import { BrowserRouter } from "react-router-dom";
import "../src/App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div>
      {/* <Dashboard /> */}
      {/* <SpeechToTextComponent/> */}
      <BrowserRouter>
        <Routes />
      {mounted && <ToastContainer />}
      </BrowserRouter>
    </div>
  );
};

export default App;
