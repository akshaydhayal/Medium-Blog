import { useDispatch, useSelector } from "react-redux";
import { toggleSignMethod } from "../store/signMethodStore";
import { authUser } from "../store/authUserStore";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RootState } from "../store/store";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUsername = useSelector((store:RootState) => store.authUser.username);
  return (
    <div className="w-screen h-[10vh] border-b border-b-slate-700 flex items-center justify-between bg-[#121212] px-10">
      <p
        className="text-3xl font-semibold font-serif text-white cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        Medium
      </p>
      <div className="flex items-center gap-4">
        <p className="text-base font-normal text-slate-300 cursor-pointer
         hover:underline hover:text-slate-100" onClick={()=>{
            navigate("/feeds");
         }}>Home</p>
        <div className="flex gap-[5px] items-center cursor-pointer"
          onClick={() => {
            navigate(`/publish`);
          }}
        >
          <FiEdit className="h-5 w-5 text-slate-300 hover:text-slate-100" />
          <p className="text-slate-300 hover:text-slate-100 hover:underline">Write</p>
        </div>
        {authUsername && <p className="text-base font-normal text-slate-300">Hello {authUsername}</p>}
        {!authUsername && (
          <p
            className="text-base font-normal text-slate-300 cursor-pointer 
            hover:underline hover:text-slate-200"
            onClick={() => {
              dispatch(toggleSignMethod("signin"));
            }}
          >
            Sign in
          </p>
        )}
        {authUsername && (
          <p
            className="text-base  text-slate-300 cursor-pointer 
             hover:text-slate-200 border border-slate-500 p-1 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 hover:border-slate-400 font-medium"
            onClick={() => {
              dispatch(authUser({username:null,token:null}));
            }}
          >
            Logout
          </p>
        )}
      </div>
    </div>
  );
};

export default Navbar;
