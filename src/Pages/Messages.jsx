import { useEffect, useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import { FaRegSmile } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import AgoraChat from "agora-chat";
import {
  IoCallOutline,
  IoLogOutOutline,
  IoSearchOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Messages = () => {
  const appKey = "711398512#1603074";
  const location = useLocation();
  const navigate = useNavigate();
  const chatClient = useRef(null);
  const [isLogout, setIsLogout] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const [messages, setMessages] = useState([]);

  // login agora
  const loginToAgoraChat = async () => {
    try {
      await chatClient.current.open({
        user: location?.state?.userId,
        accessToken: location?.state?.appKey,
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Logs out.
  const handleLogout = () => {
    chatClient.current.close();
    setIsLoggedIn(false);
    setIsLogout(true);
    if (isLogout) {
      toast.info("User logged out succesfully", {
        position: "top-center",
      });
      navigate("/login");
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
      onDisconnected: () => {
        setIsLogout(true);
        setIsLoggedIn(false);
      },
      onTextMessage: (message) => {
        const isMe = message.from === chatClient.current.user;

        // ✅ Only add if it's NOT my message (avoid duplicates)
        if (!isMe) {
          const receivedMessage = {
            id: message.id,
            userId: message.from,
            msgContent: message.msg,
            time: new Date(message.time),
            isOwn: false,
            status: "received",
          };

          setMessages((prev) => [...prev, receivedMessage]);
        }
      },
      onError: (error) => {
        toast.error(error, {
          position: "top-center",
        });
      },
    });
  }, []);

  // submit message
  const handleSubmitMessage = async () => {
    if (newMessage.trim()) {
      const sendMessage = {
        id: Date.now(),
        userId: location?.state?.userId,
        msgContent: newMessage,
        time: new Date(Date.now()) - 3600000,
        isOwn: true,
      };

      try {
        if (isLoggedIn) {
          const msgOptions = {
            chatType: "singleChat",
            type: "txt",
            to: "Shahnewaz",
            msg: newMessage,
          };
          let msg = AgoraChat.message.create(msgOptions);

          await chatClient.current.send(msg);
          setMessages((prevMessage) => [...prevMessage, sendMessage]);
          console.log(sendMessage);

          setNewMessage("");
        }
      } catch (error) {
        toast.error(`Message send failed: ${error.message}`, {
          position: "top-center",
        });
      }
    } else {
      toast.warning("Please enter message content", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    if (!location?.state?.appKey) {
      navigate("/login");
    }
  }, []);

  //
  useEffect(() => {
    if (location?.state?.appKey && location?.state?.userId) {
      loginToAgoraChat();
    }
  }, []);

  return (
    <>
      <div className="flex h-screen bg-gradient-to-bl from-green-900 via-purple-950 to-green-900 ">
        <div className="sidebar overflow-y-auto border-r flex  flex-col border-neutral-500 w-48 lg:w-80 bg-white/10 backdrop-blur-2xl">
          <div className="sidebar-header  text-white border-b border-neutral-500 p-5">
            <h1 className="text-2xl font-semibold">Agora Chat</h1>
            <p className="text-[13px] py-2 text-green-400 font-semibold">
              4 online
            </p>
          </div>
          <div className="sidebar-search p-3 flex flex-row border border-neutral-300 rounded-md m-5 h-12 justify-center items-center ">
            <IoSearchOutline className="mt-1" size={22} color="white" />
            <input
              type="search"
              placeholder="Search conversation"
              className="w-full outline-none focus-within:border-green-500 focus-within:outline-none h-11 text-white border-none text-[12px]"
            />
          </div>
          <div className="sidebar-users-list mx-6 text-white">
            <h1>Siddique AHmed</h1>
            <h1>Siddique AHmed</h1>
          </div>
          <div className="sidebar-settings flex flex-1 flex-col-reverse mb-10 mx-5 cursor-pointer">
            <span onClick={handleLogout}>
              <IoLogOutOutline size={30} color="white" />
            </span>
          </div>
        </div>
        <div className="main-chat-area flex flex-col flex-1">
          <div className="chat-header flex justify-between  border-b border-neutral-500 bg-white/10 backdrop-blur-2xl">
            <div className="chear-header-left flex items-center gap-3 text-white m-4">
              <img
                className="w-12 h-12 border border-green-500 rounded-full object-cover"
                src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                alt=""
              />
              <div className="chat_header_info">
                <h1 className="font-semibold text-[17px]">
                  {location?.state?.userId}
                </h1>
                <p className="text-xs text-neutral-300 ">Web Developer</p>
              </div>
            </div>
            <div className="chear-header-right-calling flex gap-5 items-center mr-4">
              <span className="hover:bg-green-700 w-8 h-8 flex items-center justify-center transition rounded-lg cursor-pointer">
                <IoCallOutline size={22} color="white" />
              </span>

              <span className="hover:bg-green-700 w-8 h-8 flex items-center justify-center transition rounded-lg cursor-pointer">
                <IoVideocamOutline size={22} color="white" />
              </span>
              <span className="hover:bg-green-700 w-8 h-8 flex items-center justify-center transition rounded-lg cursor-pointer">
                <HiOutlineDotsHorizontal size={22} color="white" />
              </span>
            </div>
          </div>

          {/* chat area */}
          <div className=" flex-col-reverse chat-area flex text-white flex-1 overflow-y-auto m-5">
            {messages.map((item, index) => (
              <>
                <div key={index}>
                  <h1>{item.msgContent}</h1>
                </div>
              </>
            ))}
          </div>
          <div className="chat-input flex justify-between items-center gap-3 border-t border-neutral-500 bg-white/10 backdrop-blur-2xl p-5 relative">
            <span>
              <FiLink color="white" size={22} />
            </span>
            <div className="flex flex-1 ">
              <input
                name="newMessage"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                type="text"
                placeholder="Message"
                className="bg-white/10 text-white "
              />
            </div>
            <span className="absolute right-24 hover:cursor-pointer">
              <FaRegSmile color="white" size={20} />
            </span>
            <button
              onClick={handleSubmitMessage}
              disabled={!newMessage.trim()}
              className={`hover:text-2xl text-lg transition-colors   rounded-md p-2 ${
                !newMessage.trim()
                  ? "cursor-not-allowed bg-gradient-to-br from-neutral-400 to-neutral-500"
                  : "cursor-pointer bg-gradient-to-br from-green-500 to-pink-500"
              }  w-12 h-12 flex justify-center items-center`}
            >
              <BsSend color="white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
