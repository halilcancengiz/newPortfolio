import React from 'react'
import codetyping from "../assets/images/codetyping.png";
import Particle from './Particle';


const Intro = () => {

    return (

        <section className={`relative min-w-screen min-h-screen flex items-center justify-center overflow-hidden flex-col after:content-[''] after:animate-opacity after:rounded-full after:h-20 after:w-20 after:bg-transparent after:absolute after:top-[-80px] after:left-[-80px] after:shadow-border-shadow-blue after:sm:block after:xs:hidden before:sm:block before:xs:hidden before:animate-opacity before:content-[''] before:rounded-full before:h-20 before:w-20 before:bg-transparent before:absolute before:bottom-[-80px] before:right-[-80px] before:shadow-border-shadow-blue  `} >
            <Particle />
            <div className="flex justify-center">
                <img className="w-1/3 min-w-[280px] drop-shadow-blue-btn " src={codetyping} alt="" />
            </div>
            <h3 className="sm:text-2xl xs:text-lg sm:animate-opacity xs:animate-none text-blue-btn font-bold italic header-stroke-without-border">
                Halil Can Cengiz
            </h3>
            <h1 className="sm:text-2xl xs:text-lg font-bold text-center flex flex-col items-center">
                Öğrenmek, Tasarlamak ve Paylaşmak:
                <span className="sm:text-lg xs:text-base italic">
                    Frontend Geliştirme Yolculuğum
                </span>
            </h1>
            <h3 className="text-center sm:text-base xs:text-sm my-2">
                Kişisel deneyimlerim, projelerim ve öğrenme yolculuğum paylaşımları
                ile frontend geliştirme dünyasında yön bulun.
            </h3>
        </section>


    )
}

export default Intro