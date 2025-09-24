import { useEffect } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { FaRegSmile } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import {
  IoCallOutline,
  IoSearchOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const Messages = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location?.state?.accessToken) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="flex  h-screen bg-gradient-to-bl from-green-900 via-purple-900 to-green-900 ">
        <div className="sidebar overflow-y-auto border-r border-neutral-500 w-48 lg:w-80 bg-white/10 backdrop-blur-2xl">
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
          <div className="sidebar-users-list mx-6">
            <h1>Siddique AHmed</h1>
            <h1>Siddique AHmed</h1>
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
                <h1 className="font-semibold text-[17px]">Abdur Rahim</h1>
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
          <div className="chat-area flex text-white flex-1 flex-col overflow-y-auto">
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
            <h1>On message</h1>
          </div>
          <div className="chat-input flex justify-between items-center gap-3 border-t border-neutral-500 bg-white/10 backdrop-blur-2xl p-5 relative">
            <span>
              <FiLink />
            </span>
            <div className="flex flex-1 ">
              <input
                type="text"
                placeholder="Message"
                className="bg-white/10 text-white"
              />
            </div>
            <span className="absolute right-16">
              <FaRegSmile color="white" size={20} />
            </span>
            <span className="bg-gradient-to-br from-green-500 to-neutral-500 p-2">
              <BsFillSendFill />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
