import axios from "axios";
import { useDispatch } from "react-redux";
import { authUser } from "../store/authUserStore";
import { toggleSignMethod } from "../store/signMethodStore";

export function useSignupUser(username:String,email:String,password:String){
    // const authUser=useSelector(store=>store)
    const dispatch=useDispatch();
    async function signupUser(){
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_API}/users/signup`,{
            username,email,password
        },{
            headers:{'Content-Type':"application/json"}
        });
        console.log(response.data);
        if(response.data.user){
            dispatch(authUser({username:response.data.user,token:response.data.token}));
            dispatch(toggleSignMethod(null));
        }
    }
    return signupUser;
}