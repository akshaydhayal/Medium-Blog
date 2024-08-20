import { useNavigate } from "react-router-dom";

const LoginError = () => {
  const navigate=useNavigate();
  return (
    <div className="w-screen h-[90vh] bg-[#121212] flex flex-col items-center gap-4 py-24">
        <p className="text-xl text-slate-300 font-medium">You are not Signed in!! Please Signin to view the Page</p>
        <button className="p-1 px-3 border border-slate-400 rounded-md text-slate-300" onClick={()=>{
            navigate("/");
        }}>Home Page</button>
    </div>
  )
}

export default LoginError