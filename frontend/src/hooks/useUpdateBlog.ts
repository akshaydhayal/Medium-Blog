import axios from "axios";
import { useNavigate } from "react-router-dom";

export function useUpdateBlog(blogId:String,title:String,subtitle:String,content:{id:Number,content:String}[],
    topicProfileImage:String,topicTags:String[],likes:Number){
    const navigate=useNavigate(); 
    async function updateBlog(){
        const modifiedContent=(content && content[0].content)?content.map((para)=>para.content):content;
        console.log("modified Content : ",modifiedContent);
        console.log("likes rec : ",likes);
        // const modifiedContent=content.map((para)=>para.content);
        const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_API}/blogs/${blogId}`,
            {
            title,
            subtitle,
            content: modifiedContent,
            topicProfileImage,
            topicTags,
            likes
            },
            {
            headers: {
                "Content-Type": "application/json",
                "jwtToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxYWUxMzQwLWI4MjQtNDBkZi1hMTY2LTBkMDAzNjYwYTJiMyIsImlhdCI6MTcyNDAzNzk3NX0.fSYMFkPHWKhgWFXgbPO0yuVRPa5Et9eU3EJaUY83uNA",
            },
            }
        );
        console.log(response.data);
        if(response.data.id){
            navigate(`/${response.data.id}`);
        }
    }
    return updateBlog;      
}





