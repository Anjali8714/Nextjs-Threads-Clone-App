import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/Store/Slices/userSlice"
import postSlice from "@/Store/Slices/postSlice"

export const store = configureStore({
    reducer:{
        users : userSlice,
        posts: postSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;