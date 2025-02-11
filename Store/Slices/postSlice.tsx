import axiosInstance from "@/APIs/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  profilepic: string;
}

interface Post {
  _id: string;
  postById: User;
  text: string;
  image?: string;
  likes: string[];
  replies: string[];
  createdtime: string;
  reposts: string[];
}

interface PostsState {
  posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axiosInstance.get("/posts");
  return response.data.posts;
});

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (
    newPost: {
      userId: string;
      text: string;
      image: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const reponse = await axiosInstance.post("/posts", newPost);
      return reponse.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: "Failed to add new post" });
      }
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch postst.";
      })
      .addCase(addPost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.status = "succeeded";
        state.posts.unshift(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add post.";
      });
  },
});

export default postSlice.reducer;
