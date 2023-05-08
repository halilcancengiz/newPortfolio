import React, { useState } from "react";
import {
  AiFillEye,
  AiFillEyeInvisible,
  IoMail,
  BsTwitter,
  SiFacebook,
  FcGoogle,
} from "../../assets/icon";
import { NavLink, useNavigate } from "react-router-dom";
import { loginWithEmailAndPassword } from "../../services/firebase/firebase";
import SlideAnimation from "../../components/motion/SlideAnimation";

const Login = () => {
  // REACT-ROUTER
  const navigate = useNavigate();
  // STATES
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);
  const [otherLoginMethod, setOtherLoginMethods] = useState(false);

  // FUNCTIONS
  const changeMethod = () => {
    setOtherLoginMethods(!otherLoginMethod);
  };
  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await loginWithEmailAndPassword(
      login.email,
      login.password
    );
    if (isValid === true) {
      navigate("/", { replace: true });
    }
  };
  return (
    <SlideAnimation>
      <div className="membership-bg min-h-screen bg-dark flex items-center justify-center xs:bg-top sm:bg-bottom bg-gradient-to-right from-black to-gray-900 bg-blend-darken bg-opacity-70 ">
        <div className="w-100 flex flex-col py-7">
          <div className="flex flex-col xs:items-center px-3 focus:border">
            <h1 className="capitalize flex sm:text-4xl xs:text-2xl my-3 font-bold text-white">
              Login to your account
            </h1>
            <div className="capitalize text-gray-300 sm:text-base xs:text-sm">
              Not a member yet?
              <NavLink
                className="text-blue-500 font-semibold ml-1"
                to="/membership/register"
              >
                Register.
              </NavLink>
            </div>
            <button
              onClick={changeMethod}
              className="w-full text-blue-500 mt-3 rounded-full"
            >
              Other Register Methods
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className={`my-5 flex-col flex ${
              otherLoginMethod ? "hidden" : "block"
            }`}
          >
            <div
              id="login-email-container"
              className="flex justify-between items-center px-2 bg-dark-input border-2 border-transparent mx-2 mt-3 rounded-xl focus-within:border-twitter "
            >
              <div className="flex flex-col grow">
                <label
                  className="ml-3 mt-1 text-xs text-gray-400 "
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  onChange={handleChange}
                  name="email"
                  value={login.email}
                  id="register-email"
                  className="bg-transparent text-white w-full outline-none pl-3 sm:h-8 xs:h-4 my-1 sm:text-base xs:text-sm"
                  type="email"
                />
              </div>
              <IoMail color="white" className="flex ml-2" size={23} />
            </div>

            <div className="flex justify-between items-center px-2 bg-dark-input border-2 border-transparent mx-2 my-3 rounded-xl  focus-within:border-twitter">
              <div className="flex flex-col grow">
                <label
                  className="ml-3 mt-1 text-xs text-gray-400 "
                  htmlFor="email"
                >
                  Password
                </label>
                <input
                  onChange={handleChange}
                  name="password"
                  value={login.password}
                  className="bg-transparent text-white w-full outline-none pl-3 sm:h-8 xs:h-4 my-1 sm:text-base xs:text-sm"
                  type={passwordVisibility ? "text" : "password"}
                />
              </div>
              <div
                className="flex ml-2"
                onClick={() => setPasswordVisibility(!passwordVisibility)}
              >
                {passwordVisibility ? (
                  <AiFillEyeInvisible color="white" size={23} />
                ) : (
                  <AiFillEye color="white" size={23} />
                )}
              </div>
            </div>
            <button
              type="submit"
              className={`w-full text-white sm:h-12 xs:h-10  bg-gray-btn rounded-full hover:bg-blue-btn ${
                otherLoginMethod ? "hidden" : "block"
              }`}
            >
              Login
            </button>
          </form>
          <div className="flex flex-col">
            <div
              className={`my-5 gap-3 flex flex-col items-center justify-center sm:p-0 xs:px-2  ${
                otherLoginMethod ? "block" : "hidden"
              }`}
            >
              <div className="sm:h-16 xs:h-12 bg-dark-input rounded-xl flex items-center justify-center w-full cursor-pointer hover:border-2 border-twitter">
                <BsTwitter size={30} className="text-twitter" />
              </div>
              <div className="sm:h-16 xs:h-12 bg-dark-input rounded-xl flex items-center justify-center w-full cursor-pointer hover:border-2 border-google">
                <FcGoogle size={30} />
              </div>
              <div className="sm:h-16 xs:h-12 bg-dark-input rounded-xl flex items-center justify-center w-full cursor-pointer  hover:border-2 border-border-blue">
                <SiFacebook size={30} className="text-facebook" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideAnimation>
  );
};

export default Login;
