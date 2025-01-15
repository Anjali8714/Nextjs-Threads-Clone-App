import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchUser = createAsyncThunk("user/fetchUser",async () => {
    const response = await axios.get("https://social-media-rest-apis-1.onrender.com/api/users/")
    return response.data.users;
})



interface User {
    _id : string;
    name : string;
    username : string;
    followers : string[];
    following : string[];
    email : string;
    profilepic : string;
    bio : string;
}

interface Userstate{
    users : User[];
    status : "idle" | "loading" | "succeeded" | "failed";
    error : string | null ;
}

const initialState:Userstate ={
    users:[],
    status:"idle",
    error:null
}

const ALLSlice = createSlice({
    name : 'users',
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUser.pending,(state) => {
            state.status = "loading";
        })
        .addCase(fetchUser.fulfilled,(state,action) => {
            state.status = "succeeded";
            state.users = action.payload;
        })
        .addCase(fetchUser .rejected,(state,action) => {
            state.status = "failed";
            state.error = action.error?.message??null;
        })
    }
})

export default ALLSlice.reducer