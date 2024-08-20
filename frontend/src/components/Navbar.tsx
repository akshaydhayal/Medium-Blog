import { useDispatch, useSelector } from "react-redux"
import { toggleSignMethod } from "../store/signMethodStore";
import { store } from "../store/store";
import { authUser } from "../store/authUserStore";

const Navbar = () => {
  const dispatch=useDispatch();
  const authUsername=useSelector(store=>store.authUser.username);
  return (
    <div className="w-screen h-[10vh] border-b border-b-slate-700 flex items-center justify-between bg-[#121212] px-10">
        <p className="text-3xl font-semibold font-serif text-white">Medium</p>
        <div className="flex gap-4">
            <p className="text-base font-normal text-slate-300">Our Story</p>
            <p className="text-base font-normal text-slate-300">Write</p>
            {authUsername && <p className="text-base font-normal text-slate-300">Hello {authUsername}</p>}
            {!authUsername && <p className="text-base font-normal text-slate-300 cursor-pointer 
            hover:underline hover:text-slate-200" onClick={()=>{    
                dispatch(toggleSignMethod('signin'))
            }}>Sign in</p>}
            {authUsername && <p className="text-base font-normal text-slate-300 cursor-pointer 
            hover:underline hover:text-slate-200" onClick={()=>{    
                dispatch(authUser(null));
            }}>Logout</p>}
        </div>
    </div>
  )
}

export default Navbar