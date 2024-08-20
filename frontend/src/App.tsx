import {Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/store";
import { Toaster } from "react-hot-toast";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";

function App() {
  const signMethod = useSelector((store) => store.signMethod.value);
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
