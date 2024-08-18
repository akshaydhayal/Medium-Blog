import { createBrowserRouter,RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import { store } from "./store/store";
function App() {

  const appRouter=createBrowserRouter([
    {
      path:"/",
      element:<HomePage/>
    },
    {
      path:"/login",
      element:<LoginPage/>
    }
  ])
  return (
    <Provider store={store}>
      <div>
        <Navbar/>
        <RouterProvider router={appRouter}/>
      </div>
    </Provider>
  )
}

export default App
