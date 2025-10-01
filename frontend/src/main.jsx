import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ChatProvider from "./Context/ChatProvider";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChatProvider>
      <App />
    </ChatProvider>
  </StrictMode>
);
