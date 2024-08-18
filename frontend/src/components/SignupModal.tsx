import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaUnlockAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaHand } from "react-icons/fa6";
import { toggleSignMethod } from "../store/signMethodStore";
import { useDispatch } from "react-redux";

const SignupModal = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pasword, setPassword] = useState("");
  const dispatch=useDispatch();

  return (
    <div className="h-screen w-screen fixed backdrop-blur-md inset-0 flex justify-center items-center">
      <div className="w-2/5 h-4/5 border border-slate-600 rounded-md bg-[#121212] flex flex-col gap-6 items-center">
        <div className="w-full flex justify-end p-2 px-2">
          <RxCross2 className="text-slate-400 h-6 w-6 hover:text-slate-300 cursor-pointer 
          hover;h-7 hover:w-7" onClick={()=>dispatch(toggleSignMethod(null))}/>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <p className="text-4xl font-semibold font-mono tracking-normal text-slate-300">
            CREATE ACCOUNT
          </p>
          {/* <FaHand className="text-yellow-300 w-8 h-8" /> */}
        </div>
        <div className="w-full flex flex-col gap-6 items-center">
          <div className="flex items-center h-11 w-3/5 border border-slate-500 rounded-sm">
            <FaUser className="text-white h-full w-12 p-2 px-3 bg-slate-700" />
            <input
              className="w-full h-full p-1 px-4 text-slate-200 placeholder:text-slate-400
                    bg-[#252424] rounded-md focus:outline-0"
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex items-center h-11 w-3/5 border border-slate-500 rounded-sm">
            <FaUser className="text-white h-full w-12 p-2 px-3 bg-slate-700" />
            <input
              className="w-full h-full p-1 px-4 text-slate-200 placeholder:text-slate-400
                    bg-[#252424] rounded-md focus:outline-0"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center h-11 w-3/5 border border-slate-500 rounded-sm">
            <FaUnlockAlt className="text-white h-full w-12 p-2 px-3 bg-slate-700" />
            <input
              className="w-full h-full p-1 px-4 text-slate-200 placeholder:text-slate-400
                    bg-[#252424] rounded-md focus:outline-0"
              type="password"
              placeholder="Enter Password"
              value={pasword}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="bg-slate-200 text-xl font-medium rounded-sm w-3/5 p-2 tracking-wider ">
          REGISTER
        </button>
        <p className="text-slate-300 text-lg mt-4">
          Already have an Account ?{" "}
          <span className="font-medium text-slate-200 hover:underline cursor-pointer" onClick={()=>{
            dispatch(toggleSignMethod('signin'));
          }}>
            Login now
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupModal;
