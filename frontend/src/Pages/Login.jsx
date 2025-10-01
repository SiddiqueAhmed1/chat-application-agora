import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAgoraChat } from "../Context/ChatProvider";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { chatClient, isInitialized } = useAgoraChat();

  const handleLogin = async () => {
    if (!userId && !token) {
      return toast.error("UserId or Token need", {
        position: "top-center",
      });
    }

    if (!chatClient && !isInitialized) {
      return toast.error("Chatclient not connected to agora", {
        position: "top-center",
      });
    }

    try {
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
              token,
              isLoggedIn,
            },
          });
          chatClient.removeEventHandler("loginHandler");
        },
        onError: () => {
          setIsLoggedIn(false);
          toast.error("Login Failed", {
            position: "top-center",
          });
          chatClient.removeEventHandler("loginHandler");
        },
      });

      await chatClient.open({
        user: userId,
        accessToken: token,
      });
    } catch (error) {
      setIsLoggedIn(false);
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <section className=" h-[700px] flex  items-center bg-neutral-100 flex-col justify-evenly text-green-700 font-semibold font-sans ">
        <div className="card mx-auto ">
          <h1 className="text-3xl text-center mb-6 font-semibold  pb-3 ">
            Agora Chat
          </h1>
          <div className=" flex flex-col gap-2">
            <label className="font-semibold" htmlFor="userid">
              Type your userId
            </label>
            <input
              name="userId"
              id="userid"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              type="text"
              placeholder="UserId"
            />
            <label className="font-semibold" htmlFor="token">
              Type your token
            </label>
            <input
              name="token"
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              type="text"
              placeholder="Token"
            />
            <button onClick={handleLogin} className="button my-3 text-white">
              Login
            </button>
          </div>
        </div>
        <div>
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
