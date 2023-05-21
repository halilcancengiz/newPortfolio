import React, { useState } from 'react'
import { SlDislike, SlLike } from "../assets/icon"
import author from "../assets/images/author.jpeg"

export const CommentReply = ({ isLoggedIn }) => {
    const [showAllText, setShowAllText] = useState(false)
    const likesCount = 20
    const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus dolorum enim debitis. Assumenda ex sunt dolore iure totam accusantium, possimus ullam consequatur odit nam officia explicabo expedita! Provident laudantium facilis recusandae, cum minima sequi? Necessitatibus dicta cupiditate dolore facere aliquid, omnis aut officia, unde aliquam corrupti inventore quae ipsam quis eveniet suscipit architecto sapiente alias consequatur dolor molestiae non fuga. Fugiat optio aliquid sunt voluptatem totam aspernatur odit illo voluptas natus perspiciatis velit provident, magnam aliquam eum vero voluptates suscipit quaerat incidunt nobis quam? Similique eligendi eos deserunt odit modi non laborum autem harum esse quis, nesciunt itaque veritatis quidem."
    return (
        <div className="flex items-start text-xs mt-5 pl-5">
            <div className="mr-3 flex">
                <div className="bg-blue-400 border-2 border-[#1E3B55] h-7 w-7 rounded-full flex items-center justify-center overflow-hidden">
                    <img className="w-full h-full object-co" src={author} alt="" />
                </div>
            </div>

            <div className="flex items-start flex-col ">

                <div className="font-medium flex">
                    <span>hllcncngz</span>
                    <div>
                        <button className="ml-2 text-[10px] italic text-gray-500 cursor-pointer">düzenle</button>
                        <span className="mx-2">/</span>
                        <button className="text-[10px] italic text-gray-500 cursor-pointer">sil</button>
                    </div>
                </div>

                <div onClick={() => setShowAllText(!showAllText)} className={`${showAllText ? "" : "line-clamp-3"} font-light leading-comment`}>
                    {text}
                </div>

                <div className="flex items-center mt-2 w-full">
                    <div className="flex w-full justify-between ">
                        {
                            isLoggedIn &&
                            <div className="flex gap-2">
                                <button className="group cursor-pointer text-gray-500 hover:rotate-[-45deg] hover:scale-125 transition-all duration-300">
                                    <SlLike className="text-black group-hover:text-green-700" />
                                </button>

                                <button className="group cursor-pointer text-gray-500 hover:rotate-[-45deg] hover:scale-125 transition-all duration-300">
                                    <SlDislike className="text-black group-hover:text-red-400" />
                                </button>
                            </div>
                        }

                        <div className="font-medium text-xs flex justify-end w-full">{likesCount}<span className="ml-1">beğeni</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
