import { BiSolidLike } from "react-icons/bi";
import useGetAllBlogs from "../hooks/useGetAllBlogs"
import { useNavigate } from "react-router-dom";
import { Blog } from "../store/blogCache";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const FeedPage = () => {
  const blogs:Blog[]=useGetAllBlogs();
  const navigate=useNavigate();
  const blogsCached=useSelector((store:RootState)=>store.blogCache.cache);
  console.log('cachedBlogs : ',blogsCached);

  return (
    <div className='w-screen h-[90vh] bg-[#121212] flex justify-center'>
        <div className="w-2/3 h-full border-x border-x-slate-600 py-4 overflow-scroll overflow-x-hidden">
            <div className="flex flex-col gap-4">
                {blogs && blogs.map((blog)=>{
                    return (
                      <div className="p-8 px-12 border-b border-b-slate-700 cursor-pointer" onClick={()=>{
                            navigate(`/${blog.id}`)
                      }}>
                        <div className="flex w-full items-center">
                          <div className="w-3/4 flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                            <img
                                className="h-6 w-6"
                                src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
                                loading="lazy"
                            />
                            <p className="text-slate-300">
                                {blog.user.username}
                            </p>
                            </div>
                            <p className="text-slate-200 text-2xl font-semibold">
                              {blog.title}
                            </p>
                            <p className="text-slate-300 text-base">
                              {blog.subtitle}
                            </p>
                            <div className="flex items-center gap-10 px-2">
                              <p className="text-slate-400 text-sm">
                                {blog.publishedTime && new Date(blog.publishedTime).toDateString()}
                              </p>
                              <div className="flex items-center gap-1">
                                <BiSolidLike className="text-slate-400 h-5 w-5" />
                                <p className="text-slate-500 text-sm">
                                  {blog.likes}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="w-1/4">
                            <img className="h-28 w-52 object-cover rounded-sm"
                              src={blog.topicProfileImage}
                              loading="lazy"
                            />
                          </div>
                        </div>
                        <div></div>
                      </div>
                    );
                })}
            </div>
        </div>
    </div>
  )
}

export default FeedPage