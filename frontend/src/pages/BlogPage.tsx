import { useNavigate, useParams } from "react-router-dom"
import { useGetBlog } from "../hooks/useGetBlog";
import { BiSolidLike } from "react-icons/bi";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { BiSolidEdit } from "react-icons/bi";
import { useUpdateBlog } from "../hooks/useUpdateBlog";

const BlogPage = () => {
  const {blogId}=useParams();
  let blog=blogId? useGetBlog(blogId):null;
  const [likeCount,setLikeCount]=useState(0);
  const navigate=useNavigate();
  
  useEffect(()=>{
    if(blog){
        setLikeCount(blog.likes)
    }
  },[blog])

  console.log("likes in BlogPage",likeCount);
  
  const updateBlog=useUpdateBlog(blogId,blog?.title,blog?.subtitle,blog?.content,blog?.topicProfileImage,blog?.topicTags,likeCount);
  
  if(!blog){
      return <p>Loading</p>
    }
  return (
    <div className="w-screen h-auto bg-[#121212] flex justify-center">
      <div className="w-3/5 h-full flex flex-col gap-12 py-12">
        <div className="flex flex-col gap-6 ">
          <p className="text-4xl font-bold leading-[1.2] text-slate-100">
            {blog.title}
          </p>
          <p className="text-xl font-medium font-mono tracking-tighter leading-[1.2] text-slate-400">
            {blog.subtitle}
          </p>
          <div className="flex gap-4 items-center">
            <img
              src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
              className="w-10 h-10"
              loading="lazy"
            />
            <div>
              <p className="text-xl text-slate-300">{blog.user.username}</p>
              <p className="text-sm text-slate-400">
                {new Date(blog.publishedTime).toDateString()}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center border-y border-y-slate-700 py-3">
            <div className="flex items-center gap-2 px-2">
                <BiSolidLike className="text-slate-400 h-6 w-6 active:text-slate-200" onClick={()=>{
                    // setLikeCount(old=>old+1);
                    setLikeCount(likeCount+1);
                    updateBlog(); 
                }} />
                <p className="text-slate-300 text-lg">{likeCount}</p>
            </div>
            <div className="flex gap-2 items-center cursor-pointer pr-8" onClick={()=>{
                navigate(`/update/${blog.id}`)
            }}>
                <FiEdit className="h-6 w-6 text-slate-300 hover:text-slate-100"/>
                <p className="text-slate-300 text-lg hover:text-slate-100">Write</p>
            </div>
          </div>
        </div>

        <div className="">
            <img className="w-full h-[85vh] object-cover rounded-sm" src={blog.topicProfileImage}
             loading="lazy"/>
        </div>

        <div className="flex flex-col gap-8">
            {/* <p className="text-slate-300 text-[18.5px] tracking-wide leading-relaxed">{blog.content}</p> */}
            {blog.content.map((para)=>{
                return <p className="text-slate-300 font-medium font-mono text-[18.5px] tracking-wide leading-normal">{para}</p>
            })}
        </div>
        <div className="flex gap-4 py-3">
            {blog.topicTags.map((tag)=>{
                return <button className="p-2 px-5 rounded-3xl text-slate-300
                 border border-slate-600 text-base bg-[#252525]">{tag}</button>
            })}
        </div>
      </div>
    </div>
  );
}


export default BlogPage