import {createSlice} from "@reduxjs/toolkit";
const signMethodStore=createSlice({
    name:'signMethodStore',
    initialState:{
        value:null
    },
    reducers:{
        toggleSignMethod:(state,action)=>{
            state.value=action.payload;
        }
    }
})

export const {toggleSignMethod}=signMethodStore.actions;
export default signMethodStore.reducer;