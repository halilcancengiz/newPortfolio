import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    value: []
};

export const postCommentsSlice = createSlice({
    name: 'postComments',
    initialState,
    reducers: {
        setPostComments: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setPostComments } = postCommentsSlice.actions
export default postCommentsSlice.reducer;