import { createSlice } from "@reduxjs/toolkit";

interface RepostSlice  {
    isRepostOpen :boolean;
}

const initialState:RepostSlice={
    isRepostOpen:false
}

const repostSlice = createSlice({
    name:"repost",
    initialState,
    reducers:{
        isOpen(state){
            state.isRepostOpen =true;
    },
    onClose(state){
        state.isRepostOpen =false;
    }
}
})

export const {
    isOpen,onClose
} = repostSlice.actions;

export default repostSlice.reducer;