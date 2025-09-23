import { IoSearchOutline } from "react-icons/io5";

const Messages = () => {
  return (
    <>
      <div className="flex  h-screen bg-gradient-to-br from-neutral-900 via-green-900 to-purple-900 ">
        <div className="sidebar border-r border-neutral-500 lg:w-80 bg-white/10 backdrop-blur-2xl">
          <div className="sidebar-header text-white border-b border-neutral-500 p-5">
            <h1 className="text-2xl font-semibold">Agora Chat</h1>
            <p className="text-[13px] py-2 text-green-400 font-semibold">
              4 online
            </p>
          </div>
          <div className="sidebar-search p-3 flex flex-row border border-neutral-300 rounded-md m-5 h-12 justify-center items-center ">
            <IoSearchOutline className="mt-1" size={22} color="white" />
            <input
              type="search"
              placeholder="search conversation"
              className="w-full outline-none focus-within:border-green-500 focus-within:outline-none h-11 text-white border-none text-[12px]"
            />
          </div>
          <div className="sidebar-users-list"></div>
        </div>
        <div className="main-chat-area ">ami</div>
      </div>
    </>
  );
};

export default Messages;
