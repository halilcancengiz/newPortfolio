import React from "react";
import notFoundImage from "../assets/images/notfound.png";
import { NavLink } from "react-router-dom";
import SlideAnimation from "../components/motion/SlideAnimation";

export const NotFound = () => {
  return (
    <SlideAnimation>
      <div className="w-full h-full flex items-center justify-center flex-col ">
        <div className="flex items-center justify-center flex-col relative" >
          <img className="max-w-[450px] w-full" src={notFoundImage} alt="" />
        </div>
        <div className="font-bold text-3xl flex items-center justify-center flex-col text-[#3C73AC] gap-3 " >
          <span className="uppercase  xs:text-lg sm:text-2xl transition-all duration-500">Sayfa bulunamadı!</span>
          <NavLink className="xs:text-base sm:text-lg font-normal animate-bounce ml-2 border p-1 px-5 border-[#3C73AC] rounded-lg hover:bg-[#3C73AC] transition-all duration-500 hover:text-[#CCE0F8]" to="/">Ana sayfaya dön</NavLink>
        </div>
      </div>

    </SlideAnimation>
  );
};
