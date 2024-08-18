import jwt from "jsonwebtoken";

export function generateJwtToken(payload:{id:string}){
    const jwtSecret=process.env.JWT_SECRET;
    let token='';
    if(jwtSecret){
        token=jwt.sign(payload,jwtSecret);
    }
    return token;
}