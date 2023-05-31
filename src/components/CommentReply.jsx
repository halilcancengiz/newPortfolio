import React, { useState } from 'react'
// import { SlDislike, SlLike } from "../assets/icon"
import author from "../assets/images/author.jpeg"
import { TiTick, RxCross2 } from "../assets/icon"
import { dateTimeFormat } from '../utils/dateTimeFormatHelper'
import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'
import { deleteReply, updateReply } from '../services/firebase/firebase'
import { Popconfirm, Tooltip } from 'antd';

export const CommentReply = ({ isLoggedIn, replyDetail, commentId }) => {
    const [showAllText, setShowAllText] = useState(false)
    const [isReplyEditing, setIsReplyEditing] = useState(false)
    const [editReplyContent, setEditReplyContent] = useState(replyDetail.content)

    const confirm = (e) => {
        deleteReply(commentId, replyDetail)
    };

    const selectUser = state => state.user.value;
    const userSelector = createSelector(
        selectUser,
        user => user
    );
    const user = useSelector(userSelector);

    const submitUpdateReply = async () => {
        await updateReply(commentId, replyDetail, editReplyContent);
        setIsReplyEditing(false);
        setEditReplyContent(prevContent => (prevContent === replyDetail.content ? prevContent : editReplyContent));
    };

    return (
        <div className="flex items-start text-xs mt-5 pl-5">
            <div className="mr-3 flex">
                <div className="bg-blue-400 border-2 border-[#1E3B55] h-7 w-7 rounded-full flex items-center justify-center overflow-hidden">
                    <img className="w-full h-full object-co" src={author} alt="" />
                </div>
            </div>

            <div className="flex items-start flex-col  w-full border-b-2 border-b-gray-400">

                <div className="font-medium flex">
                    <span>hllcncngz</span>
                    {
                        user && replyDetail && user.uid == replyDetail.author ? (
                            <div>
                                <button onClick={() => setIsReplyEditing(true)} className="ml-2 text-[10px] italic text-gray-500 cursor-pointer">düzenle</button>
                                <span className="mx-2">/</span>
                                <Popconfirm
                                    title="Bu cevabı kalıcı olarak silmek istediğinize emin misiniz?"
                                    onConfirm={confirm}
                                    okText="Evet"
                                    cancelText="Hayır"
                                >
                                    <button className="text-[10px] italic text-gray-500 cursor-pointer">sil</button>
                                </Popconfirm>

                            </div>
                        ) : ""
                    }
                </div>
                <span className="text-gray-500 text-xs italic">
                    {!replyDetail.updatedAt ? dateTimeFormat(replyDetail.createdAt) : `${dateTimeFormat(replyDetail.updatedAt)} (güncellendi)`}
                </span>

                <div onClick={() => setShowAllText(!showAllText)} className={`xs:text-xs sm:text-sm overflow-hidden w-full font-light leading-comment my-2 flex items-center justify-center`}>
                    <div className={`${showAllText ? "" : "line-clamp-3"} w-full flex break-all `}>
                        {
                            !isReplyEditing ? (
                                <React.Fragment>
                                    {replyDetail.content.split(' ').map((word, index, array) => (
                                        <React.Fragment key={index}>
                                            {word}
                                            {index !== array.length - 1 && ' '}
                                        </React.Fragment>
                                    ))}
                                </React.Fragment>
                            ) : (
                                <div className="w-full flex flex-col">
                                    <textarea maxLength={300} className="w-full rounded-lg h-[90px] resize-none border-2  p-2 outline-none" onChange={(e) => setEditReplyContent(e.target.value)} value={editReplyContent}></textarea>
                                    <div className="w-full flex justify-end gap-2 mt-2">
                                        <Tooltip title="Güncelle" >
                                            <button onClick={() => submitUpdateReply(replyDetail.replyId)} >
                                                <TiTick size={20} className="text-green-400" />
                                            </button>
                                        </Tooltip>
                                        <Tooltip title="iptal Et">
                                            <button onClick={() => { setIsReplyEditing(false), setEditReplyContent(replyDetail.content) }}>
                                                <RxCross2 className="text-red-400" size={20} />
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                {/* <div className="flex items-center mt-2 w-full ">
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
                </div> */}
            </div>
        </div>
    )
}
