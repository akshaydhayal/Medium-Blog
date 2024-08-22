import {Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import {  useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import { RootState } from "./store/store";


function App() {
  const signMethod = useSelector((store:RootState) => store.signMethod.value);
  console.log("signMethod : ", signMethod);

  return (
      <div>
        <Toaster />
        <Navbar />
        <Outlet />
        {signMethod == "signin" && <LoginModal/>}
        {signMethod == "signup" && <SignupModal />}
      </div>
  );
}

export default App
