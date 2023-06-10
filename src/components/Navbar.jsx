import React, { forwardRef, memo } from "react";
import {
  BsChatSquareTextFill,
  IoSettingsSharp,
  VscSignIn,
  VscSignOut,
  FaHome,
  AiOutlineFundProjectionScreen
} from "../assets/icon";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../services/firebase/firebase";
import { Tooltip } from "antd";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

const Navbar = forwardRef(({ props }, ref) => {
  const location = useLocation()
  const user = useSelector(state => state.user.value);
  const navigate = useNavigate();
  const [shouldFocusProjects, setShouldFocusProjects] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (shouldFocusProjects) {
      const element = document.querySelector("#projects");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      setShouldFocusProjects(false);
    }
  }, [shouldFocusProjects]);

  const handleNavLinkClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setShouldFocusProjects(true);
    } else {
      setShouldFocusProjects(true);
    }
  };


  return (
    <div ref={ref}>
      <nav id="navbar" className={`group glassmorphism z-50 flex gap-y-8 items-center justify-center flex-col fixed left-0 top-0 w-12 transition-all duration-700 h-full text-white`}>
        <Tooltip title="Ana Sayfa" placement="right" color="#1D90F4">
          <NavLink to="/" className="group w-full py-2 flex items-center justify-center flex-col cursor-pointer transition duration-100 hover:scale-110">
            <FaHome size={20} className="transition-all duration-100" />
          </NavLink>
        </Tooltip>


        <Tooltip title="Postlar" placement="right" color="#1D90F4">
          <NavLink to="/allposts" className="w-full py-2 flex items-center justify-center flex-col cursor-pointer transition duration-100 hover:scale-110">
            <BsChatSquareTextFill size={18} className="transition-all duration-100" />
          </NavLink>
        </Tooltip>

        <Tooltip title="Projelerim" placement="right" color="#1D90F4">
          <div
            className="w-full py-2 flex items-center justify-center flex-col cursor-pointer transition duration-100 hover:scale-110"
            onClick={handleNavLinkClick}
          >
            <AiOutlineFundProjectionScreen
              size={21}
              className="transition-all duration-100"
            />
          </div>
        </Tooltip>

        {user && (
          <>
            <Tooltip title="Ayarlar" placement="right" color="#1D90F4">
              <NavLink to="/settings" className="w-full py-2 flex items-center justify-center flex-col cursor-pointer transition duration-100 hover:scale-110">
                <IoSettingsSharp size={20} className="transition-all duration-100" />
              </NavLink>
            </Tooltip>
          </>
        )}

        {!user && (
          <Tooltip title="Üyelik" placement="right" color="#1D90F4">
            <NavLink to="/membership" className="w-full py-2 flex items-center justify-center flex-col cursor-pointer transition duration-100 hover:scale-110">
              <VscSignIn size={20} className="transition-all duration-100" />
            </NavLink>
          </Tooltip>
        )}

        {user && (
          <Tooltip title="Çıkış Yap" placement="right" color="#1D90F4">
            <button onClick={handleLogout} className="w-full py-2 flex items-center justify-center flex-col cursor-pointer transition duration-100 hover:scale-110">
              <VscSignOut size={20} className="transition-all duration-100" />
            </button>
          </Tooltip>
        )}
      </nav>
    </div >
  );
});

export default memo(Navbar);
