import React, { memo } from "react";
import Routes from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  function sendSize() {
    window.parent.postMessage(
      {
        type: "resize",
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight
      },
      "http://127.0.0.1:5500/index.html"
    )
  }

  // when this window loads or resizes …
  // call our sendSize function
  window.addEventListener("load", sendSize)
  window.addEventListener("resize", sendSize)
  return (
    <div className="App bg-[#1F2125] relative font-poppins">
      <Routes />
      <ToastContainer />
    </div>
  );
};

export default memo(App);