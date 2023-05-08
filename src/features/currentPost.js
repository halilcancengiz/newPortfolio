import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {name:"name"}
};

export const currentPostSlice = createSlice({
    name: 'currentPost',
    initialState,
    reducers: {
        setCurrentPost: (state, action) => {
            state.value = action.payload; 
        },
    },
});

export const { setCurrentPost } = currentPostSlice.actions
export default currentPostSlice.reducer;