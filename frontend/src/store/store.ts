import { configureStore } from "@reduxjs/toolkit";
import signMethodStore from "./signMethodStore";
import blogCache from "./blogCache";
import authUserStore from "./authUserStore";

export const store=configureStore({
    reducer:{
        signMethod:signMethodStore,
        blogCache:blogCache,
        authUser:authUserStore
    }
})

export type RootState=ReturnType<typeof store.getState>;
export type typeAppDispatch=typeof store.dispatch;