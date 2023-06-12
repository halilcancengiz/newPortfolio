import React, { useState } from 'react';
import { sendMessage } from '../services/firebase/firebase';


const Contact = () => {
  const [messages, setMessages] = useState({
    fullName: "",
    subject: "",
    content: "",
  });

  const handleChange = (e) => {
    setMessages({ ...messages, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await sendMessage(messages);
      if (response) {
        setMessages({
          fullName: "",
          subject: "",
          content: ""
        });
      }
    } catch (error) {
      console.log("Contact-handleSubmit", error);
    }
  };

  const isDisabled = () => {
    return !messages.fullName || !messages.subject || !messages.content;
  };

  return (
    <div id='contact' className='min-h-screen max-w-[1300px] w-full flex flex-col'>
      <div className="w-full flex items-center justify-center py-5 text-center my-10 drop-shadow-dark-btn ">
        <h6 className="header-stroke lg:text-4xl sm:text-3xl xs:text-2xl text-center uppercase">
          İletişim
        </h6>
      </div>
      <div className='flex w-full'>
        <form onSubmit={handleSubmit} className=' max-w-[600px] mx-auto w-full flex items-start xs:p-5 justify-start flex-col border-b border-t rounded-2xl border-[#1E364C] shadow-border-shadow-contact'>
          <div className='flex w-full flex-col '>
            <label className='w-full mb-2' htmlFor="contact-fullname">Ad-Soyad</label>
            <input onChange={handleChange} value={messages.fullName} name='fullName' style={{ boxShadow: " 0 0 10px rgba(0,0,0,.7)" }} className='w-full focus:border-[#2C9BEC] glassmorphism-button mb-2 bg-transparent border-b px-5 py-2 outline-none ' type="text" />
          </div>
          <div className='flex w-full flex-col '>
            <label className='w-full mb-2' htmlFor="contact-fullname">Konu</label>
            <input onChange={handleChange} value={messages.subject} name='subject' style={{ boxShadow: " 0 0 10px rgba(0,0,0,.7)" }} className='w-full focus:border-[#2C9BEC] glassmorphism-button mb-2 bg-transparent border-b px-5 py-2 outline-none ' type="text" />
          </div>
          <div className='flex w-full flex-col'>
            <label className='w-full mb-2' htmlFor="contact-fullname">Mesaj</label>
            <textarea onChange={handleChange} value={messages.content} name='content' style={{ boxShadow: " 0 0 10px rgba(0,0,0,.7)" }} className='w-full focus:border-[#2C9BEC] glassmorphism-button resize-none bg-transparent border p-5 outline-none' cols="30" rows="10"></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div className="glassmorphism-button rounded-[10px] overflow-hidden border flex items-center justify-center my-2 cursor-pointer group bg-transparent relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 z-[-1] rounded-lg bg-gradient-to-r from-blue-500 to-black-700 group-hover:h-full group-hover:w-full group-hover:font-bold animate-pulse transition-all duration-300"></div>
              <button disabled={isDisabled()} className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer uppercase w-full h-full py-1 px-10">
                Gönder
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
