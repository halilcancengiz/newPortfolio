import React, { useRef, useState, useEffect } from "react";
import { Routes as RouteContainer, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home/Home";
import MembershipLayout from "../pages/Layouts/MembershipLayout";
import IndexMembership from "../pages/membership/IndexMembership";
import Login from "../pages/membership/Login";
import Register from "./../pages/membership/Register";
import { Settings } from "../pages/Settings";
import { NotFound } from "../pages/NotFound";
import { AnimatePresence } from "framer-motion";
import { AddPost } from "../pages/AddPost";
import PostDetails from "../pages/PostDetails";
import { AllPosts } from "../pages/AllPosts";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { FiMenu } from "../assets/icon";

const Routes = () => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const navbarRef = useRef();
  const buttonRef = useRef();

  const selectUser = state => state.user.value;
  const userSelector = createSelector(
    selectUser,
    user => user
  );
  const user = useSelector(userSelector);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !event.composedPath().includes(navbarRef.current) &&
        !event.composedPath().includes(buttonRef.current) &&
        showMenu
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };

  }, [showMenu]);


  return (
    <>
      {
        showMenu && <Navbar ref={navbarRef} />
      }
      <div
        ref={buttonRef}
        onClick={() => setShowMenu(!showMenu)}
        className="fixed z-50 right-6 top-6 cursor-pointer"
      >
        <FiMenu color="white" size={30} />
      </div>

      <AnimatePresence initial={false}>
        <RouteContainer location={location} key={location.pathname}>
          {/* Herkesin erişebildiği rotalar */}
          <Route path="/" element={<Home />} />
          <Route path="/allposts" element={<AllPosts />} />
          <Route path="post/:title" element={<PostDetails />} />

          {user ? (
            <>
              <Route path="/settings" element={<Settings />} />
              {user.role === "admin" && (
                <>
                  <Route path="addpost" element={<AddPost />} />
                </>
              )}
            </>
          ) : (
            <>
              <Route path="/membership" element={<MembershipLayout />}>
                <Route index={true} element={<IndexMembership />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>
            </>
          )}

          <Route path="*" element={<NotFound />} />
        </RouteContainer>
      </AnimatePresence>
    </>

  );
};

export default Routes;



