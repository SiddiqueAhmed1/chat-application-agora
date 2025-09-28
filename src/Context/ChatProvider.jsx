import { createContext, useContext, useEffect, useRef, useState } from "react";
import AgoraChat from "agora-chat";

const AgoraContext = createContext();

const ChatProvider = ({ children }) => {
  const chatClient = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!chatClient.current) {
      chatClient.current = new AgoraChat.connection({
        appKey: "711398512#1603074",
      });
    }

    setIsInitialized(true);
  }, []);

  return (
    <AgoraContext.Provider
      value={{
        chatClient: chatClient.current,
        isInitialized,
      }}
    >
      {children}
    </AgoraContext.Provider>
  );
};

export const useAgoraChat = () => {
  const context = useContext(AgoraContext);
  if (!context) {
    throw new Error("Provider not create");
  }
  return context;
};

export default ChatProvider;
