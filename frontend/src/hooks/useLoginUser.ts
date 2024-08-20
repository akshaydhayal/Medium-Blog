import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authUser } from "../store/authUserStore";
import { useNavigate } from "react-router-dom";

export function useLoginUser(email:String,password:String){
    // const [email, setEmail] = useState("");
    // const [pasword, setPassword] = useState("");
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
            dispatch(authUser(response.data.user));
            navigate("/feeds");
        }
    }
    return loginUser;
}