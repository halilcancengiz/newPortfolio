import React from "react";
import notFoundImage from "../assets/images/404.png";
import { NavLink } from "react-router-dom";
import SlideAnimation from "../components/motion/SlideAnimation";

export const NotFound = () => {
  return (
    <SlideAnimation>
      <div
        style={{
          backgroundImage: `url(${notFoundImage})`,
          backgroundColor: "#C53F3F",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="min-w-screen min-h-screen font-mono flex items-center justify-center flex-col relative"
      >
        <div className="absolute bottom-16 flex items-center justify-center flex-col">
          <h1 className="sm:text-5xl xs:text-3xl uppercase text-white transition-all duration-500">
            Page Not Found
          </h1>
          <NavLink
            className="cursor-pointer text-white sm:text-base xs:text-xs transition-all duration-500 font-bold border rounded-md p-2 mt-2 uppercase hover:bg-white hover:text-not-found-red "
            to="/"
          >
            Back To Home Page
          </NavLink>
        </div>
      </div>
    </SlideAnimation>
  );
};
