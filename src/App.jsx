import React, { memo, useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import { FiMenu } from "./assets/icon";
import Routes from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navbarRef = useRef();
  const buttonRef = useRef();
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.composedPath().includes(navbarRef.current) &&
        !event.composedPath().includes(buttonRef.current) &&
        showMenu
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showMenu]);

  return (
    <div className="App bg-[#1F2125] relative font-poppins">
      {
        showMenu && <Navbar ref={navbarRef} />
      }
      <div
        ref={buttonRef}
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
