import { createBrowserRouter,RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import { store } from "./store/store";
import FeedPage from "./pages/FeedPage";
import BlogPage from "./pages/BlogPage";
import PublishBlogPage from "./pages/PublishBlogPage";
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
