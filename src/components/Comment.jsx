import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Popconfirm, Tooltip } from "antd";
import { AiFillLike, AiFillHeart, TiTick, RxCross2 } from "../assets/icon";
import { BsLightbulbFill } from "../assets/icon";
import { FaLaughBeam } from "../assets/icon";
import { RiSendPlaneFill } from "../assets/icon";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import defaultUserImage from "../assets/images/default.avif"
import author from "../assets/images/author.jpeg";

import { addLike, addReply, deleteComment, getUserImage, removeLike, updateComment } from "../services/firebase/firebase";
import { dateTimeFormat } from "../utils/dateTimeFormatHelper";
import { typeNameTranslationHandler } from "../utils/typeNameTranslationHandler";
import { likeInformationColor } from "../utils/likeInformationColor";
import useTypeIcon from "../hooks/useTypeIcon";

import LikeSummaryModal from "./modals/LikeSummaryModal";
import { CommentReply } from "./CommentReply";

const Comment = ({ isVisible, isLoggedIn, detail, user, postComments, userInfo }) => {

  const [showAddReplyArea, setShowAddReplyArea] = useState(false)
  const [showAllText, setShowAllText] = useState(false)
  const [showReply, setShowReply] = useState(false)
  const [replyText, setReplyText] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(detail.content)
  const [image, setImage] = useState("")

  const handleShowReply = () => setShowReply(true)
  const handleReply = () => setShowAddReplyArea(true)
  const updateLike = (commentId, likeType) => addLike(commentId, user.uid, likeType)
  const sendReplyContent = (commentId, userId) => {
    replyText.length <= 0
      ? toast.warning("Lütfen alanı doldurun!")
      : (addReply(commentId, userId, replyText, uuidv4()), setShowAddReplyArea(false), setReplyText(""));
  };
  const handleLikeAction = (commentId, likeType) => {
    const currentLikeType = detail.likes.find(like => like.id === user.uid)?.type;
    detail.likes.some(like => like.id === user.uid)
      ? removeLike(commentId, user.uid, currentLikeType)
      : addLike(commentId, user.uid, likeType);
  }
  const handleDeleteComment = commentId => deleteComment(commentId)
  const handleUpdateComment = e => setEditContent(e.target.value)

  const submitUpdateComment = async () => {
    await updateComment(detail.commentId, editContent);
    setIsEditing(false);
    setEditContent(prevContent => (prevContent === detail.content ? prevContent : editContent));
  };
  const sortedReplies = useMemo(() => {
    if (detail.replies.length > 0 && showReply) {
      return detail.replies.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return [];
  }, [detail.replies, showReply]);


  const replyComponents = sortedReplies.map((reply, index) => (
    <CommentReply key={index} isLoggedIn={isLoggedIn} replyDetail={reply} commentId={detail.commentId} />
  ));

  const fetchImageURL = useCallback(async (author) => {
    try {
      const url = await getUserImage(author);
      if (url) {
        setImage(url);
      } else {
        setImage(defaultUserImage);
      }
    } catch (error) {
      // Hata durumunda yapılması gerekenler
    }
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setShowReply(false);
    }
    if (user) {
      fetchImageURL(detail.userId);
    }
  }, [user, fetchImageURL, isVisible,detail.userId]);

  return (
    <div className="border-t py-2 border-gray-300">
      <div className="flex items-start my-2">
        <div className="mr-3 flex ">
          <div className=" h-10 w-10 border-2 border-[#1E3B55] rounded-full flex items-center justify-center overflow-hidden">
            <img className="w-full h-full object-cover" src={image} alt="" />
          </div>
        </div>
        <div className="flex items-start flex-col  w-full">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span onClick={() => console.log(detail.userId)} className="xs:text-xs sm:text-sm font-medium">{detail.author ? detail.author : "Yeni Kullanıcı"}</span>
              {
                user && detail && user.uid == detail.userId ? (
                  <div>
                    <label htmlFor="editContent" onClick={() => setIsEditing(true)} className="ml-2 text-[10px] italic text-gray-500 cursor-pointer">düzenle</label>
                    <span className="mx-2">/</span>
                    <Popconfirm
                      title="Bu yorumu kalıcı olarak silmek istediğinize emin misiniz?"
                      onConfirm={() => handleDeleteComment(detail.commentId)}
                      okText="Evet"
                      cancelText="Hayır">
                      <button className="text-[10px] italic text-gray-500 cursor-pointer">sil</button>
                    </Popconfirm>
                  </div>
                ) : ""
              }
            </div>
            <span className="text-gray-500 text-xs italic">
              {!detail.updatedAt ? dateTimeFormat(detail.createdAt) : `${dateTimeFormat(detail.updatedAt)} (güncellendi)`}
            </span>
          </div>
          <div onClick={() => setShowAllText(!showAllText)} className={`xs:text-xs sm:text-sm  overflow-hidden font-light leading-comment my-2 flex items-center justify-center w-full`}>
            <div className={`${showAllText ? "" : "line-clamp-3"} w-full flex break-all`}>
              {
                !isEditing ? (
                  <React.Fragment>
                    {detail.content.split(' ').map((word, index, array) => (
                      <React.Fragment key={index}>
                        {word}
                        {index !== array.length - 1 && ' '}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ) : (
                  <div className="w-full flex flex-col">
                    <textarea id="editContent" maxLength={300} className="w-full rounded-lg h-[90px] resize-none border-2  p-2 outline-none" onChange={(e) => handleUpdateComment(e)} value={editContent}></textarea>
                    <div className="w-full flex justify-end gap-2 mt-2">
                      <Tooltip title="Güncelle" >
                        <button onClick={submitUpdateComment} ><TiTick size={20} className="text-green-400" /></button>
                      </Tooltip>
                      <Tooltip title="iptal Et">
                        <button onClick={() => { setIsEditing(false), setEditContent(detail.content) }}><RxCross2 className="text-red-400" size={20} /></button>
                      </Tooltip>
                    </div>
                  </div>
                )
              }

            </div>
          </div>
          <div className="flex items-center mt-2 w-full ">
            {
              isLoggedIn &&
              (
                <label onClick={handleReply} className="cursor-pointer text-gray-500 mr-5 hover:text-gray-900" htmlFor="replyArea">
                  Reply
                </label>

              )
            }
            <div className={`flex w-full   ${isLoggedIn ? "justify-between" : " justify-end"}`}>
              {isLoggedIn && (
                <div className="flex gap-2">
                  <button className="group relative  cursor-pointer text-gray-500 transition-all duration-300">
                    <div onClick={() => handleLikeAction(detail.commentId, "like")} className="flex items-center gap-1">
                      {
                        user.uid && detail.likes.find(x => x.id === user.uid) ? (
                          detail.likes.filter(x => x.id === user.uid).map(c => (
                            <React.Fragment key={c.id}>
                              {useTypeIcon(c.type, 16)}
                              <div className={`${likeInformationColor(c.type)}`}><span className="capitalize">{typeNameTranslationHandler(c.type)}</span></div>
                            </React.Fragment>
                          ))
                        ) : (
                          <React.Fragment>
                            {useTypeIcon("default", 16)}
                            <span>Beğen</span>
                          </React.Fragment>
                        )
                      }
                    </div>
                    <div
                      style={{ boxShadow: "0 0 5px gray" }}
                      className="bg-gray-50 rounded-md h-8 hidden absolute bottom-5 right-[50%] translate-x-[50%] group-hover:flex transition-all duration-500 items-center gap-3 px-3 py-1"
                    >
                      {[
                        { title: "Beğen", icon: <AiFillLike color="#6FC276" size={20} />, type: "like" },
                        { title: "Harika", icon: <AiFillHeart color="#C53F3F" size={20} />, type: "awesome" },
                        { title: "Bilgilendirici", icon: <BsLightbulbFill color="orange" size={20} />, type: "informative" },
                        { title: "Eğlenceli", icon: <FaLaughBeam color="#4282EE" size={20} />, type: "funny" },
                      ].map(({ title, icon, type }) => (
                        <Tooltip key={type} title={title}>
                          <div onClick={() => updateLike(detail.commentId, type)} className="flex grow items-center justify-center h-full">
                            {icon}
                          </div>
                        </Tooltip>
                      ))}
                    </div>
                  </button>
                </div>
              )}
              {detail.likes.length > 0 && (
                <LikeSummaryModal postComments={postComments} count={detail.likes.length} commentId={detail.commentId} />
              )}
            </div>
          </div>
          {
            showReply && <div onClick={() => setShowReply(false)} className="text-gray-500 w-full justify-end flex cursor-pointer">cevapları gizle</div>
          }
          <div className={`w-full mt-2 ${showAddReplyArea ? "block" : "hidden"} transition-transform duration-500`}>
            <div className="w-full flex items-center border-2 rounded-lg overflow-hidden">
              <input onChange={(e) => setReplyText(e.target.value)} value={replyText} id="replyArea" className="w-full outline-none h-10 px-2" type="text" placeholder="cevapla..." />
              <button onClick={() => sendReplyContent(detail.commentId, user.uid)}>
                <RiSendPlaneFill size={20} className="cursor-pointer mr-2" />
              </button>
            </div>
            <span onClick={() => setShowAddReplyArea(false)} className="text-gray-500 w-full justify-end flex cursor-pointer">gizle</span>
          </div>
        </div>
      </div>
      <div onClick={handleShowReply} className="w-full">
        {
          detail.replies.length > 0 && !showReply ? (
            <div className="w-full h-7 flex items-center text-gray-500 cursor-pointer justify-end">
              {detail.replies.length} cevabın tümünü gör
            </div>
          ) : (detail.replies.length > 0 && showReply) ? replyComponents : null
        }
      </div>
    </div>
  )
};

export default memo(Comment)

