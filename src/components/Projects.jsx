import React from "react";
import { useProjectList } from "../hooks/useProjectList";
import { Tooltip } from "antd";
import { SlScreenDesktop, FiGithub } from "../assets/icon"

const Projects = () => {

  const allProjects = useProjectList();

  return (
    <div id="projects" className="min-h-screen w-full flex flex-col">
      <div className="w-full text-center my-10  drop-shadow-dark-btn ">
        <h6 className="header-stroke lg:text-4xl sm:text-3xl xs:text-2xl text-center uppercase">
          Projeler
        </h6>
      </div>
      <div className="flex max-w-[1400px] grow flex-wrap items-center justify-center mx-auto">
        {allProjects &&
          allProjects.map((project) => (
            <div key={project.id} className="flex flex-col max-w-[450px] scale-[.85]">
              <img className="drop-shadow-project h-52 hover:scale-110 aspect-[16/9] transition-all duration-500 " src={project.image} alt={project.name} />
              <div className="h-40 text-center rounded-2xl flex flex-col items-center">
                <h3 className="sm:text-3xl header-stroke xs:text-lg capitalize border-b block line-clamp-1">{project.name}</h3>
                <Tooltip title={project.description} placement="bottom-center">
                  <p className="my-auto text-lg line-clamp-3 text-justify tracking-tight">
                    {project.description}
                  </p>
                </Tooltip>
              </div>
              <div className="flex items-center gap-5 justify-center mt-2">
                <a target="_blank" href={project.liveDemoUrl} className="w-full flex items-center justify-center border overflow-hidden glassmorphism-button group bg-transparent relative py-3">
                  <div style={{ transition: "all .3s ease-in-out" }} className="flex items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-0 h-0 z-[-1] rounded-lg  bg-gradient-to-r from-blue-500 to-black-700 group-hover:h-full  group-hover:w-full group-hover:transition-all group-hover:font-bold group-hover:duration-500 animate-pulse"></div>
                  <SlScreenDesktop size={20} className="mr-2 text-white" />
                  <span >
                    Canlı
                  </span>
                </a>
                <a href={project.githubUrl} target="_blank" className="w-full glassmorphism-button overflow-hidden border flex items-center justify-center  group bg-transparent relative py-3">
                  <div style={{ transition: "all .3s ease-in-out" }} className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-0 h-0 z-[-1] rounded-lg bg-gradient-to-r from-blue-500 to-black-700 group-hover:h-full  group-hover:w-full group-hover:transition-all group-hover:font-bold group-hover:duration-500 animate-pulse"></div>
                  <FiGithub size={20} className="mr-2" />
                  <span  >
                    Github
                  </span>
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Projects;
