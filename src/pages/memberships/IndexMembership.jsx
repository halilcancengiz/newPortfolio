import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import SlideAnimation from "../../components/motion/SlideAnimation";

const IndexMembership = () => {
  return (
    <SlideAnimation>
      <div className="membership-bg min-h-screen relative bg-dark flex items-center justify-center xs:bg-top sm:bg-bottom bg-gradient-to-right from-black to-gray-900 bg-blend-darken bg-opacity-70 ">
        <div className="absolute inset-0 overflow-hidden"></div>
        <div className="xs:px-4 md:px-0 flex flex-col items-center justify-center w-100 text-white z-10">
          <div className="text-lg text-center mb-8">Merhaba!</div>
          <p className="text-center mb-8">
            Blog sayfama hoş geldiniz. Eğer henüz kayıt olmadıysanız, aşağıdaki
            "Kayıt Ol" butonuna tıklayarak hemen kayıt işlemini
            gerçekleştirebilirsiniz. Eğer zaten bir hesabınız varsa, "Giriş Yap"
            butonu ile hesabınıza giriş yapabilirsiniz.
          </p>
          <div
            className={`flex items-center sm:gap-5 xs:gap-3 px-2 text-white w-full my-5`}
          >
            <NavLink
              to="register"
              className="flex items-center uppercase justify-center w-1/2 sm:h-12 xs:h-10  bg-gray-btn rounded-full hover:bg-blue-btn"
            >
              Register
            </NavLink>
            <NavLink
              to="login"
              className="flex items-center uppercase justify-center w-1/2 sm:h-12 xs:h-10  bg-gray-btn rounded-full hover:bg-blue-btn"
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </SlideAnimation>
  );
};

export default IndexMembership;
