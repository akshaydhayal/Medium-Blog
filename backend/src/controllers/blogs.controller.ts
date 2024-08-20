import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma=new PrismaClient();

export async function getAllBlogs(req:Request, res:Response){
    try{
        const posts=await prisma.post.findMany({
            include:{
                user:{
                    select:{username:true,email:true}
                }
            }
        });
        res.status(200).json(posts);
    }catch(e){
        console.log("error in getAll Blogs controller",e);
        res.status(501).json("Internal server error");
    }

}

export async function getBlog(req:Request,res:Response){
    try{
        const {blogId}=req.params;
        const blog=await prisma.post.findUnique({
            where:{id:blogId},
            include:{user:{
                select:{
                    email:true,username:true
                }
            }}
        });
        if(!blog){
            res.status(404).json("Blog not found");
        }
        res.status(200).json(blog); 
    }catch(e){
        console.log("error in getBlog controller",e);
        res.status(501).json("Internal server error");
    }    
}



export async function createBlog(req:Request,res:Response){
    try{
        // const {title,content}=req.body;
        const {title,content,topicProfileImage,subtitle,topicTags}=req.body;
        let userId='';
        console.log(req.headers);
        if(typeof(req.headers.userId)=='string'){
            userId=req.headers.userId?req.headers.userId:'';
        }
        const user=await prisma.user.findUnique({
            where:{id:userId}
        });
        if(!user){
            return res.status(404).json("User not found");
        }
        const post=await prisma.post.create({
            data:{
                title,content,likes:0,authorId:userId,
                topicProfileImage,subtitle,topicTags
            }
        });
        console.log(post);
        res.status(201).json(post);
    }catch(e){
        console.log("error in createBlog controller",e);
        res.status(501).json("Internal server error");
    }
}



export async function updateBlog(req:Request,res:Response){
    try{
        const{blogId}=req.params;
        const {title,subtitle,content,topicProfileImage,topicTags,likes}=req.body;
        let userId='';
        if(typeof(req.headers.userId)=='string'){
            userId=req.headers.userId;
        }

        const blogExists=await prisma.post.findUnique({
            where:{id:blogId}
        });
        if(!blogExists){
            return res.status(404).json("Blog not found");
        }
        console.log(blogExists.authorId, userId);
        if(blogExists.authorId!=userId){
            return res.status(403).json("You are not the author of this blog");
        }
        console.log("likes in updateblog controller : ",likes);
        const post=await prisma.post.update({
            where:{id:blogId},
            data:{
                title,content,likes,subtitle,topicProfileImage,topicTags
            }
        });
        console.log(post);
        res.status(200).json(post);
    }catch(e){
        console.log("error in updateBlog controller",e);
        res.status(501).json("Internal server error");
    }
}