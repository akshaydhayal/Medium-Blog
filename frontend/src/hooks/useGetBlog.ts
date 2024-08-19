import { useSelector } from "react-redux";
import { store } from "../store/store";
import { useEffect, useState } from "react";
import axios from "axios";

export function useGetBlog(blogId:String){
    const blogCache=useSelector((store)=>store.blogCache.cache);
    const [blogExists,setBlogExists]=useState();
    useEffect(()=>{
        setBlogExists(blogCache.find((blog)=>blog.id==blogId));
        console.log('blogExists : ',blogExists);
        if(!blogExists){
            async function getBlog(){
                const response=await axios.get(`${import.meta.env.VITE_BACKEND_API}/blogs/${blogId}`);
                console.log(response.data);
                setBlogExists(response.data);
            }
            getBlog();
        }    
    },[blogId])
    return blogExists;
}