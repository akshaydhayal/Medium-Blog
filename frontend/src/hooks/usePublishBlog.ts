import axios from "axios";
import { useEffect } from "react";

export function usePublishBlog(title:String,subtitle:String,topicProfileImage:String,
                content:{id:Number,content:String}[],topicTags:String[]){
    // useEffect(()=>{
    //     async function publishBlog(){
    //         const modifiedContent=content.map((c)=>c.content);
    //         console.log("modified content : ",modifiedContent);
    //         const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/blogs/create`,
    //           {title,subtitle,content:modifiedContent,topicProfileImage,topicTags,},
    //           {
    //             headers: {
    //               "Content-Type": "application/json",
    //               "jwtToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxYWUxMzQwLWI4MjQtNDBkZi1hMTY2LTBkMDAzNjYwYTJiMyIsImlhdCI6MTcyNDAzNzk3NX0.fSYMFkPHWKhgWFXgbPO0yuVRPa5Et9eU3EJaUY83uNA",
    //             },
    //           }
    //         );
    //         console.log(response.data);
    //     }
    //     publishBlog();
    // },[]);


        async function publishBlog(){
            const modifiedContent=content.map((c)=>c.content);
            console.log("modified content : ",modifiedContent);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/blogs/create`,
              {title,subtitle,content:modifiedContent,topicProfileImage,topicTags,},
              {
                headers: {
                  "Content-Type": "application/json",
                  "jwtToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxYWUxMzQwLWI4MjQtNDBkZi1hMTY2LTBkMDAzNjYwYTJiMyIsImlhdCI6MTcyNDAzNzk3NX0.fSYMFkPHWKhgWFXgbPO0yuVRPa5Et9eU3EJaUY83uNA",
                },
              }
            );
            console.log(response.data);
        }
        return publishBlog;
        // publishBlog();
}