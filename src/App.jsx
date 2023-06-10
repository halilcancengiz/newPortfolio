import React, { memo, useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import Routes from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {

 

  return (
    <div className="App bg-[#1F2125] relative font-poppins">
      <Routes />
      <ToastContainer />
    </div>
  );
};

export default memo(App);
