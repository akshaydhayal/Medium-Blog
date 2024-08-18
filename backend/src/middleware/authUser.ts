import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export async function authUser(req:Request,res:Response,next:NextFunction){
    let token='';
    if(typeof(req.headers.jwttoken)=='string'){
        token=req.headers.jwttoken?req.headers.jwttoken:"";
    }
    const jwtSecret=process.env.JWT_SECRET;
    let decodeToken=null;
    if(jwtSecret){
        decodeToken=jwt.verify(token,jwtSecret);
    }
    if(!decodeToken){
        return res.status(401).json({msg:'Inavlid JWT Token'});
    }
    if(typeof(decodeToken)!='string'){
        req.headers.userId=decodeToken.id;
    }
    next();
}