import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login";
import Messages from "../Pages/Messages";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <h1 className="text-9xl font-semibold">This is home page</h1>,
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
