import React, { useState } from "react";
import { RiSendPlaneFill } from "../assets/icon"
import { Tooltip } from "antd";
import { addComment } from "../services/firebase/firebase";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";

export const AddComment = ({ user, postId }) => {
  const [commentValue, setCommentValue] = useState("")
  const maxLength = "300"
  
  const selectUserInfo = state => state.user.info;
  const userInfoSelector = createSelector(
    selectUserInfo,
    user => user
  );
  const userInfo = useSelector(userInfoSelector);

  const sendComment = async () => {
    if (commentValue) {
      const response = await addComment(user, commentValue.trim(), postId, userInfo.fullName ? userInfo.fullName : "default");
      setCommentValue("");
    }
  };
  return (
    <div className="relative h-28">
      <textarea onChange={(e) => setCommentValue(e.target.value)} value={commentValue} maxLength={300} placeholder="Yorum ekle..." className="w-full h-[72%] outline-none resize-none" name="commentValue">
      </textarea>
      <div className="absolute bottom-[2px] right-0 w-full text-gray-500 flex justify-between items-center">
        <button onClick={sendComment} className="flex items-center justify-center text-white ">
          <Tooltip color="#1E3B55" placement="right" title="Gönder">
            <RiSendPlaneFill size={20} color="#1E3B55" />
          </Tooltip>
        </button>
        <div>
          {commentValue.length}
          <span className="mx-1">/</span>
          {maxLength}
        </div>

      </div>
    </div>
  );

};
