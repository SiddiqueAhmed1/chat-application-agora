import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

export default browserRouter;
