import { configureStore } from "@reduxjs/toolkit";
import authReducer,{selectUser} from '../Slice/authSlice';
import emailReducer from '../Slice/emailSlice';

const store = configureStore({
    reducer:{
        auth: authReducer,
        email: emailReducer
    },
});

export default store;