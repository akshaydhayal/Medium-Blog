import { configureStore } from "@reduxjs/toolkit";
import signMethodStore from "./signMethodStore";
import blogCache from "./blogCache";

export const store=configureStore({
    reducer:{
        signMethod:signMethodStore,
        blogCache:blogCache
    }
})