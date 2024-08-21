import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addBlogs } from "../store/blogCache";

export default function useGetAllBlogs(){
    const [blogs,setBlogs]=useState([]);
    const dispatch=useDispatch();
    useEffect(()=>{
        async function getAllBlogs(){
            const response=await axios.get(`${import.meta.env.VITE_BACKEND_API}/blogs/all`);
            console.log(response.data);
            if(response.data){
                setBlogs(response.data);
                dispatch(addBlogs(response.data));
            }
        }
        getAllBlogs();
    },[]);
    return blogs;
}