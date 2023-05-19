import React from "react";
import { BsTwitter, FcGoogle, SiFacebook } from "../assets/icon";
import { NavLink } from "react-router-dom";



// optimize
const Footer = () => {
  return (
    <div className="mt-10 bg-black-500 font-sans sm:px-16 xs:px-10 py-20">
      <div className="flex flex-col w-full justify-center items-center text-center ">
        <h3 className="lg:text-[50px] md:text-[40px] xs:text-[30px] transition-all duration-500 capitalize font-bold ">
          Birlikte daha güçlüyüz!
        </h3>
        <p className="lg:w-3/4 mt-2 lg:text-lg md:text-base xs:base">
          Merak ettiğiniz herhangi bir konuda benimle iletişime geçebilirsiniz.
          Ürün tasarımı hakkında önerileriniz veya projeleriniz varsa, birlikte
          çalışarak fikirlerimizi paylaşabilir ve birlikte öğrenme fırsatı
          yakalayabiliriz. Sizlerle birlikte yeni projelere imza atmak ve
          işbirliği yapmak için sabırsızlanıyorum.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center my-10">
        <NavLink to="/contact" className="mb-5 border px-10 py-1 font-medium hover:bg-white hover:text-black">
          Contact
        </NavLink>
        <div className="flex items-center justify-center gap-10">
          <div className="border border-transparent hover:border-blue-btn rounded-full p-2 ">
            <BsTwitter size={25} />
          </div>
          <div className="border border-transparent hover:border-blue-btn rounded-full p-2 ">
            <FcGoogle size={25} />
          </div>
          <div className="border border-transparent hover:border-blue-btn rounded-full p-2 ">
            <SiFacebook size={25} />
          </div>
        </div>
      </div>

      <div className="flex items-center text-center flex-wrap justify-center">
        <span className="mr-1">© 2023 All rights reserved.</span>
        <span>Designed & Coded by Halil Can Cengiz</span>
      </div>
    </div>
  );
};

export default Footer;
