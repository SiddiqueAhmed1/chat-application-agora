import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAgoraChat } from "../Context/ChatProvider";
import agoraLogo from "../../public/agora-logo.png";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { chatClient, isInitialized } = useAgoraChat();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email and Password need", {
        position: "top-center",
      });
      return;
    }

    if (!chatClient && !isInitialized) {
      return toast.error("Chatclient not connected to agora", {
        position: "top-center",
      });
    }

    try {
      const response = await axios.post(`http://localhost:6060/api/login`, {
        email,
        password,
      });

      const { userId, accessToken } = response.data.data;
      console.log("checking from login page", response);

      // connection event handlers
      chatClient.addEventHandler("loginHandler", {
        onConnected: () => {
          setIsLoggedIn(true);
          toast.success("Login Succesfull", {
            position: "top-center",
          });
          navigate("/messages", {
            state: {
              userId,
              accessToken,
            },
          });

          chatClient.removeEventHandler("loginHandler");
        },
        onError: (error) => {
          setIsLoggedIn(false);
          toast.error(error.message, {
            position: "top-center",
          });
          console.log("error taki", error.message);

          chatClient.removeEventHandler("loginHandler");
        },
      });
      await chatClient.open({
        user: userId,
        accessToken: accessToken,
      });
    } catch (error) {
      console.error("Login error:", error);
      setIsLoggedIn(false);

      // Handle specific errors
      if (error.response) {
        // Backend error
        toast.error(error.response.data.message || "Login failed", {
          position: "top-center",
        });
      } else if (error.request) {
        // Network error
        toast.error("Cannot connect to server", {
          position: "top-center",
        });
      } else {
        // Other errors
        toast.error(error.message || "Login failed", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <>
      <section className=" h-screen flex  items-center bg-neutral-100 flex-col p-16 text-green-700 font-semibold  ">
        <div>
          <img className="w-24 h-24 object-contain" src={agoraLogo} alt="" />
        </div>
        <div className="card mx-auto w-[500px]">
          <h1 className="text-3xl text-center mb-6 font-semibold  pb-3 ">
            Login Chat
          </h1>
          <div className=" flex flex-col gap-2">
            <label className="font-semibold" htmlFor="email">
              Type your email
            </label>
            <input
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="email"
            />
            <label className="font-semibold" htmlFor="password">
              Type your password
            </label>
            <input
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              placeholder="password"
            />
            <button onClick={handleLogin} className="button my-3 text-white">
              Login
            </button>
            <p className="text-center text-sm">
              Don't have account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Register
              </span>
            </p>
          </div>
        </div>
        <div className="mt-24">
          <h1>
            Design and Developed by{" "}
            <span className="text-red-500 text-xl  inline-block">&hearts;</span>{" "}
            Siddique
          </h1>
        </div>
      </section>
    </>
  );
};

export default Login;
