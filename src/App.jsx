import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/Root";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewPost from "./pages/NewPost";
import Populars from "./pages/Populars";
import Community from "./pages/Community";
import User from "./pages/User";
import CommunityLabel from "./pages/CommunityLabel";
import Post from "./pages/Post";
import Settings from "./pages/Settings";
import PostEdit from "./pages/PostEdit";
import Posts from "./pages/Posts";
import Users from "./pages/Users";
import Reports from "./pages/Reports";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/new-post",
          element: <NewPost />,
        },
        {
          path: "/populars",
          element: <Populars />,
        },
        {
          path: "/r/:slug",
          element: <Community />,
        },
        {
          path: "u/:username",
          element: <User />,
        },
        {
          path: "/r/:slug/posts/:slug",
          element: <Post />,
        },
        {
          path: "u/:username/posts/:slug",
          element: <Post />,
        },
        {
          path: "r/:slug/label/:label",
          element: <CommunityLabel />,
        },
        {
          path: "u/:username/label/:label",
          element: <CommunityLabel />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
        {
          path: "/posts/:slug/edit",
          element: <PostEdit />,
        },
        {
          path: "/admin",
          element: <Posts />,
        },
        {
          path: "/admin/users",
          element: <Users />,
        },
        {
          path: "/admin/reports",
          element: <Reports />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
