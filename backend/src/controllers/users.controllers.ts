import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { generateJwtToken } from "../utils/generateJwtToken";
// import bcrypt from "bcrypt";

const prisma=new PrismaClient();

export async function signupUser(req:Request,res:Response){
    try{
        const {username,email,password}=req.body;
        console.log(username,password);
        // const hashedPassword=await bcrypt.hash(password,10);
        const hashedPassword=password;
        console.log(hashedPassword);
        const user=await prisma.user.create({
            data:{
                email,password:hashedPassword,username
            }
        });
        const token=generateJwtToken({id:user.id});
        console.log(user);
        res.status(200).json({user:user.email,token});
    }catch(e){
        console.log("error in signUpUser Controller",e);
        res.status(501).json("Internal server error");
    }
}

export async function signinUser(req:Request, res:Response){
    try{
        const {email,password}=req.body;
        const user=await prisma.user.findUnique({
            where:{email}
        });
        if(!user){
            return res.status(401).json("Wrong email, user don't exist!!");
        }
        // const isValidPassword=await bcrypt.compare(password,user.password);
        // if(!isValidPassword){
        //     return res.status(401).json("Wrong password!!");
        // }
        
        const token=generateJwtToken({id:user.id});
        res.status(200).json({user:user.email,token});
    }catch(e){
        console.log("error in signinUser Controller",e);
        res.status(501).json("Internal Server error");
    }
}