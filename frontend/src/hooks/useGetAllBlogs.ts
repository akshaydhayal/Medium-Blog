import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetAllBlogs(){
    const [blogs,setBlogs]=useState();
    useEffect(()=>{
        async function getAllBlogs(){
            const response=await axios.get(`${import.meta.env.VITE_BACKEND_API}/blogs/all`);
            console.log(response.data);
            if(response.data){
                setBlogs(response.data);
            }
        }
        getAllBlogs();
    },[]);
    return blogs;
}