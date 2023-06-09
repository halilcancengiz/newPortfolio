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
            Portföy sayfama hoş geldiniz! Kayıt olmak isterseniz, lütfen "Kayıt Ol" butonuna tıklayarak örnek çalışmalarımı ve projelerimi keşfedebilirsiniz.
            Eğer zaten bir hesabınız varsa, "Giriş Yap" butonuyla kişisel deneyiminizi sürdürebilirsiniz.
            Bu sayede yaratıcı çalışmalarımı gözlemleyebilir ve potansiyel işbirliği olanaklarını keşfedebilirsiniz.
          </p>
          <div
            className={`flex items-center sm:gap-5 xs:gap-3 px-2 text-white w-full my-5`}
          >
            <NavLink
              to="register"
              className="flex items-center uppercase justify-center w-1/2 sm:h-12 xs:h-10  bg-gray-btn rounded-full hover:bg-blue-btn"
            >
              Kayıt Ol
            </NavLink>
            <NavLink
              to="login"
              className="flex items-center uppercase justify-center w-1/2 sm:h-12 xs:h-10  bg-gray-btn rounded-full hover:bg-blue-btn"
            >
              Giriş Yap
            </NavLink>
          </div>
        </div>
      </div>
    </SlideAnimation>
  );
};

export default IndexMembership;
