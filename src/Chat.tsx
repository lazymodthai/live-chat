import { Grid2 } from '@mui/material'
import { useEffect, useState } from 'react'
import ChatBox from './components/ChatBox'
import ChatText, { ChatTextProps } from './components/ChatText'
import ChatTextField from './components/ChatTextField'
import { initializeSocket } from './services/socket'
import { Socket } from 'socket.io-client'

function Chat() {

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

  useEffect(()=>{
    console.log(window.innerWidth)
  },[window.innerWidth])

  return (
    <Grid2 display={'flex'} justifyContent={'center'} width={'70%'} flexDirection={'column'}>
      <Grid2 size={12} fontSize={30} paddingY={2}>Live Chat</Grid2>
      <Grid2 container size={12} spacing={2}>
        <Grid2 size={8} container>
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
        <Grid2 size={4} bgcolor={'rgb(256, 256, 256, 30%)'} borderRadius={'20px'} padding={2}>UserList</Grid2>
        <Grid2 size={12} marginTop={2} container paddingRight={2}>
          <ChatTextField name={currentUser.name} onSend={handleSendMessage} />
        </Grid2>
      </Grid2>
    </Grid2>
  )
}

export default Chat