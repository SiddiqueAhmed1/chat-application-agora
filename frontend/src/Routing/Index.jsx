import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Messages from "../Pages/Messages";
import Chat from "../Pages/Chat";
import Home from "../Pages/Home";
import Register from "../Pages/Register";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/messages",
    element: <Messages />,
  },
]);

export default browserRouter;
