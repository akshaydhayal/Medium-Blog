import {createSlice} from "@reduxjs/toolkit";

export interface Blog{
    id:string,
    title:string,
    subtitle:string,
    // content:String,
    content:string[],
    topicProfileImage:string,
    topicTags:string[],
    likes:number,
    publishedTime?:string
    user:{email:string, username:string}
    // username:String
}

const initialState:{cache:Blog[]}={
    cache:[]
}
const blogCache=createSlice({
    name:"blogCache",
    initialState,
    reducers:{
        addBlogs: (state,action)=>{
            if((state.cache?.length + action.payload?.length)>10){
                let blogToDelete=state.cache?.length + action.payload?.length-10;
                while(blogToDelete>0 && state.cache?.length>0){
                    state.cache.shift();
                    blogToDelete--;
                }
            }
            if(action.payload?.length>10){
                for(let i=0; i<10; i++){
                    state.cache.push(action.payload[i]);
                }
            }else{
                action.payload.forEach((p:any)=>{
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