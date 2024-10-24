import { Grid2 } from "@mui/material";
import "./App.css";
import ChatBox from "./components/ChatBox";
import ChatText, { ChatTextProps } from "./components/ChatText";
import { useEffect, useState } from "react";
import ChatTextField from "./components/ChatTextField";
import { Socket } from "socket.io-client";
import { initializeSocket } from "./services/socket";

function App() {
  const [texts, setTexts] = useState<ChatTextProps[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentUser] = useState({ name: "กูเอง", id: "user1" });

  useEffect(() => {
    const newSocket = initializeSocket();

    newSocket.on(
      "chatMessage",
      (message: { text: string; userId: string; userName: string }) => {
        const newMessage: ChatTextProps = {
          text: message.text,
          type: message.userId === currentUser.id ? 1 : 2,
          name: message.userName,
          timestamp: new Date().toISOString(),
        };
        setTexts((prev) => [...prev, newMessage]);
      }
    );

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [currentUser.id]);

  const handleSendMessage = (text: string, name: string) => {
    if (socket && text.trim()) {
      const messageData = {
        text,
        userId: currentUser.id,
        userName: name,
        timestamp: new Date().toISOString(),
      };
      socket.emit("sendMessage", messageData);
    }
  };

  return (
    <>
      <Grid2 container size={12} width={"90vw"} margin={"auto"}>
        <Grid2 size={9}>
          <ChatBox refresh={texts.length}>
            {texts?.map((i: ChatTextProps, index: number) => (
              <ChatText
                key={`${i.name}-${index}-${i.timestamp}`}
                text={i.text}
                type={i.type}
                name={i.name}
                timestamp={i.timestamp}
              />
            ))}
          </ChatBox>
        </Grid2>
        <Grid2 size={3}>UserList</Grid2>
        <Grid2 size={9} marginTop={2}>
          <ChatTextField name={currentUser.name} onSend={handleSendMessage} />
        </Grid2>
      </Grid2>
    </>
  );
}

export default App;
