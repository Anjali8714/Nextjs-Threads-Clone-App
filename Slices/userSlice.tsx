import { createAsyncThunk } from "@reduxjs/toolkit";
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