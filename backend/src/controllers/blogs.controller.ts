import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma=new PrismaClient();

export async function getAllBlogs(req:Request, res:Response){
    try{
        const posts=await prisma.post.findMany();
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
            where:{id:blogId}
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
        const {title,content,userId}=req.body;
        const user=await prisma.user.findUnique({
            where:{id:userId}
        });
        if(!user){
            return res.status(404).json("User not found");
        }
        const post=await prisma.post.create({
            data:{
                title,content,likes:0,authorId:userId
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
        const {title,content,likes}=req.body;
        const blogExists=await prisma.post.findUnique({
            where:{id:blogId}
        });
        if(!blogExists){
            return res.status(404).json("Blog not found");
        }
        const post=await prisma.post.update({
            where:{id:blogId},
            data:{
                title,content,likes
            }
        });
        console.log(post);
        res.status(200).json(post);
    }catch(e){
        console.log("error in updateBlog controller",e);
        res.status(501).json("Internal server error");
    }
}