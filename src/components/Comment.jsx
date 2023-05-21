import React, { memo, useState } from "react";
import author from "../assets/images/author.jpeg"
import { CommentReply } from "./CommentReply";
import { useEffect } from "react";
import { RiSendPlaneFill } from "../assets/icon"
import { dateTimeFormat } from "../utils/dateTimeFormatHelper";
import { addLike, addReplyText, removeLike } from "../services/firebase/firebase";
import { FaLaughBeam, BsLightbulbFill, AiFillLike, AiFillHeart } from "../assets/icon"
import { Tooltip } from "antd";
import LikeSummaryModal from "./modals/LikeSummaryModal";
import useTypeIcon from "../hooks/useTypeIcon";
import { likeInformationColor } from "../utils/likeInformationColor";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Comment = ({ isVisible, isLoggedIn, detail, user, postComments }) => {


  const [showAddReplyArea, setShowAddReplyArea] = useState(false)
  const [showAllText, setShowAllText] = useState(false)
  const [showReply, setShowReply] = useState(false)
  const [replyText, setReplyText] = useState("")

  const handleShowReply = () => {
    setShowReply(true)
  }

  const handleReply = () => {
    setShowAddReplyArea(true)
  }

  const sendReplyContent = (commentId, userId) => {
    if (replyText.length <= 0) {
      toast.warning("Lütfen alanı doldurun!")
    } else {
      addReplyText(commentId, userId, replyText, uuidv4())
      setShowAddReplyArea(false)
      setReplyText("")
    }
  };

  const updateLike = (commentId, likeType) => {
    addLike(detail.commentId, user.uid, likeType)
  }

  const handleLikeAction = (commentId, likeType) => {
    const currentLikeType = detail.likes.find(like => like.id === user.uid)?.type;
    if (detail.likes.some(like => like.id === user.uid)) {
      removeLike(commentId, user.uid, currentLikeType)
    } else {
      addLike(commentId, user.uid, likeType)
    }
  }

  useEffect(() => {
    if (!isVisible) {
      setShowReply(false)
    }
  }, [isVisible])

  return (
    <div className="border-t py-2 border-gray-300">
      <div className="flex items-start my-2">
        <div className="mr-3 flex ">
          <div className=" h-10 w-10 border-2 border-[#1E3B55] rounded-full flex items-center justify-center overflow-hidden">
            <img className="w-full h-full object-cover" src={author} alt="" />
          </div>
        </div>

        <div className="flex items-start flex-col  w-full">

          <div className="flex flex-col">

            <div className="flex items-center">
              <span className="xs:text-xs sm:text-sm font-medium">hllcncngz</span>
              {
                user && detail && user.uid == detail.author ? (
                  <div>
                    <button className="ml-2 text-[10px] italic text-gray-500 cursor-pointer">düzenle</button>
                    <span className="mx-2">/</span>
                    <button className="text-[10px] italic text-gray-500 cursor-pointer">sil</button>
                  </div>
                ) : ""
              }
            </div>

            <span className="text-gray-500 text-xs italic">
              {dateTimeFormat(detail.createdAt)}
            </span>

          </div>
          <div onClick={() => setShowAllText(!showAllText)} className={`xs:text-xs sm:text-sm  overflow-hidden font-light leading-comment my-2 flex items-center justify-center`}>
            <p className={`${showAllText ? "" : "line-clamp-3"} w-full flex break-all`}>
              {detail.content.split(' ').map((word, index, array) => (
                <React.Fragment key={index}>
                  {word}
                  {index !== array.length - 1 && ' '}
                </React.Fragment>
              ))}
            </p>
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
                              <span className={`${likeInformationColor(c.type)}`}>{c.type}</span>
                            </React.Fragment>
                          ))
                        ) : (
                          <React.Fragment>
                            {useTypeIcon("default", 16)}
                            <span>beğen</span>
                          </React.Fragment>
                        )
                      }
                    </div>
                    <div style={{ boxShadow: "0 0 5px gray" }} className="bg-gray-50 rounded-md h-8 hidden  absolute bottom-5 right-[50%] translate-x-[50%] group-hover:flex transition-all duration-500 items-center gap-3 px-3 py-1 ">

                      <Tooltip title="Beğen">
                        <div onClick={() => updateLike(detail.commentId, "like")} className="flex grow items-center justify-center h-full">
                          <AiFillLike color="#6FC276" size={20} className="text-black hover:drop-shadow-like  hover:scale-[150%] transition-all duration-500 h-full" />
                        </div>
                      </Tooltip>

                      <Tooltip title="Harika">
                        <div onClick={() => updateLike(detail.commentId, "awesome")} className="flex grow items-center justify-center h-full">
                          <AiFillHeart color="#C53F3F" size={20} className="text-black hover:drop-shadow-like hover:scale-[150%] transition-all duration-500 h-full" />
                        </div>
                      </Tooltip>

                      <Tooltip title="Bilgi verici">
                        <div onClick={() => updateLike(detail.commentId, "informative")} className="flex grow items-center justify-center h-full">
                          <BsLightbulbFill color="orange" size={20} className="text-black hover:drop-shadow-like hover:scale-[150%] transition-all duration-500 h-full" />
                        </div>
                      </Tooltip>

                      <Tooltip title="Eğlenceli">
                        <div onClick={() => updateLike(detail.commentId, "funny")} className="flex grow items-center justify-center h-full">
                          <FaLaughBeam color="#4282EE" size={20} className="text-black hover:drop-shadow-like hover:scale-[150%] transition-all duration-500 h-full" />
                        </div>
                      </Tooltip>

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
          ) : detail.replies.length > 0 && showReply ? detail.replies.map((reply, index) => (
            <CommentReply key={index} isLoggedIn={isLoggedIn} replyDetail={reply} />
          )) : null
        }
      </div>
    </div>

  )
};

export default memo(Comment)

