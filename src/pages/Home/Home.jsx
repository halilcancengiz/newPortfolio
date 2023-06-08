import React, { memo } from "react";
import codetyping from "../../assets/images/codetyping.png";
import Technologies from "../../components/Technologies";
import Projects from "../../components/Projects";
import Footer from "../../components/Footer";
import SlideAnimation from "../../components/motion/SlideAnimation";
import { Helmet } from "react-helmet";
import BlogCardContainer from "../../components/BlogCardContainer";

const Home = () => {
  return (
    <SlideAnimation>

      <Helmet>
        <title>Ana Sayfa</title>
        <meta name="description" content="Sayfa açıklaması buraya gelecek" />
        <meta name="keywords" content="frontend, geliştirme, öğrenme, tasarım, paylaşım, javascript, react, html, css, bootstrap, tailwindcss" />
        <html lang="tr" />
        <link rel="canonical" href={window.location.href} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div
        id="home"
        className="min-h-screen flex items-center justify-center flex-col text-white "
      >

        <section
          className={`relative min-w-screen min-h-screen flex items-center justify-center overflow-hidden flex-col after:content-[''] after:animate-opacity after:rounded-full after:h-20 after:w-20 after:bg-transparent after:absolute after:top-[-80px] after:left-[-80px] after:shadow-border-shadow-blue after:sm:block after:xs:hidden before:sm:block before:xs:hidden before:animate-opacity before:content-[''] before:rounded-full before:h-20 before:w-20 before:bg-transparent before:absolute before:bottom-[-80px] before:right-[-80px] before:shadow-border-shadow-blue  `}
        >
          <div className="flex justify-center">
            <img
              className="w-1/3 min-w-[280px] drop-shadow-blue-btn "
              src={codetyping}
              alt=""
            />
          </div>
          <h3 className="sm:text-2xl xs:text-lg sm:animate-opacity xs:animate-none text-blue-btn font-bold italic header-stroke-without-border">
            Halil Can Cengiz
          </h3>
          <h1 className="sm:text-2xl xs:text-lg font-bold text-center flex flex-col items-center">
            Öğrenmek, Tasarlamak ve Paylaşmak:
            <span className="sm:text-lg xs:text-base italic">
              Frontend Geliştirme Yolculuğum
            </span>
          </h1>
          <h3 className="text-center sm:text-base xs:text-sm my-2">
            Kişisel deneyimlerim, projelerim ve öğrenme yolculuğum paylaşımları
            ile frontend geliştirme dünyasında yön bulun.
          </h3>
        </section>
        <section id="posts" className="w-full flex flex-col ">
          <div className="w-full flex items-center justify-center py-5 text-center my-10 drop-shadow-dark-btn ">
            <h6 className="header-stroke lg:text-4xl sm:text-3xl xs:text-2xl text-center uppercase">
              Son gönderiler
            </h6>
          </div>

          <div
            style={{ maxWidth: "1350px" }}
            className={`min-h-screen w-full mx-auto items-center grid lg:px-0 xs:px-5 gap-5 xs:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 relative`}
          >
            <BlogCardContainer />
          </div>
        </section>
        <Projects />
        <Technologies />
        <Footer />
      </div>
    </SlideAnimation>
  );
};

export default memo(Home);
