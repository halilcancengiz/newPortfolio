import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: JSON.parse(sessionStorage.getItem('user')) || null,
    info: {}
};

export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload;
        },
        setInfo: (state, action) => {
            state.info = action.payload
        }
    },
});

export const { setUser, setInfo } = user.actions
export default user.reducer;