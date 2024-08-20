import {Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={store}>
      <div>
          <Toaster/>
          <Navbar/>
          <Outlet/>
      </div>
    </Provider>
  )
}

export default App
