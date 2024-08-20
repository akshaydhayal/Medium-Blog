import { createSlice } from "@reduxjs/toolkit";

const authUserStore=createSlice({
    name:"authUser",
    initialState:{username:null},
    reducers:{
        authUser : (state,action)=>{
            state.username=action.payload;
        }
    }
});

export const {authUser}=authUserStore.actions;
export default authUserStore.reducer;