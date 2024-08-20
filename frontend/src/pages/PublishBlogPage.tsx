import { useState } from "react"
import { usePublishBlog } from "../hooks/usePublishBlog";
import { useSelector } from "react-redux";
import LoginError from "../components/LoginError";

const PublishBlogPage = () => {
  const [currentParaCount,setCurrentParaCount]=useState(1);
  const [paragraph,setParagraph]=useState([
    {id:1,content:""}
  ]);

  const [title,setTitle]=useState("");
  const [subTitle,setSubTitle]=useState("");
  const [topicProfileImage,setTopicProfileImage]=useState("");
  const [topicTags,setTopicTags]=useState([]);
  const[enteredTag,setEnteredTag]=useState("");
  
  console.log(paragraph);
    
  const publishBlog=usePublishBlog(title,subTitle,topicProfileImage,paragraph,topicTags);

  const authUser = useSelector((store) => store.authUser.username);
  console.log("authUser : ", authUser);
  if (!authUser) {
    return <LoginError/>;
  }
  return (
    <div className="w-screen h-auto min-h-[90vh] bg-[#121212] flex justify-center">
        <div className="w-[70vw] flex flex-col gap-4 py-8">
            <input className="p-1 px-4 text-[40px] cursor-text w-full bg-[#121212] text-slate-200 font-serif
             placeholder:text-slate-200 font-medium border-b border-b-slate-700 focus:border-b active:border-none focus:outline-none"
             type="text" placeholder="Title" value={title} onChange={(e)=>{
                setTitle(e.target.value);
             }}/>
            
            <input className="px-4 text-[26px] cursor-text w-full bg-[#121212] text-slate-300 font-serif
             placeholder:text-slate-400  border-b border-b-slate-600 focus:border-b active:border-none focus:outline-none"
             type="text" placeholder="Subtitle" value={subTitle} onChange={(e)=>{
                setSubTitle(e.target.value);
             }}/>

            <input className="px-4 text-lg cursor-text w-full bg-[#121212] text-slate-400 font-mono 
            tracking-tighter placeholder:text-slate-500   focus:border-b active:border-none focus:outline-none"
             type="url" placeholder="Topic Profile Image url" value={topicProfileImage} onChange={(e)=>{
                setTopicProfileImage(e.target.value);
             }}/>

            <div className="flex flex-col gap-8 py-6">
                {paragraph.map((p)=>{
                    return (
                    <div className="flex gap-4 w-full items-center" key={p.id}>
                        {currentParaCount==p.id && <button className="border border-slate-400 text-slate-400 w-10 h-9 text-xl rounded-full" onClick={()=>{
                            setParagraph([...paragraph,{id:paragraph.length+1,content:""}])
                            setCurrentParaCount(old=>old+1);
                            }}>+</button>}
                        <div className="text-slate-300 font-mono text-lg tracking-normal leading-normal 
                            p-4 border border-slate-700 w-full focus:outline-slate-400 focus:outline-dashed"
                            contentEditable onInput={(e)=>{
                                const newPara=paragraph.map((para)=>{
                                    return (para.id!=p.id)? para: {id:para.id, content:e.currentTarget.textContent};
                                })
                                setParagraph(newPara);
                            }}>{p.content}</div>
                    </div>)
                })}
            </div>
            
            <div className="flex w-full items-center gap-12 border-y border-y-slate-600 py-6 mt-6">
                <div className="flex w-1/3">
                    <input type="text" className="p-2 px-4 text-base border border-slate-600  w-full rounded-l-xl
                     text-slate-300 bg-[#121212] focus:outline-none focus:border-slate-500
                      placeholder:text-slate-400" placeholder="Add Topic tags..." onChange={(e)=>setEnteredTag(e.target.value)}/>
                    <p className="p-1 px-3 text-2xl border border-slate-600 text-slate-300 cursor-pointer hover:text-slate-100
                     hover:border-slate-500 rounded-r-xl font-semibold" onClick={()=>{
                        setTopicTags([...topicTags,enteredTag])
                     }}>+</p>
                </div>
                <div className="flex gap-4 flex-wrap">
                    {topicTags.map((topic)=>{
                        return(
                        <div className="flex items-center">
                            <p className="border border-slate-500 p-1 px-4 text-base text-slate-300 rounded-l-2xl">{topic}</p>
                            <p className="border border-slate-500 p-1 px-3 text-base font-medium hover:text-slate-100
                             hover:border-slate-400 cursor-pointer text-slate-300 rounded-r-2xl" onClick={()=>{
                                const newTopicTags=topicTags.filter((tag)=>tag!=topic);
                                setTopicTags(newTopicTags);
                             }}>x</p>
                        </div>
                    )})}
                </div>
            </div>

            <button className="text-slate-300 p-2 px-4 rounded-md text-lg font-medium border" 
            onClick={()=>publishBlog()}>Publish Blog</button>
             
        </div>
    </div>
  )
}

export default PublishBlogPage