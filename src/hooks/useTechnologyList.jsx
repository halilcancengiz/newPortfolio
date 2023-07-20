import javascriptLogo from "../assets/images/logos/javascript-logo.png"
import reactLogo from "../assets/images/logos/react-logo.png"
import nodejsLogo from "../assets/images/logos/nodejs-logo.png"
import htmlLogo from "../assets/images/logos/html-logo.png"
import cssLogo from "../assets/images/logos/css-logo.png"
import firebaseLogo from "../assets/images/logos/firebase-logo.png"
import gitLogo from "../assets/images/logos/git-logo.png"
import bootstrapLogo from "../assets/images/logos/bootstrap-logo.png"
import tailwindLogo from "../assets/images/logos/tailwind-logo.png"
import typescriptLogo from "../assets/images/logos/typescript-logo.png"

export const useTechnologyList = () => { 
  const technologies = [
    {
      id: 0,
      name: "javascript",
      url: javascriptLogo,
      logoColor: "#F0DB4F"
    },
    {
      id: 1,
      name: "react",
      url: reactLogo,
      logoColor: "#6563FF"
    },
    {
      id: 2,
      name: "nodejs",
      url: nodejsLogo,
      logoColor: "#55A144"
    },
    {
      id: 3,
      name: "firebase",
      url: firebaseLogo,
      logoColor:"#FFCA28"
    },
    {
      id: 4,
      name: "tailwind",
      url: tailwindLogo,
      logoColor:"#01B7D6"
    },
    {
      id: 5,
      name: "bootstrap",
      url: bootstrapLogo,
      logoColor:"#7909F7"
    },
    {
      id: 6,
      name: "html",
      url: htmlLogo,
      logoColor:"#F7941E"
    },
    {
      id: 7,
      name: "git",
      url: gitLogo,
      logoColor:"#EF4C40"
    },
    {
      id: 8,
      name: "css",
      url: cssLogo,
      logoColor:"#33A9DC"
    },
    {
      id: 9,
      name: "typescript",
      url: typescriptLogo,
      logoColor:"#2D79C7"
    },
  ]

  return technologies;
}