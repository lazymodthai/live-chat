import { Grid2 } from "@mui/material";
import "./App.css";
import ChatBox from "./components/ChatBox";
import ChatText, { ChatTextProps } from "./components/ChatText";
import { useEffect, useState } from "react";
import ChatTextField from "./components/ChatTextField";
import { Socket } from "socket.io-client";
import { initializeSocket } from "./services/socket";
import { IMessage, MessageStatus, MessageType } from "./types/types";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentUser] = useState({
    name: "D",
    id: "56a8f64c-f2d3-4b5f-b647-5840024f16b8",
  });
  const [conversationId] = useState("e9fb8122-8792-4c63-a74f-4b96445e8363");

  const formatDate = (date: Date | string): string => {
    if (typeof date === "string") return date;
    return date.toISOString();
  };

  useEffect(() => {
    const newSocket = initializeSocket();

    if (newSocket) {
      setSocket(newSocket);

      newSocket.emit(
        "joinConversation",
        { conversationId },
        (response: any) => {
          if (response.status === "error") {
            console.error("Failed to join conversation:", response.message);
            return;
          }
          console.log("Successfully joined conversation:", response);
        }
      );

      newSocket.on("previousMessages", (prevMessages: IMessage[]) => {
        setMessages(prevMessages);
      });

      // newSocket.on("newMessage", (message: IMessage) => {
      //   setMessages((prev) => [...prev, message]);
      //   newSocket.emit("messageDelivered", { messageId: message.messageId });
      // });

      newSocket.on(
        "messageStatus",
        ({
          messageId,
          status,
        }: {
          messageId: string;
          status: MessageStatus;
        }) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.messageId === messageId ? { ...msg, status } : msg
            )
          );
        }
      );

      // ... other socket listeners ...

      newSocket.on("error", (error: any) => {
        console.error("Socket error:", error);
      });
    }

    return () => {
      if (newSocket) {
        newSocket.emit("leaveConversation", { conversationId });
        newSocket.close();
      }
    };
  }, [conversationId, currentUser.id]);

  const handleSendMessage = (text: string, name: string) => {
    if (socket && text.trim()) {
      const clientMessageId = uuidv4();
      const now = new Date();

      const messageDto: Partial<IMessage> = {
        messageId: clientMessageId,
        conversationId,
        senderId: currentUser.id,
        messageType: MessageType.TEXT,
        messageContent: text,
        status: MessageStatus.SENDING,
        sentAt: now,
        metadata: {
          clientMessageId,
        },
      };

      setMessages((prev) => [...prev, messageDto as IMessage]);

      socket.emit(
        "sendMessage",
        messageDto,
        (response: { status: string; message: IMessage }) => {
          if (response.status === "error") {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.metadata?.clientMessageId === clientMessageId
                  ? { ...msg, status: MessageStatus.FAILED }
                  : msg
              )
            );
          } else {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.metadata?.clientMessageId === clientMessageId
                  ? response.message
                  : msg
              )
            );
          }
        }
      );
    }
  };

  const handleEditMessage = (messageId: string, newContent: string) => {
    if (socket) {
      socket.emit("editMessage", { messageId, content: newContent });
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    if (socket) {
      socket.emit("deleteMessage", { messageId });
    }
  };

  return (
    <>
      <Grid2 container size={12} width={"90vw"} margin={"auto"}>
        <Grid2 size={9}>
          <ChatBox refresh={messages.length}>
            {messages.map((message: IMessage) => (
              <ChatText
                key={message.messageId}
                text={message.messageContent}
                type={message.senderId === currentUser.id ? 1 : 2}
                name={message.senderId}
                timestamp={formatDate(message.sentAt)} // Convert Date to string
                status={message.status}
                isEdited={message.isEdited}
                isDeleted={message.isDeleted}
                isPinned={message.isPinned}
                reactions={message.reactions_count}
                currentUserReaction={message.current_user_reaction}
                onEdit={
                  message.senderId === currentUser.id
                    ? (newContent: string) =>
                        handleEditMessage(message.messageId, newContent)
                    : undefined
                }
                onDelete={
                  message.senderId === currentUser.id
                    ? () => handleDeleteMessage(message.messageId)
                    : undefined
                }
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
