import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../features/user"
import postsReducer from '../features/allPosts'
import currentPostReducer from "../features/currentPost"
import postCommentsReducer from "../features/postComments"

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    currentPost: currentPostReducer,
    postComments: postCommentsReducer
  },
})