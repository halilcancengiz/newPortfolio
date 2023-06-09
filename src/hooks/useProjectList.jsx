import React from "react";
import movieAppImage from "../assets/images/projectsImage/movieapp.png"
import portfolioImage from "../assets/images/projectsImage/portfolio.png"
import weatherAppImage from "../assets/images/projectsImage/weatherapp.png"

export const useProjectList = () => {
  const projects = [
    {
      id: 0,
      name: "Movie App",
      image: movieAppImage,
      githubUrl: "https://github.com/halilcancengiz/react-movie-app",
      liveDemoUrl: "https://react-movie-app-murex.vercel.app/",
      description:
        "Bu uygulama, React ve Firebase kullanılarak oluşturulan bir film uygulaması. İnsanlar bu uygulama aracılığıyla birçok filmle ilgili bilgilere ulaşabilir ve film fragmanlarını izleyebilirler. Ayrıca, kullanıcılar film ayrıntı sayfasında filmle ilgili yorumlar yapabilir, diğer kullanıcıların yorumlarını beğenebilir ve kendi film listelerini oluşturabilirler. Film listelerine istedikleri filmleri ekleyip çıkarma özelliğine de sahiptirler. Bunun yanı sıra, kullanıcılar kendi profil bilgilerini güncelleyebilirler. Böylece, uygulama kullanıcıları, film deneyimlerini paylaşabilir, film tercihlerini takip edebilir ve kişisel bilgilerini yönetebilirler.",
    },
    {
      id: 1,
      name: "Weather App",
      image: weatherAppImage,
      githubUrl: "https://github.com/halilcancengiz/weather-app",
      liveDemoUrl: "https://weather-app-ten-rust.vercel.app/",
      description:
        "Bu uygulama, benim geliştirdiğim bir API projesi. OpenWeatherMap API'sini kullanarak, hava durumu verilerini elde edebiliyoruz. Kullanıcılar, istedikleri şehirleri girebiliyor veya Türkiye haritasında seçtikleri şehirleri kullanabiliyorlar. Uygulama, seçilen şehirlere göre 5 günlük hava durumu verilerini sunuyor. Bununla birlikte, hava durumu koşullarına bağlı olarak arkaplanda çeşitli gifler kullanıyorum. Böylece, hava durumu bilgilerini görsel olarak daha ilgi çekici hale getiriyorum. Kullanıcılar, istedikleri şehrin hava durumu bilgilerini öğrenebilir ve aynı zamanda görsel gif animasyonlarıyla hava durumu verilerini takip edebilirler.",
    },
    {
      id: 2,
      name: "Portfolio App",
      image: portfolioImage,
      githubUrl: "https://github.com/halilcancengiz/newPortfolio",
      liveDemoUrl: "https://halilcancengiz.vercel.app/",
      description:
        "Bu uygulama benim portföy sitemdir. Burada, frontend teknolojileri hakkında yazdığım makaleler ve projelerim yer almaktadır. Kullanıcılar, bu yazılar altında birbirleriyle iletişim kurabilir ve kendi bilgilerini güncelleyebilirler. Ayrıca, projelerimin canlı linkleri ve GitHub repository'leri de paylaşılmıştır. Bu sayede, ziyaretçiler benim hakkımda daha fazla bilgi edinebilir ve iletişim formunu kullanarak bana ulaşabilirler. Genel olarak, bu portföy sitem, benim yeteneklerimi ve çalışmalarımı sergileyen bir platformdur ve misafirlerimle karşılıklı bir şekilde bilgi alışverişi yapmamı sağlar.",
    },
  ];

  return projects;
};
