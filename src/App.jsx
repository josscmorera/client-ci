import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/Root";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewPost from "./pages/NewPost";

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
