import { useEffect, useState, useRef } from "react";
import "./App.css";
import AgoraChat from "agora-chat";
import { toast } from "react-toastify";

function App() {
  // Replaces <Your app key> with your app key.
  const appKey = "711398512#1603074";
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [peerId, setPeerId] = useState("");
  const [message, setMessage] = useState("");
  const [logs, setLogs] = useState([]);
  const chatClient = useRef(null);

  // Logs into Agora Chat.
  const handleLogin = () => {
    if (userId && token) {
      chatClient.current.open({
        user: userId,
        // Use agoraToken for v1.2.1 and earlier, but accessToken for 1.2.2 and later.
        accessToken: token,
      });
    } else {
      toast.error("Please enter userId and Token", {
        position: "top-center",
      });
    }
  };

  // Logs out.
  const handleLogout = () => {
    chatClient.current.close();
    setIsLoggedIn(false);
    setUserId("");
    setToken("");
    setPeerId("");
  };

  // Sends a peer-to-peer message.
  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        const options = {
          chatType: "singleChat", // Sets the chat type as a one-to-one chat.
          type: "txt", // Sets the message type.
          to: peerId, // Sets the recipient of the message with user ID.
          msg: message, // Sets the message content.
        };
        let msg = AgoraChat.message.create(options);

        await chatClient.current.send(msg);
        addLog(`Message send to ${peerId}: ${message}`);
        setMessage("");
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

  // Add log.
  const addLog = (log) => {
    setLogs((prevLogs) => [...prevLogs, log]);
  };

  useEffect(() => {
    // Initializes the Web client.
    chatClient.current = new AgoraChat.connection({
      appKey: appKey,
    });

    // Adds the event handler.
    chatClient.current.addEventHandler("connection&message", {
      // Occurs when the app is connected to Agora Chat.
      onConnected: () => {
        setIsLoggedIn(true);
        addLog(`User ${userId} Connect success !`);
      },
      // Occurs when the app is disconnected from Agora Chat.
      onDisconnected: () => {
        setIsLoggedIn(false);
        addLog(`User Logout!`);
      },
      // Occurs when a text message is received.
      onTextMessage: (message) => {
        addLog(`${message.from}: ${message.msg}`);
      },
      // Occurs when the token is about to expire.
      onTokenWillExpire: () => {
        addLog("Token is about to expire");
      },
      // Occurs when the token has expired.
      onTokenExpired: () => {
        addLog("Token has expired");
      },
      onError: (error) => {
        addLog(`on error: ${error.message}`);
        console.log(error);
      },
    });
  }, []);

  return (
    <>
      <div
        style={{
          width: "500px",
          display: "flex",
          gap: "10px",
          flexDirection: "column",
        }}
      >
        <h2>Agora Chat Examples</h2>
        {!isLoggedIn ? (
          <>
            <div>
              <label>UserID: </label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter the user ID"
              />
            </div>
            <div>
              <label>Token: </label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter the token"
              />
            </div>
            <button onClick={handleLogin}>Login</button>
          </>
        ) : (
          <>
            <h3>Welcome, {userId}</h3>
            <button onClick={handleLogout}>Logout</button>
            <div>
              <label>Peer userID: </label>
              <input
                type="text"
                value={peerId}
                onChange={(e) => setPeerId(e.target.value)}
                placeholder="Enter the peer user ID"
              />
            </div>
            <div>
              <label>Peer message: </label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Input message"
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </>
        )}

        <h3>Operation log</h3>
        <div
          style={{
            height: "300px",
            overflowY: "auto",
            border: "1px solid #ccc",
            padding: "10px",
            textAlign: "left",
          }}
        >
          {logs.map((log, index) => (
            <div className="text-sky-600 font-semibold" key={index}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
