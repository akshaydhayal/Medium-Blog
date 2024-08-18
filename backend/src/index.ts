import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter";
import blogRouter from "./routes/blogRouter";

const app=express();
dotenv.config();
app.use(express.json());
//post - api/v1/users/signup
//post - api/v1/users/signin
//post - api/v1/blogs/create
//put - api/v1/blogs/:blogId 
//get - api/v1/blogs
//get - api/v1/blogs/:blogId

app.use("/api/v1/users/",userRouter);
app.use("/api/v1/blogs/",blogRouter);

const port=process.env.PORT?process.env.PORT:3001;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});