import { Drawer } from "antd";
import React, { useEffect, useState, memo } from "react";
import { FaComments } from "../assets/icon";
import Comment from "./Comment";
import { AddComment } from "./AddComment";
import { NavLink } from "react-router-dom";
import { getAllCommentsForPost } from "../services/firebase/firebase";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const CommentsContainer = ({ isLoggedIn, postId }) => {

  // reselect
  const selectPostComments = state => state.postComments.value;
  const selectUser = state => state.user.value;
  const selectUserInfo = state => state.user.info;

  const userSelector = createSelector(
    selectUser,
    user => user
  );
  const userInfoSelector = createSelector(
    selectUserInfo,
    userInfo => userInfo
  );

  const postCommentsSelector = createSelector(
    selectPostComments,
    postComments => postComments
  );

  const postComments = useSelector(postCommentsSelector);
  const user = useSelector(userSelector);
  const userInfo = useSelector(userInfoSelector);


  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (postId) {
        await getAllCommentsForPost(postId);
      }
    };
    fetchData();
  }, [postId]);

  return (
    <div id="commentContainer">
      <div
        onClick={showDrawer}
        className="fixed cursor-pointer bottom-2 left-[50%] translate-x-[-50%] bg-blue-400 h-10 w-32 rounded-full flex items-center justify-center "
      >
        <FaComments size={25} />
      </div>
      <Drawer title="YORUMLAR" placement="right" onClose={onClose} open={open}>
        {
          isLoggedIn ? <AddComment postId={postId} user={user} /> :
            <div className="mb-3">

              <NavLink className="text-blue-btn capitalize" to="/membership/login">Yorum yapabilmek için lütfen giriş yapın.</NavLink>
            </div>
        }

        {
          postComments && [...postComments]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((detail, index) => (
              <Comment key={index} userInfo={userInfo} user={user} detail={detail} isLoggedIn={isLoggedIn} isVisible={open} postComments={postComments} />
            ))
        }
      </Drawer>
    </div>
  );
};

export default memo(CommentsContainer);
