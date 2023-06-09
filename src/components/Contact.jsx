import React from 'react'
import contactImage from "../assets/images/contact.png"

const Contact = () => {
    return (
        <div id='contact' className='min-h-screen max-w-[1300px] w-full flex flex-col'>
            <div className="w-full flex items-center justify-center py-5 text-center my-10 drop-shadow-dark-btn ">
                <h6 className="header-stroke lg:text-4xl sm:text-3xl xs:text-2xl text-center uppercase">
                    İletişim
                </h6>
            </div>
            <div className='flex w-full'>
                <form className=' max-w-[600px] mx-auto w-full flex items-start xs:p-5 justify-start flex-col border-b border-t rounded-2xl border-[#1E364C] shadow-border-shadow-contact'>
                    <div className='flex w-full flex-col '>
                        <label className='w-full mb-2' htmlFor="contact-fullname">Ad-Soyad</label>
                        <input style={{ boxShadow: " 0 0 10px rgba(0,0,0,.7)" }} className='w-full focus:border-[#2C9BEC] glassmorphism-button mb-2 bg-transparent border-b px-5 py-2 outline-none ' type="text" />
                    </div>

                    <div className='flex w-full flex-col'>
                        <label className='w-full mb-2' htmlFor="contact-fullname">Mesaj</label>
                        <textarea style={{ boxShadow: " 0 0 10px rgba(0,0,0,.7)" }} className='w-full focus:border-[#2C9BEC] glassmorphism-button resize-none bg-transparent border p-5 outline-none' name="" id="" cols="30" rows="10">

                        </textarea>
                    </div>

                    <div className='w-full flex justify-end'>
                        <a style={{ borderRadius: "5px" }} className=" glassmorphism-button overflow-hidden border flex items-center justify-center my-2 px-10 cursor-pointer group bg-transparent relative py-1">
                            <div
                                style={{ transition: "all .5s ease-in-out" }}
                                className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-0 h-0 z-[-1]  bg-gradient-to-r from-blue-700 to-black-700 group-hover:h-full  group-hover:w-full group-hover:transition-all group-hover:font-bold group-hover:duration-500 animate-pulse"
                            ></div>
                            <span className='uppercase'>
                                Gönder
                            </span>
                        </a>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default Contact