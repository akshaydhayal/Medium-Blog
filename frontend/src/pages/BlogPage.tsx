import { useParams } from "react-router-dom"
import { useGetBlog } from "../hooks/useGetBlog";
import { BiSolidLike } from "react-icons/bi";
import { useState } from "react";

const BlogPage = () => {
  const {blogId}=useParams();
  let blog=blogId? useGetBlog(blogId):null;
  const [likeCount,setLikeCount]=useState(blog?blog.likes:0);
  
// authorId: "67e51997-b4a3-4de9-a21c-f8440b450c12"
// content: "The single most cliche question in all of psychology is, How does that make you feel. And yet I find that even my colleagues (other therapists) are poor at distinguishing between feelings and emotions"
// id: "c858a935-c4ba-4638-b60a-1add30eaf533"
// likes: 0
// publishedTime: "2024-08-19T03:26:05.034Z"
// subtitle: "The single most cliche question in all of psychology is, How does that make you feel. And yet I find that ..."
// title: "Most People Don’t Know the Difference Between “Feelings” and “Emotions”"
// topicProfileImage: "https://miro.medium.com/v2/resize:fit:1100/format:webp/0*0r9dZGriVxRp_6xf"
// topicTags: (2) ['Emotion', 'Psychology']
// user: {username: 'akshay', email: 'abcd@gmail.com'}  

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
          <div className="border-y border-y-slate-700 py-3">
            <div className="flex items-center gap-2 px-2">
                <BiSolidLike className="text-slate-400 h-6 w-6 active:text-slate-200" onClick={()=>{
                    setLikeCount(old=>old+1);
                }} />
                <p className="text-slate-300 text-lg">{likeCount}</p>
            </div>
          </div>
        </div>

        <div className="">
            <img className="w-full h-[85vh] object-cover rounded-sm" src={blog.topicProfileImage}
             loading="lazy"/>
        </div>

        <div className="flex flex-col gap-8">
            {/* <p className="text-slate-300 text-[18.5px] tracking-wide leading-relaxed">{blog.content}</p> */}
            {/* <p className="text-slate-300 font-medium font-mono text-[18.5px] tracking-wide leading-normal">{blog.content}</p> */}
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