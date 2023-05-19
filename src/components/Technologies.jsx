import React, { memo, useEffect, useState } from "react";
import { Tooltip } from "antd";
import { useTechnologyList } from "../hooks/useTechnologyList";



// optimize
function Technologies() {
  // hooks
  const allTechnologieList = useTechnologyList();
  // states
  const [currentTechnologie] = useState(allTechnologieList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex === currentTechnologie.length - 1) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentTechnologie, currentIndex]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  // lg:min-h-[900px] md:min-h-[800px] sm:min-h-[600px] xs:min-h-[500px] ----> min-h-screen yerine kullanılabilir section alanında

  return (
    <section
      id="technologie"
      className="min-h-[105vh] w-full overflow-hidden flex items-center flex-col "
    >
      <div className="w-full text-center my-10  drop-shadow-dark-btn ">
        <h6 className="header-stroke lg:text-4xl sm:text-3xl xs:text-2xl text-center uppercase">
          Technologies
        </h6>
      </div>
      <div className="grow bg-red-700 flex">
        <ul className="relative w-full flex items-center justify-center">
          {currentTechnologie
            ? currentTechnologie.map((tech, index) => {
                const angle = (360 / currentTechnologie.length) * tech.id;
                const transform = `rotate(${angle}deg) translateX(${
                  width > 768
                    ? "180px"
                    : width > 500
                    ? "150px"
                    : width > 350
                    ? "100px"
                    : "70px"
                }) translateY(${
                  width > 768
                    ? "180px"
                    : width > 500
                    ? "150px"
                    : width > 350
                    ? "100px"
                    : "80px"
                }) rotate(-${angle}deg)`;

                return (
                  <React.Fragment key={tech.id}>
                    <Tooltip title={tech.name.toUpperCase()}>
                      <li
                        onClick={() => {
                          setCurrentUrl(tech.url);
                          setCurrentIndex(tech.id);
                        }}
                        className={`translate-circle absolute lg:w-20 lg:h-20 md:w-16 md:h-16  sm:h-14 sm:w-14 xs:w-[45px] xs:h-[45px] transition-all duration-500  flex items-center justify-center shadow-md rounded-full shadow-black-400`}
                        style={{ transform }}
                      >
                        <img
                          name={tech.name}
                          alt={tech.name}
                          src={tech.url}
                          className={`"w-[75%] h-[75%] ${
                            currentIndex === tech.id ? "drop-shadow-tech" : ""
                          } bg-transparent bg-no-repeat`}
                        />
                        <div
                          style={{
                            borderBottom: `2px solid ${tech.logoColor}`,
                          }}
                          className={`absolute animate-circle w-[120%] h-[120%] rounded-full translate-x-[-50%] translate-y-[-50%]`}
                        ></div>
                      </li>
                    </Tooltip>

                    <div
                      style={{
                        width: `${width < 350 ? "115px" : ""}`,
                        height: `${width < 350 ? "115px" : ""}`,
                      }}
                      className="absolute flex items-center justify-center animate-circle transition-all duration-500 animate lg:w-80 lg:h-80 md:w-80 md:h-80 sm:w-60 sm:h-60 xs:h-40 xs:w-40 rounded-full translate-x-[-50%] translate-y-[-50%]"
                    >
                      <div
                        style={{
                          borderBottom: `2px solid ${currentTechnologie[currentIndex].logoColor}`,
                        }}
                        className="w-full h-full absolute flex items-center justify-center animate-circle animate rounded-full"
                      >
                        <div
                          style={{
                            borderBottom: `2px solid ${currentTechnologie[currentIndex].logoColor}`,
                          }}
                          className="w-[90%] h-[90%] absolute flex items-center justify-center animate-circle animate rounded-full"
                        >
                          <div
                            style={{
                              borderBottom: `2px solid ${currentTechnologie[currentIndex].logoColor}`,
                            }}
                            className="w-[80%] h-[80%] absolute flex items-center justify-center animate-circle animate rounded-full"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })
            : ""}
          <div className="absolute transition-all duration-500 lg:w-40 lg:h-40 md:w-32 md:h-32 sm:w-24 sm:h-24 xs:h-20 xs:w-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] lg:p-6 md:p-4 sm:p-2 xs:p-2 shadow-lg shadow-black-500 w-full h-full rounded-full flex items-center justify-center overflow-hidden ">
            <img
              style={{
                filter: `drop-shadow(0 0 5px ${currentTechnologie[currentIndex].logoColor})`,
              }}
              src={currentTechnologie[currentIndex].url}
              alt="currentTechnologie"
            />
          </div>
        </ul>
      </div>
    </section>
  );
}

export default memo(Technologies);
