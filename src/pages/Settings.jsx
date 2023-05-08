import React from "react";
import { useRedux } from "../hooks/useRedux";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Settings = () => {
  const { user } = useRedux();

  return (
    <div className="w-full text-center text-white py-5 flex flex-col min-w-screen min-h-screen items-center justify-center">

    </div>
  );
};
