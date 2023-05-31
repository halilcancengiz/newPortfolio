import React, { useEffect, useRef, useState } from "react";
import { useProjectList } from "../hooks/useProjectList";
import { motion, useInView } from "framer-motion";
// optimize
const Projects = () => {

  const allProjects = useProjectList();
  const animateRef = useRef(null)
  const isInView = useInView(animateRef)

  useEffect(() => {

  }, [isInView]);

  return (
    <div
      className="min-h-screen w-full flex flex-col">
      <div className="w-full text-center my-10  drop-shadow-dark-btn ">
        <h6 className="header-stroke lg:text-4xl sm:text-3xl xs:text-2xl text-center uppercase">
          Projects
        </h6>
      </div>
      <motion.div
        ref={animateRef}
        initial={{ x: -500 }}
        animate={{ x: isInView ? 0 : -500 }}
        transition={{ duration: 1 }}
        className="flex max-w-[1400px] grow flex-wrap items-center justify-center mx-auto">
        {allProjects &&
          allProjects.map((project) => (
            <motion.div
              key={project.id}
              style={{ scale: ".85" }}
              className="flex flex-col max-w-[450px]"
            >
              <img
                className="drop-shadow-project hover:scale-110 transition-all duration-500"
                src={project.image}
                alt={project.name}
              />
              <div className="h-40 text-center rounded-2xl flex flex-col items-center">
                <h3 className="sm:text-3xl header-stroke xs:text-lg capitalize border-b">{project.name}</h3>
                <p className="my-auto text-lg line-clamp-3 text-justify tracking-tight">{project.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio repudiandae officia atque ea dolore nobis libero recusandae? Numquam, facilis dicta! </p>
              </div>
              <div className="flex items-center gap-5 justify-center mt-2">
                <button className="w-full border  border-image-right-to-left group bg-transparent relative py-3">
                  <div
                    style={{ transition: "all .5s ease-in-out" }}
                    className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-0 h-0 z-[-1]  bg-gradient-to-r from-blue-500 to-green-500 group-hover:h-full  group-hover:w-full group-hover:transition-all group-hover:font-bold group-hover:duration-500 animate-pulse"
                  ></div>
                  <a target="_blank" href={project.liveDemoUrl}>
                    Live Demo
                  </a>
                </button>
                <button className="w-full border  border-image-left-to-right group bg-transparent relative py-3">
                  <div
                    style={{ transition: "all .5s ease-in-out" }}
                    className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-0 h-0 z-[-1]  bg-gradient-to-r from-blue-500 to-green-500 group-hover:h-full  group-hover:w-full group-hover:transition-all group-hover:font-bold group-hover:duration-500 animate-pulse"
                  ></div>
                  <a className="" target="_blank" href={project.githubUrl}>
                    Inspect
                  </a>
                </button>
              </div>
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
};

export default Projects;
