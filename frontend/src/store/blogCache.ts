import {createSlice} from "@reduxjs/toolkit";

interface Blog{
    id:String,
    title:String,
    subtitle:String,
    content:String,
    topicProfileImage:String,
    topicTags:String[],
    likes:Number,
    username:String
}

const initialState:{cache:Blog[]}={
    cache:[]
}
const blogCache=createSlice({
    name:"blogCache",
    initialState,
    reducers:{
        addBlogs: (state,action)=>{
            if((state.cache.length+action.payload.length)>10){
                let blogToDelete=state.cache.length+action.payload.length-10;
                while(blogToDelete>0 && state.cache.length>0){
                    state.cache.shift();
                    blogToDelete--;
                }
            }
            if(action.payload.length>10){
                for(let i=0; i<10; i++){
                    state.cache.push(action.payload[i]);
                }
            }else{
                action.payload.forEach((p)=>{
                    const blogExist=state.cache.find((c)=>p.id==c.id);
                    if(!blogExist){
                        state.cache.push(p);
                    }
                })
                // state.cache=[...state.cache,...action.payload]
            }
        }
    }
})

export const {addBlogs}=blogCache.actions;
export default blogCache.reducer;