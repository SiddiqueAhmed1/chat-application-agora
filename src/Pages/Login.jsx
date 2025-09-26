import { useEffect, useRef, useState } from "react";
import AgoraChat from "agora-chat";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const appKey = "711398512#1603074";
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const chatClient = useRef(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userId && token) {
      chatClient.current.open({
        user: userId,
        accessToken: token,
      });
    } else {
      toast.error("UserId & Token need", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    // initializes the agora client in web
    chatClient.current = new AgoraChat.connection({
      appKey: appKey,
    });
    // on login mode
    chatClient.current.addEventHandler("connectionHandler", {
      // Occurs when the app is connected to Agora Chat.
      onConnected: () => {
        setIsLoggedIn(true);
      },

      onError: () => {
        toast.error("UserId or Token wrong", {
          position: "top-center",
        });
      },
    });
  }, []);

  // login check
  const handleSubmit = () => {
    if (isLoggedIn) {
      toast.success("User Logged in succesfully", {
        position: "top-center",
      });
      navigate("/messages", {
        state: {
          userId,
          appKey,
        },
      });
    }
    return;
  };

  useEffect(() => {
    // initializes the agora client in web
    chatClient.current = new AgoraChat.connection({
      appKey: appKey,
    });
    // on login mode
    chatClient.current.addEventHandler("connectionHandler", {
      onConnected: () => {
        setIsLoggedIn(true);
      },
      onError: (error) => {
        toast.error(error, {
          position: "top-center",
        });
      },
    });
  }, []);

  useEffect(() => {
    handleSubmit();
  }, [isLoggedIn]);

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
