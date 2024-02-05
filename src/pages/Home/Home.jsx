import React, { memo } from "react";
import Technologies from "../../components/Technologies";
import Projects from "../../components/Projects";
import Footer from "../../components/Footer";
import SlideAnimation from "../../components/motion/SlideAnimation";
import { Helmet } from "react-helmet";
import BlogCardContainer from "../../components/BlogCardContainer";
import Contact from "../../components/Contact";
import Intro from "../../components/Intro";

const Home = () => {
  return (
    <SlideAnimation>
      <Helmet>
        <title>Ana Sayfa</title>
        <meta name="description" content="Öğrenmek, Tasarlamak ve Paylaşmak:Frontend Geliştirme Yolculuğum. Kişisel deneyimlerim, projelerim ve öğrenme yolculuğum paylaşımları ile ..." />
        <meta name="keywords" content="frontend, geliştirme, öğrenme, tasarım, paylaşım, javascript, react, html, css, bootstrap, tailwindcss" />
        <html lang="tr" />
        <link rel="canonical" href={window.location.href} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div id="home" className="min-h-screen flex items-center justify-center scroll-smooth flex-col text-white relative " >
        <Intro />
        <section id="posts" className="w-full flex flex-col ">
          <div className="w-full flex items-center justify-center py-5 text-center my-10 drop-shadow-dark-btn ">
            <h6 className="header-stroke lg:text-4xl sm:text-3xl xs:text-2xl text-center uppercase">
              Son gönderiler
            </h6>
          </div>
          <div style={{ maxWidth: "1350px" }} className={`min-h-screen w-full mx-auto items-center grid lg:px-0 xs:px-5 gap-5 xs:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 relative`} >
            <BlogCardContainer />
          </div>
        </section>
        <Projects />
        <Technologies />
        <Contact />
        <Footer />
      </div>
    </SlideAnimation>
  );
};

export default memo(Home);
