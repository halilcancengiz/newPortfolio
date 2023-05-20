import React from "react";
import { shallowEqual, useSelector } from "react-redux";


export const Settings = () => {
  console.count('settings')
  const posts = useSelector(state => state.posts.allPosts, shallowEqual);

  return (
    <div className="w-full text-center text-white py-5 flex flex-col min-w-screen min-h-screen items-center justify-center">
      <div className="flex items-start justify-center flex-col bg-blue-400">
        <div className="flex items-center justify-center">
          <label className="mr-5" htmlFor="email">E-Posta : </label>
          <span id="email">{user.email}</span>
        </div>
        <div className="flex items-center justify-center">
          <label className="mr-5" htmlFor="role">Role : </label>
          <span id="email">{user.role}</span>
        </div>
        <div className="flex items-center justify-center">
          <label className="mr-5" htmlFor="uid">Uid : </label>
          <span id="email">{user.uid}</span>
        </div>
      </div>



    </div>
  );
};
