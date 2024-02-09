import React, { memo } from "react";
import Routes from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const sendHeightToParent = () => {
      const height = document.body.scrollHeight;
      window.parent.postMessage({ height: height }, "*");
    }

    window.onload = sendHeightToParent;

    return () => {
      // Component unmount olduğunda window.onload listener'ını kaldır
      window.onload = null;
    };
  }, []);
  return (
    <div className="App bg-[#1F2125] relative font-poppins">
      <Routes />
      <ToastContainer />
    </div>
  );
};

export default memo(App);