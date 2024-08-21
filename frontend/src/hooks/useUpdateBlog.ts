import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";

export function useUpdateBlog(blogId:string,title:string,subtitle:string,content:{id:number,content:string}[],
    topicProfileImage:string,topicTags:string[],likes:number){
    
    const navigate=useNavigate(); 
    const authUser=useSelector((store:RootState)=>store.authUser);

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
                "jwtToken":authUser.token,
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





