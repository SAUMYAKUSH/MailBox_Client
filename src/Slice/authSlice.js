import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') || null,
        user:localStorage.getItem('user') || null,
        receiver: null,
    },
    reducers:{
        loginSuccess: (state,action) =>{
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.receiver = action.payload.receiver;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', action.payload.user)
        },
        logout:(state)=>{
            state.token = null;
            state.user = null;
            state.receiver = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
    },
});

export const {loginSuccess, logout} = authSlice.actions;
export const selectToken = (state)=> state.auth.token;
export const selectUser = (state)=> state.auth.user;
export const selectReceiver = (state)=> state.auth.receiver;

export default authSlice.reducer;