import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import FeedPage from './pages/FeedPage.tsx'
import HomePage from './pages/HomePage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import BlogPage from './pages/BlogPage.tsx'
import PublishBlogPage from './pages/PublishBlogPage.tsx'
import UpdateBlogPage from './pages/UpdateBlogPage.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage/>,
      },
      {
        path: "/feeds",
        element: <FeedPage />,
      },
      {
        path: "/:blogId",
        element: <BlogPage/>,
      },
      {
        path: "/publish",
        element: <PublishBlogPage/>,
      },
      {
        path: "/update/:blogId",
        element: <UpdateBlogPage/>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter}/>
    </Provider>
  </StrictMode>,
)
