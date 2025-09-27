import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login";
import Messages from "../Pages/Messages";
import Chat from "../Pages/Chat";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
