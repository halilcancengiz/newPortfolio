import React, { memo } from "react";
import {
  BsChatSquareTextFill,
  IoSettingsSharp,
  MdOutlineAddCircle,
  VscSignIn,
  VscSignOut,
  FaHome,
  TbInfoHexagon,
} from "../assets/icon";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../services/firebase/firebase";
import { useRedux } from "../hooks/useRedux";
import { Tooltip } from "antd";

const Navbar = ({ showMenu }) => {
  console.count('navbar')
  const { user } = useRedux();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <>
      <nav
        className={`group glassmorphism z-50 flex gap-y-8 items-center justify-center flex-col fixed left-0 top-0 w-12 transition-all duration-700 h-full  text-white ${showMenu ? "" : "hidden"
          }`}
      >
        <Tooltip title="Ana Sayfa" placement="right" color="#1D90F4">
          <NavLink
            to="/"
            className="group w-full py-2 flex items-center justify-center flex-col cursor-pointer transition duration-100 hover:scale-110 "
          >
            <FaHome className="transition-all duration-100" size={20} />
          </NavLink>
        </Tooltip>

        <Tooltip title="Hakkımda" placement="right" color="#1D90F4">
          <NavLink
            to="/about-me"
            className="w-full py-2 flex items-center justify-center flex-col cursor-pointer transition duration-100 hover:scale-110 "
          >
            <TbInfoHexagon size={21} className="transition-all duration-100" />
          </NavLink>
        </Tooltip>
        <Tooltip title="Postlar" placement="right" color="#1D90F4">
          <NavLink
            to="/allposts"
            className="w-full py-2 flex items-center justify-center flex-col cursor-pointer transition duration-100 hover:scale-110 "
          >
            <BsChatSquareTextFill
              size={18}
              className="transition-all duration-100"
            />
          </NavLink>
        </Tooltip>
        <Tooltip title="Not Ekle" placement="right" color="#1D90F4">
          <NavLink
            to="/"
            className={`${user ? "block" : "hidden"
              } w-full py-2 flex items-center justify-center flex-col cursor-pointer transition duration-100 hover:scale-110 `}
          >
            <MdOutlineAddCircle
              size={20}
              className="transition-all duration-100"
            />
          </NavLink>
        </Tooltip>
        <Tooltip title="Ayarlar" placement="right" color="#1D90F4">
          <NavLink
            to="/settings"
            className={`${user ? "block" : "hidden"
              } w-full py-2 flex items-center justify-center flex-col cursor-pointer transition duration-100 hover:scale-110 `}
          >
            <IoSettingsSharp
              size={20}
              className="transition-all duration-100"
            />
          </NavLink>
        </Tooltip>
        <Tooltip title="Üyelik" placement="right" color="#1D90F4">
          <NavLink
            to="/membership"
            className={`${user ? "hidden" : "block"
              } w-full py-2 flex items-center justify-center flex-col cursor-pointer transition duration-100 hover:scale-110 `}
          >
            <VscSignIn size={20} className="transition-all duration-100" />
          </NavLink>
        </Tooltip>
        <Tooltip title="Çıkış Yap" placement="right" color="#1D90F4">
          <button
            onClick={handleLogout}
            className={`${user ? "block" : "hidden"
              } w-full py-2 flex items-center justify-center flex-col cursor-pointer transition duration-100 hover:scale-110 `}
          >
            <VscSignOut size={20} className="transition-all duration-100" />
          </button>
        </Tooltip>
      </nav>
    </>
  );
};

export default memo(Navbar);
