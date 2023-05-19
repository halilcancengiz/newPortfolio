/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true
    },
    extend: {
      animation: {
        opacity: "opacity 2.5s infinite ease-in-out",
        "circle": "circle 5s infinite linear",
        "circleL": "circleL 5.5s infinite linear",
      },
      keyframes: {
        "circle": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        "opacity": {
          "0%": {
            opacity: "0"
          },
          "5%": {
            opacity: "10%"
          },
          "10%": {
            opacity: "20%"
          },
          "15%": {
            opacity: "30%"
          },
          "20%": {
            opacity: "40%"
          },
          "25%": {
            opacity: "50%"
          },
          "30%": {
            opacity: "60%"
          },
          "35%": {
            opacity: "70%"
          },
          "40%": {
            opacity: "80%"
          },
          "45%": {
            opacity: "90%"
          },
          "50%": {
            opacity: "100%"
          },
          "55%": {
            opacity: "90%"
          },
          "60%": {
            opacity: "80%"
          },
          "65%": {
            opacity: "70%"
          },
          "70%": {
            opacity: "60%"
          },
          "75%": {
            opacity: "50%"
          },
          "80%": {
            opacity: "40%"
          },
          "85%": {
            opacity: "30%"
          },
          "90%": {
            opacity: "20%"
          },
          "95%": {
            opacity: "10%"
          },
          "100%": {
            opacity: "0"
          }
        },

      },
      fontFamily: {
        open: ['Open Sans', 'sans-serif'],
        montserrat: ['Montserrat Alternates', 'sans-serif'],
        poppins:['Poppins', 'sans-serif']
      },
      dropShadow: {
        'blue-btn': '0 10px 10px #1D90F4',
        'dark-btn': '0 0 2px rgba(0,0,0,.9)',
        'purple': '0 5px 5px rgb(114,206,96)',
        'tech': '0 0 5px black',
        'like': '0 0 5px gray',
        "project":"0 0 10px black"
      },
      boxShadow: {
        "border-shadow-blue": "10px 10px 300px 100px #1D90F4",
        "border-shadow-green": "10px 10px 300px 250px #66B956"
      },
      screens: {
        'xs': '280px',
        'sm': '501px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      width: {
        "100": "500px",
      },
      minWidth: {
        "80": "320px"
      },
      colors: {
        "black-100": "rgba(0,0,0,.1)",
        "black-200": "rgba(0,0,0,.2)",
        "black-300": "rgba(0,0,0,.3)",
        "black-400": "rgba(0,0,0,.4)",
        "black-500": "rgba(0,0,0,.5)",
        "black-600": "rgba(0,0,0,.6)",
        "black-700": "rgba(0,0,0,.7)",
        "black-800": "rgba(0,0,0,.8)",
        "black-900": "rgba(0,0,0,.9)",
        "dark-input": "#323645",
        "dark-input-hover": "#3D404A",
        "dark": "#282A37",
        "border-blue": "#436B91",
        "blue-shadow": "#13395F",
        "blue-btn": "#1D90F4",
        "gray-btn": "#545B69",
        "twitter": "#1DA1F2",
        "facebook": "#4267B2",
        "google": "#FF3D00",
        "purple": "#7578F3",
        "green-btn": "#66B956",
        "javascript": "#F0DB4F",
        "react": "#6563FF",
        "nodejs": "#55A144",
        "firebase": "#FFCA28",
        "tailwind": "#01B7D6",
        "bootstrap": "#7909F7",
        "html": "#F7941E",
        "git": "#EF4C40",
        "css": "#55A144",
        "not-found-red":"#C53F3F"
      },
      borderColor:{
        "javascript": "#F0DB4F",
        "react": "#6563FF",
        "nodejs": "#55A144",
        "firebase": "#FFCA28",
        "tailwind": "#01B7D6",
        "bootstrap": "#7909F7",
        "html": "#F7941E",
        "git": "#EF4C40",
        "css": "#55A144",
      }
    },
  },
  plugins: [],
}
