import { useEffect, useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import { FaRegSmile } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { HiOutlineDotsHorizontal, HiOutlineUsers } from "react-icons/hi";
import AgoraChat from "agora-chat";
import {
  IoCallOutline,
  IoLogOutOutline,
  IoSearchOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAgoraChat } from "../Context/ChatProvider";
import axios from "axios";
import { PiUsers } from "react-icons/pi";

const Messages = () => {
  // shared connection
  const { chatClient } = useAgoraChat();
  const location = useLocation();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState("");
  const [setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelecedUser] = useState(null);

  const timeFormat = (timeStamp) => {
    return timeStamp.toLocaleString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getAllUser = async () => {
    const userResponse = await axios.get(`http://localhost:6060/api/users`);
    const user = userResponse?.data?.data;
    setAllUsers(() => [...user]);
    console.log("user data", user.username);
  };

  useEffect(() => {
    if (!location?.state?.userId || !location?.state?.accessToken) {
      toast.error("Not logged in", {
        position: "top-center",
      });

      navigate("/login");
      return;
    }

    if (!chatClient) {
      toast.error("Not connect yet", {
        position: "top-center",
      });
      navigate("/login");
      return;
    }

    // event handler
    chatClient.addEventHandler("messageHandler", {
      onConnected: () => {
        setIsLoggedIn(true);
        toast.success("Connected to chat server");
      },
      onTextMessage: (message) => {
        const isMyMsg = chatClient.user === message.from;

        if (!isMyMsg) {
          const recievedMsg = {
            userId: message.from,
            msgContent: message.msg,
            time: new Date(),
            isOwn: false,
          };
          console.log("Message checking", message);

          setMessages((prevMessage) => [...prevMessage, recievedMsg]);
        }
      },

      onError: (error) => {
        toast.error("Error Message:" + error.message, {
          position: "top-center",
        });
      },
    });

    getAllUser();
    loginToAgora();

    return () => {
      if (chatClient) {
        chatClient.removeEventHandler("messageHandler");
      }
    };
  }, [chatClient, location?.state, navigate]);

  const scrollToMessage = () => {
    messageEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToMessage();
  }, [messages]);

  const loginToAgora = async () => {
    // Check if already logged in
    if (chatClient.user) {
      console.log("Already logged in as:", chatClient.user);
      setIsLoggedIn(true);
    } else {
      // Login if not already logged in
      await chatClient.open({
        user: location?.state?.userId,
        accessToken: location?.state?.accessToken,
      });
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      return toast.error("Message field empty", {
        position: "top-center",
      });
    }

    const tempId = Date.now();
    const sendingMessage = {
      id: tempId,
      userId: location?.state?.userId,
      msgContent: newMessage,
      time: new Date(),
      isOwn: true,
      status: "sending",
    };

    setMessages((prevMessage) => [...prevMessage, sendingMessage]);
    const messageText = newMessage;
    setNewMessage("");

    try {
      const msgOptions = {
        chatType: "singleChat",
        type: "txt",
        to: selectedUser,
        msg: messageText,
      };

      const msg = AgoraChat.message.create(msgOptions);
      await chatClient.send(msg);

      setMessages((prevMessage) =>
        prevMessage.map((m) =>
          m.id === tempId ? { ...m, id: msg.id, status: "sent" } : m
        )
      );
      setNewMessage("");
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  const handleLogout = async () => {
    try {
      if (chatClient) {
        await chatClient.close();
      }
      toast.success("Logged out");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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
            <div className="flex gap-2 items-center text-green-400 text-lg mb-2">
              <span className="font-semibold">
                <PiUsers />
              </span>
              <h1 className="font-semibold">Users</h1>
            </div>

            {allUsers
              .filter((item) => item.username != location?.state?.userId)
              .map((item, index) => (
                <>
                  <div key={index + 1}>
                    <button
                      onClick={() => setSelecedUser(item.username)}
                      className="mb-1 rounded-md cursor-pointer transition hover:bg-gradient-to-r from-blue-700 to-green-700 px-2 py-1 "
                    >
                      {index + 1}. {item.username}
                    </button>
                  </div>
                </>
              ))}
          </div>

          <div className="sidebar-settings flex flex-1  mx-5  gap-3">
            <div>
              <span onClick={handleLogout} className="cursor-pointer">
                <IoLogOutOutline size={30} color="white" />
              </span>
              <h1 className="text-white cursor-pointer hover:text-green-400">
                {location?.state?.userId}
              </h1>
            </div>
          </div>
        </div>
        <div className="main-chat-area flex flex-col flex-1">
          {selectedUser ? (
            <>
              <div className="chat-header flex justify-between  border-b border-neutral-500 bg-white/10 backdrop-blur-2xl">
                <div className="chear-header-left flex items-center gap-3 text-white m-4">
                  <img
                    className="w-12 h-12 border border-green-500 rounded-full object-cover"
                    src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                    alt=""
                  />

                  <div className="chat_header_info">
                    <h1 className="font-semibold text-[17px]">
                      {selectedUser}
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
              <div className="  text-white flex-1 overflow-y-auto ">
                {messages
                  .filter((msg) => msg.userId === selectedUser)
                  .map((item, index) => (
                    <>
                      <div
                        key={index + 1}
                        className={` ${
                          item.isOwn ? "text-right" : "text-left"
                        } m-5`}
                      >
                        <div>
                          <p className="text-[14px] text-neutral-300 font-semibold mb-[2px] px-2">
                            {item.isOwn ? "You" : item.userId}
                          </p>
                          <p className="text-[11px] mb-2 text-neutral-400 font-semibold  px-2">
                            {timeFormat(item.time)}
                          </p>
                        </div>
                        <div
                          className={` ${
                            item.isOwn
                              ? "bg-gradient-to-r from-blue-600/80 to-green-700"
                              : "bg-gradient-to-r from-white/10 to-white/20 text-neutral-200 border border-neutral-500 backdrop-blur-3xl"
                          }  inline-block max-w-96  px-4 py-2 rounded-2xl mb-2`}
                        >
                          <h1 className=" text-left">{item.msgContent}</h1>
                        </div>
                      </div>
                    </>
                  ))}
                <div ref={messageEndRef}></div>
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
                  onClick={handleSendMessage}
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
            </>
          ) : (
            <div className="flex justify-center flex-row items-center text-white text-5xl">
              Please select a user to start chatting <br />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Messages;
