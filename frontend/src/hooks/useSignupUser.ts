import axios from "axios";
import { useDispatch } from "react-redux";
import { authUser } from "../store/authUserStore";
import { toggleSignMethod } from "../store/signMethodStore";
import { useNavigate } from "react-router-dom";

export function useSignupUser(username:String,email:String,password:String){
    const dispatch=useDispatch();
    const navigate=useNavigate();

    async function signupUser(){
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_API}/users/signup`,{
            username,email,password
        },{
            headers:{'Content-Type':"application/json"}
        });
        console.log(response.data);
        if(response.data.user){
            navigate("/feeds");
            dispatch(authUser({username:response.data.user,token:response.data.token}));
            dispatch(toggleSignMethod(null));
        }
    }
    return signupUser;
}