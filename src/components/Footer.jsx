import React from "react";
import { BsTwitter, FcGoogle, SiFacebook } from "../assets/icon";

// optimize
const Footer = () => {

  const smoothScroll = () => {
    const contactElement = document.querySelector("#contact")
    contactElement.scrollIntoView({ behavior: "smooth" })
  }

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
        <div onClick={smoothScroll} className="cursor-pointer relative group overflow-hidden mb-5 glassmorphism-button border px-16 py-1 uppercase font-medium transition-all duration-500">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 z-[-1] bg-gradient-to-r from-blue-500 to-black-700 group-hover:h-full group-hover:w-full group-hover:font-bold group-hover:duration-500 animate-pulse transition-all duration-300"></div>
          iletişim
        </div>
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
