import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login";
import Messages from "../Pages/Messages";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
