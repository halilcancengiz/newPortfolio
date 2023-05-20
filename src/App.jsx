import React, { memo } from "react";
import { useState } from "react";
import Navbar from "./components/Navbar";
import { FiMenu } from "./assets/icon";
import Routes from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  console.count('1-app rendered')
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="App bg-[#1F2125] relative font-poppins">
      <Navbar showMenu={showMenu} />
      <div
        onClick={() => setShowMenu(!showMenu)}
        className="fixed z-50 right-6 top-6 cursor-pointer"
      >
        <FiMenu color="white" size={30} />
      </div>
      <Routes />
      <ToastContainer />
    </div>
  );
};

export default memo(App);
