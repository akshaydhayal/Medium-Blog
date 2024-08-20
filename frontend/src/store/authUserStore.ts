import { createSlice } from "@reduxjs/toolkit";

const authUserStore=createSlice({
    name:"authUser",
    initialState:{
        username:null,
        token:null
    },
    reducers:{
        authUser : (state,action)=>{
            // state.username=action.payload;
            state.username=action.payload.username;
            state.token=action.payload.token;
        }
    }
});

export const {authUser}=authUserStore.actions;
export default authUserStore.reducer;