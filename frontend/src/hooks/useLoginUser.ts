import axios from "axios";
import { useDispatch } from "react-redux";
import { authUser } from "../store/authUserStore";
import { useNavigate } from "react-router-dom";
import { toggleSignMethod } from "../store/signMethodStore";

export function useLoginUser(email:String,password:String){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    async function loginUser(){
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_API}/users/signin`,{
            email,password
        },{
            headers:{'Content-Type':"application/json"}
        })
        console.log(response.data);
        if(response.data.user){
            dispatch(authUser({username:response.data.user,token:response.data.token}));
            dispatch(toggleSignMethod(null));
            navigate("/feeds");
        }
    }
    return loginUser;
}