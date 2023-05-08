import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../features/user"
import postsReducer from '../features/allPosts'
import currentPostReducer from "../features/currentPost"

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    currentPost : currentPostReducer
  },
})