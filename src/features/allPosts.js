import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allPosts: []
};

export const allPostsSlice = createSlice({
    name: 'allPosts',
    initialState,
    reducers: {
        setAllPosts: (state, action) => {
            state.allPosts = action.payload;
        },
    },
});

export const { setAllPosts } = allPostsSlice.actions
export default allPostsSlice.reducer;