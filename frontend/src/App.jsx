import browserRouter from "./Routing/Index";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <RouterProvider router={browserRouter}></RouterProvider>
      <ToastContainer />
    </>
  );
};

export default App;
