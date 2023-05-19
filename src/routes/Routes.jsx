import React from "react";
import { Routes as RouteContainer, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home/Home";
import MembershipLayout from "../pages/Layouts/MembershipLayout";
import IndexMembership from "../pages/membership/IndexMembership";
import Login from "../pages/membership/Login";
import Register from "./../pages/membership/Register";
import { Settings } from "../pages/Settings";
import { useRedux } from "../hooks/useRedux";
import { NotFound } from "../pages/NotFound";
import { AnimatePresence } from "framer-motion";
import { AddPost } from "../pages/AddPost";
import PostDetails from "../pages/PostDetails";
import { AllPosts } from "../pages/AllPosts";
import { Loading } from "../components/Loading";

const Routes = () => {
  const { user } = useRedux();
  const location = useLocation();
  return (
    <AnimatePresence initial={false}>
      <RouteContainer location={location} key={location.pathname}>
        {/* Herkesin erişebildiği rotalar */}
        <Route path="/" element={<Home />} />
        <Route path="/allposts" element={<AllPosts />} />
        <Route path="post/:title" element={<PostDetails />} />
        <Route path="loading" element={<Loading />} />

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
  );
};

export default Routes;



