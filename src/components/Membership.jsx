import React,{ useState } from "react"
import { NavLink } from "react-router-dom"
import { AiFillEye, AiFillEyeInvisible, IoMail } from "../assets/icon"

const Membership = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    return (
        <div className="h-screen w-screen bg-slate-700 md-2:w-full flex items-center justify-start font-open">
            <div className="w-[550px] ml-13 rounded-[10px] p-[50px]  tracking-wider">
                <div>
                    <h3 className="xs:text-sm sm:text-lg text-slate-300 uppercase ">Start For Free</h3>
                    <div className="flex items-center justify-start mt-3">
                        <h1 className="xs:text-3xl sm:text-4xl text-white capitalize">Create new account </h1>
                        <div className="xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 mt-5 ml-1 rounded-full bg-blue-500 transition"></div>
                    </div>
                    <span className="xs:text-xs sm:text-sm flex my-3 text-slate-300 capitalize transition">Already A Member? <NavLink to="" className="ml-1 text-blue-500">Log In</NavLink> </span>
                </div>
                <form className="text-white my-7" >
                    <label htmlFor="login-email" className='xs:py-0 sm:py-1  border-solid border-[1px] flex items-center my-2  rounded-xl focus:border-solid focus:border-2'>
                        <div className='input-area flex flex-col w-full'>
                            <div className="text-xs" >Email</div>
                            {/* <input id="login-email" className="xs:p-0 sm:p-1 bg-transparent w-full focus:outline-none " type="text" /> */}
                        </div>
                        <div className='label-icon'>
                            <IoMail size={20} />
                        </div>
                    </label>
                    <label htmlFor="login-password" className='xs:py-0 sm:py-1 border-solid border-[1px] flex items-center my-2 rounded-xl focus:border-blue-600'>
                        <div className='input-area flex flex-col w-full'>
                            <div className="text-xs">Password</div>
                            {/* <input id="login-password" className="xs:p-0 sm:p-1  bg-transparent w-full focus:outline-none " type={passwordVisibility ? "text" : "password"} /> */}
                        </div>
                        <div onClick={() => setPasswordVisibility(!passwordVisibility)} className='label-icon'>
                            {
                                passwordVisibility ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />
                            }
                        </div>
                    </label>
                </form>
                <div className="flex items-center justify-between gap-2">
                    <button className="btn w-1/2 p-2 bg-slate-50 rounded-xl">Change Method</button>
                    <button className="btn w-1/2 p-2 bg-slate-50 rounded-xl">Create Account</button>
                </div>
            </div>
        </div>


    )
}

export default Membership