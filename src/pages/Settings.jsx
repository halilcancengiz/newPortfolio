import React from "react";
import { useRedux } from "../hooks/useRedux";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Settings = () => {
  const { user } = useRedux();
  console.log(user);


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
