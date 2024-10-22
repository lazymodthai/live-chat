import { Box, SxProps } from "@mui/material"
import { ReactNode, useEffect, useRef } from "react"

const chatBoxStyle: SxProps = {
  backgroundColor: 'white',
  width: '100%',
  height: '600px',  // Fixed height for the chat box
  borderRadius: '1rem',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  overflowY: "hidden",
  overflowX: "hidden",
  "&:hover": {
    overflowY: "auto",
  },
  "&::-webkit-scrollbar": {
    width: "0.4em",
  },
  "&::-webkit-scrollbar-track": {
    background: "#fff",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#4541a9",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#4541a9",
  },
};
const messagesContainerStyle: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  rowGap: '1rem',
  marginTop: 'auto',
}

function ChatBox(props: { children: ReactNode, refresh: number }) {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [props.refresh]);

  return (
    <Box ref={boxRef} sx={chatBoxStyle}>
      <Box sx={messagesContainerStyle}>
        {props.children}
      </Box>
    </Box>
  )
}

export default ChatBox
