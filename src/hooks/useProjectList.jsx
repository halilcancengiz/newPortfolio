import React from "react";
import movieAppImage from "../assets/images/projectsImage/movieapp.png"

export const useProjectList = () => {
  const projects = [
    {
      id: 0,
      name: "Movie App",
      image:movieAppImage,
      githubUrl: "https://github.com/halilcancengiz/react-movie-app",
      liveDemoUrl: "https://react-movie-app-murex.vercel.app/",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, consequatur.",
    },
    {
      id: 1,
      name: "Weather App",
      image:movieAppImage,
      githubUrl: "https://github.com/halilcancengiz/reactweather",
      liveDemoUrl: "https://halilcancengiz.github.io/reactweather/",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, consequatur.",
    },
    {
      id: 2,
      name: "Portfolio App",
      image:movieAppImage,
      githubUrl: "https://github.com/halilcancengiz/reactweather",
      liveDemoUrl: "https://halilcancengiz.github.io/reactweather/",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, consequatur.",
    },
  ];

  return projects;
};
