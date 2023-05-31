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
import { useSelector } from "react-redux";

const Navbar = ({ showMenu }) => {
  const user = useSelector(state => state.user.value);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };


  return (
    <>
      <nav className={`group glassmorphism z-50 flex gap-y-8 items-center justify-center flex-col fixed left-0 top-0 w-12 transition-all duration-700 h-full text-white ${showMenu ? "" : "hidden"}`}>
        <Tooltip title="Ana Sayfa" placement="right" color="#1D90F4">
          <NavLink to="/" className="group w-full py-2 flex items-center justify-center flex-col cursor-pointer transition duration-100 hover:scale-110">
            <FaHome size={20} className="transition-all duration-100" />
          </NavLink>
        </Tooltip>

        <Tooltip title="Hakkımda" placement="right" color="#1D90F4">
          <NavLink to="/about-me" className="w-full py-2 flex items-center justify-center flex-col cursor-pointer transition duration-100 hover:scale-110">
            <TbInfoHexagon size={21} className="transition-all duration-100" />
          </NavLink>
        </Tooltip>

        <Tooltip title="Postlar" placement="right" color="#1D90F4">
          <NavLink to="/allposts" className="w-full py-2 flex items-center justify-center flex-col cursor-pointer transition duration-100 hover:scale-110">
            <BsChatSquareTextFill size={18} className="transition-all duration-100" />
          </NavLink>
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
    </>
  );
};

export default memo(Navbar);
