import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { registerWithEmailAndPassword } from "../../services/firebase/firebase";
import { AiFillEye, AiFillEyeInvisible, IoMail} from "../../assets/icon";
import SlideAnimation from "../../components/motion/SlideAnimation";


const Register = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);

  // FUNCTIONS
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await registerWithEmailAndPassword(
      register.email,
      register.password,
      register.confirmPassword
    );
    if (isValid === true) {
      navigate("/", { replace: true });
    }
  };

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  return (
    <SlideAnimation >
      <div className="membership-bg min-h-screen bg-dark flex items-center justify-center xs:bg-top sm:bg-bottom bg-gradient-to-right from-black to-gray-900 bg-blend-darken bg-opacity-70 ">
        <div className="w-100 flex flex-col py-7">
          <div className="flex flex-col xs:items-center px-3 focus:border">
            <h3 className="uppercase sm:text-base xs:text-sm font-semibold text-gray-300">
              Hemen başlayın
            </h3>
            <h1 className="capitalize flex sm:text-4xl xs:text-2xl my-3 font-bold text-white">
              Yeni Hesap Oluştur
            </h1>
            <div className="capitalize text-gray-300 sm:text-base xs:text-sm">
              Zaten üye misiniz?
              <NavLink
                className="text-blue-500 font-semibold ml-1"
                to="/membership/login"
              >
                giriş yap
              </NavLink>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="my-5 px-2">
            <div id="register-email-container" className="flex justify-between items-center px-2 glassmorphism-button bg-dark-input border-2 border-transparent my-3 rounded-xl focus-within:border-twitter " >
              <div className="flex flex-col grow">
                <label className="ml-3 mt-1 text-xs text-gray-400 " htmlFor="email">
                  E-posta
                </label>
                <input
                  onChange={handleChange}
                  name="email"
                  value={register.email}
                  id="register-email"
                  className="bg-transparent text-white w-full outline-none pl-3 sm:h-8 xs:h-4 my-1 sm:text-base xs:text-sm"
                  type="email"
                />
              </div>
              <IoMail color="white" className="flex ml-2" size={23} />
            </div>

            <div className="flex justify-between items-center glassmorphism-button px-2 bg-dark-input border-2 border-transparent my-3 rounded-xl  focus-within:border-twitter">
              <div className="flex flex-col grow">
                <label className="ml-3 mt-1 text-xs text-gray-400 " htmlFor="email">
                  Parola
                </label>
                <input
                  onChange={handleChange}
                  name="password"
                  value={register.password}
                  className="bg-transparent text-white w-full outline-none pl-3 sm:h-8 xs:h-4 my-1 sm:text-base xs:text-sm"
                  type={passwordVisibility ? "text" : "password"}
                />
              </div>
              <div className="flex ml-2" onClick={() => setPasswordVisibility(!passwordVisibility)} >
                {passwordVisibility ? (
                  <AiFillEyeInvisible color="white" size={23} />
                ) : (
                  <AiFillEye color="white" size={23} />
                )}
              </div>
            </div>

            <div className="flex justify-between glassmorphism-button items-center px-2 bg-dark-input my-3 border-2 border-transparent rounded-xl  focus-within:border-twitter">
              <div className="flex flex-col grow">
                <label className="ml-3 mt-1 text-xs text-gray-400 capitalize " htmlFor="email" >
                  parolayı onayla
                </label>
                <input
                  onChange={handleChange}
                  name="confirmPassword"
                  value={register.confirmPassword}
                  className="bg-transparent text-white w-full outline-none pl-3 sm:h-8 xs:h-4 my-1 sm:text-base xs:text-sm"
                  type={confirmPasswordVisibility ? "text" : "password"}
                />
              </div>
              <div className="flex ml-2"
                onClick={() =>
                  setConfirmPasswordVisibility(!confirmPasswordVisibility)
                }
              >
                {confirmPasswordVisibility ? (
                  <AiFillEyeInvisible color="white" size={23} />
                ) : (
                  <AiFillEye color="white" size={23} />
                )}
              </div>
            </div>
            <button type="submit" className="w-full mx-auto glassmorphism-button text-white sm:h-12 xs:h-10  bg-gray-btn rounded-full hover:bg-blue-btn ">
              Kayıt Ol
            </button>
          </form>
        </div>
      </div>
    </SlideAnimation>
  );
};

export default Register;
