import { useNavigate, useParams } from "react-router-dom"
import { useGetBlog } from "../hooks/useGetBlog";
import { BiSolidLike } from "react-icons/bi";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useUpdateBlog } from "../hooks/useUpdateBlog";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RootState } from "../store/store";

const BlogPage = () => {
  const {blogId}=useParams();
  let blog=blogId? useGetBlog(blogId):null;
  const [likeCount,setLikeCount]=useState<number>(0);
  const navigate=useNavigate();
  
  useEffect(()=>{
    if(blog){
        setLikeCount(blog.likes)
    }
  },[blog])

  console.log("likes in BlogPage",likeCount);
  
  let updateBlog:ReturnType<typeof useUpdateBlog>;
  if(blogId && blog){
      const updatedContent=blog.content.map((p,ind)=>({id:ind+1,content:p}))
      console.log('updatedContent',updatedContent);
    //   updateBlog=useUpdateBlog(blogId,blog?.title,blog?.subtitle,updatedContent,blog?.topicProfileImage,blog?.topicTags,likeCount);
//     //   updateBlog=useUpdateBlog(blogId,blog?.title,blog?.subtitle,blog?.content,blog?.topicProfileImage,blog?.topicTags,likeCount);
  }

  const authUser=useSelector((store:RootState)=>store.authUser.username);
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
                {blog.publishedTime && new Date(blog.publishedTime).toDateString()}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center border-y border-y-slate-700 py-3">
            <div className="flex items-center gap-2 px-2">
                <BiSolidLike className="text-slate-400 h-6 w-6 active:text-slate-200 cursor-pointer hover:text-slate-300" onClick={()=>{
                    if(authUser){
                        setLikeCount(likeCount+1);
                        updateBlog(); 
                    }else{
                        toast.error("Login first to like the Blog.",{
                            style:{fontWeight:"500"}
                        })
                    }
                }} />
                <p className="text-slate-300 text-lg">{likeCount}</p>
            </div>

            <div className="flex gap-1 items-center cursor-pointer pr-8" onClick={()=>{
                navigate(`/update/${blog.id}`)
            }}>
                <FiEdit className="h-6 w-6 text-slate-300 hover:text-slate-100"/>
                <p className="text-slate-300 text-lg hover:text-slate-100">Edit</p>
            </div>
          </div>
        </div>

        <div className="">
            <img className="w-full h-[85vh] object-cover rounded-sm" src={blog.topicProfileImage}
             loading="lazy"/>
        </div>

        <div className="flex flex-col gap-8">
            {blog.content.map((para)=>{
                return <p className="text-slate-300 font-medium font-mono text-[18.5px] tracking-wide leading-normal">{para}</p>
            })}
        </div>
        <div className="flex flex-wrap gap-4 py-3">
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