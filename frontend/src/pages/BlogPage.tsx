import { useParams } from "react-router-dom"

const BlogPage = () => {
  const {blogId}=useParams();
  return (
    <div className="w-screen h-[90vh] bg-[#121212]">
        <p className="text-white">BlogPage : {blogId}</p>
    </div>
  )
}

export default BlogPage