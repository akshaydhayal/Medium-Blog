import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetBlog } from "../hooks/useGetBlog";
import { useUpdateBlog } from "../hooks/useUpdateBlog";
import LoginError from "../components/LoginError";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RootState } from "../store/store";

const UpdateBlogPage = () => {
  const {blogId}=useParams();
  let blog:any;
  if(blogId){
    blog=useGetBlog(blogId);
  }

  const [currentParaCount, setCurrentParaCount] = useState(1);
  const [paragraph, setParagraph] = useState<{id:number,content:string}[]>([]);

  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [topicProfileImage, setTopicProfileImage] = useState("");
  const [topicTags, setTopicTags] = useState<string[]>([]);
  const [likes, setLikes] = useState(0);
  const [enteredTag, setEnteredTag] = useState("");

  let updateBlog:ReturnType<typeof useUpdateBlog>;
  if(blogId){
      updateBlog=useUpdateBlog(blogId,title,subTitle,paragraph,topicProfileImage,topicTags,likes);

  }

  const divRefs = useRef([]);

  useEffect(() => {
    divRefs.current = divRefs.current.slice(0, paragraph.length);
  }, [paragraph]);


  const placeCaretAtEnd = (el:any) => {
    el.focus();
    if (
      typeof window.getSelection !== "undefined" &&
      typeof document.createRange !== "undefined"
    ) {
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  };


  console.log('bloggg :',blog);
  console.log('paragraph :',paragraph);

  useEffect(()=>{
      if(blog){
        setTitle(blog.title);
        setSubTitle(blog.subtitle);
        setParagraph(blog.content.map((p:string,ind:number)=>{
            return {id:ind+1,content:p}
        }))
        setTopicProfileImage(blog.topicProfileImage);
        setTopicTags(blog.topicTags);
        setLikes(blog.likes);
      }
  },[blog])

  const authUser = useSelector((store:RootState) => store.authUser.username);
  console.log("authUser : ", authUser);
  if (!authUser) {
    return <LoginError />;
  }

  if(!blog){
    return <h1>Loading</h1>
  }

  return (
    <div className="w-screen h-auto min-h-[90vh] bg-[#121212] flex justify-center">
      <div className="w-[70vw] flex flex-col gap-4 py-4">
        <div className="flex justify-end">
            <button className="p-1 px-3 bg-[#1c7619] hover:bg-[#1a8917] text-slate-50 font-medium
             w-max rounded-3xl" onClick={()=>{
                const toastid = toast.loading("Saving...", {
                  style: { color: "green", fontWeight: "500" },
                });
                setTimeout(() => toast.dismiss(toastid), 2000);
                updateBlog();
            }}>Save and Publish</button>
        </div>
        <input
          className="p-[5px] px-4 text-[40px] cursor-text w-full bg-[#121212] text-slate-200 font-serif
             placeholder:text-slate-200 font-medium border-b border-b-slate-700 focus:border-b active:border-none focus:outline-none"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <input
          className="px-4 text-[26px] cursor-text w-full bg-[#121212] text-slate-300 font-serif
             placeholder:text-slate-400  border-b border-b-slate-600 focus:border-b active:border-none focus:outline-none"
          type="text"
          placeholder="Subtitle"
          value={subTitle}
          onChange={(e) => {
            setSubTitle(e.target.value);
          }}
        />

        <div className="flex flex-col gap-2">
            <div className="flex w-full items-center">
                <input className=" px-4 text-lg cursor-text w-full bg-[#121212] text-slate-400 font-mono 
                    tracking-tighter placeholder:text-slate-500   focus:border-b active:border-none focus:outline-none"
                type="url"
                placeholder="Topic Profile Image url"
                value={topicProfileImage}
                onChange={(e) => {
                    setTopicProfileImage(e.target.value);
                }}
                />
            </div>
          <img
            className="w-full h-[85vh] object-cover rounded-sm"
            src={topicProfileImage}
            loading="lazy"
          />
        </div>
        <div className="flex flex-col gap-8 py-6">
          {paragraph.map((p:{id:number,content:string},index:number) => {
            return (
              <div className="flex gap-4 w-full items-center" key={p.id}>
                {currentParaCount == p.id && (
                  <button
                    className="border border-slate-400 text-slate-400 w-10 h-9 text-xl rounded-full"
                    onClick={() => {
                      setParagraph([
                        ...paragraph,
                        { id: paragraph.length + 1, content: "" },
                      ]);
                      setCurrentParaCount((old) => old + 1);
                    }}
                  >
                    +
                  </button>
                )}
                {/* @ts-ignore */}
                <div ref={(el) => (divRefs.current[index] = el)}
                  className="text-slate-300 font-mono text-lg tracking-normal leading-normal 
                            p-4 border border-slate-700 w-full focus:outline-slate-400 focus:outline-dashed"
                  contentEditable
                  onClick={() => setCurrentParaCount(p.id)}
                  onInput={(e) => {
                    const newPara = paragraph.map((para) => {
                      return para.id != p.id
                        ? para
                        : { id: para.id, content: e.currentTarget.textContent||"" };
                    });
                    setParagraph(newPara);
                    placeCaretAtEnd(divRefs.current[index]);
                  }}
                >
                  {p.content}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex w-full items-center gap-12 border-y border-y-slate-600 py-6 mt-6">
          <div className="flex w-1/3">
            <input
              type="text"
              className="p-2 px-4 text-base border border-slate-600  w-full rounded-l-xl
                     text-slate-300 bg-[#121212] focus:outline-none focus:border-slate-500
                      placeholder:text-slate-400"
              placeholder="Add Topic tags..."
              onChange={(e) => setEnteredTag(e.target.value)}
            />
            <p
              className="p-1 px-3 text-2xl border border-slate-600 text-slate-300 cursor-pointer hover:text-slate-100
                     hover:border-slate-500 rounded-r-xl font-semibold"
              onClick={() => {
                setTopicTags([...topicTags, enteredTag]);
              }}
            >
              +
            </p>
          </div>
          <div className="flex gap-4 flex-wrap">
            {topicTags.map((topic) => {
              return (
                <div className="flex items-center">
                  <p className="border border-slate-500 p-1 px-4 text-base text-slate-300 rounded-l-2xl">
                    {topic}
                  </p>
                  <p
                    className="border border-slate-500 p-1 px-3 text-base font-medium hover:text-slate-100
                             hover:border-slate-400 cursor-pointer text-slate-300 rounded-r-2xl"
                    onClick={() => {
                      const newTopicTags = topicTags.filter(
                        (tag) => tag != topic
                      );
                      setTopicTags(newTopicTags);
                    }}
                  >
                    x
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlogPage;
