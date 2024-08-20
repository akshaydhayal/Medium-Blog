import { createBrowserRouter,RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import { store } from "./store/store";
import FeedPage from "./pages/FeedPage";
import BlogPage from "./pages/BlogPage";
import PublishBlogPage from "./pages/PublishBlogPage";
import UpdateBlogPage from "./pages/UpdateBlogPage";
function App() {

  const appRouter=createBrowserRouter([
    {
      path:"/",
      element:<HomePage/>
    },
    {
      path:"/login",
      element:<LoginPage/>
    },{
      path:"/feeds",
      element:<FeedPage/>
    },{
      path:"/:blogId",
      element:<BlogPage/>
    },{
      path:"/publish",
      element:<PublishBlogPage/>
    },{
      path:"/update/:blogId",
      element:<UpdateBlogPage/>
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
