import { configureStore } from "@reduxjs/toolkit";
import signMethodStore from "./signMethodStore";

export const store=configureStore({
    reducer:{
        signMethod:signMethodStore
    }
})