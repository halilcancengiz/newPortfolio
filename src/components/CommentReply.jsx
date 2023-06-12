import React, { useCallback, useEffect, useState } from 'react'
import { createSelector } from 'reselect'
import { useSelector } from 'react-redux'
import author from "../assets/images/author.jpeg"
import defaultUserImage from "../assets/images/default.avif"
import { TiTick, RxCross2 } from "../assets/icon"
import { dateTimeFormat } from '../utils/dateTimeFormatHelper'
import { deleteReply, getAllUsersInfo, getUserImage, updateReply } from '../services/firebase/firebase'
import { Popconfirm, Tooltip } from 'antd';
import { findAuthorName } from '../utils/findAuthorName'

export const CommentReply = ({ replyDetail, commentId }) => {
    const [showAllText, setShowAllText] = useState(false)
    const [isReplyEditing, setIsReplyEditing] = useState(false)
    const [editReplyContent, setEditReplyContent] = useState(replyDetail.content)
    const [image, setImage] = useState("")
    const [allUsersInfo, setAllUsersInfo] = useState([])

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

    const fetchImageURL = useCallback(async (author) => {
        try {
            const url = await getUserImage(author);
            if (url) {
                setImage(url);
            } else {
                setImage(defaultUserImage);
            }
        } catch (error) {
            console.log(error);
        }
    }, [author]);

    const fetchAllUsersInfo = useCallback(async () => {
        try {
            const allUsersInfo = await getAllUsersInfo();
            setAllUsersInfo(allUsersInfo);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchImageURL(replyDetail.userId);
        fetchAllUsersInfo()
    }, [fetchImageURL, replyDetail.userId], image);

    return (
        <div className="flex items-start text-xs mt-5 pl-5">
            <div className="mr-3 flex">
                <div className="bg-blue-400 border-2 border-[#1E3B55] h-7 w-7 rounded-full flex items-center justify-center overflow-hidden">
                    <img className="w-full h-full object-cover" src={image} alt="" />
                </div>
            </div>

            <div className="flex items-start flex-col  w-full border-b-2 border-b-gray-400">

                <div className="font-medium flex">
                    <span>{findAuthorName(allUsersInfo, replyDetail.userId)}</span>
                    {
                        user && replyDetail && user.uid == replyDetail.userId ? (
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
            </div>
        </div>
    )
}
