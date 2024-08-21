import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";

export function usePublishBlog(title:String,subtitle:String,topicProfileImage:String,
                content:{id:Number,content:String}[],topicTags:String[]){

    const navigate=useNavigate();
    const authUser=useSelector((store:RootState)=>store.authUser);

    async function publishBlog(){
        const modifiedContent=content.map((c)=>c.content);
        console.log("modified content : ",modifiedContent);
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/blogs/create`,
            {title,subtitle,content:modifiedContent,topicProfileImage,topicTags,},
            {
            headers: {
                "Content-Type": "application/json",
                "jwtToken":authUser.token,
            },
            }
        );
        if(response.data.id){
            navigate(`/${response.data.id}`);
        }
        console.log(response.data);
    }
    return publishBlog;
}