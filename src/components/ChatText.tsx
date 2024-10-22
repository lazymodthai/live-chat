import { Grid2, SxProps } from "@mui/material";

export interface ChatTextProps {
  text: string;
  type: 1 | 2;
  name: string;
  time: Date | null;
}

const userBoxStyle: SxProps = {
  padding: 1,
  backgroundColor: "#000",
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
};

function ChatText(props: ChatTextProps) {
  const arrow: SxProps = props.type === 1 
    ? {
      "&::after": {
        content: '""',
        position: "absolute",
        bottom: "15px",
        left: "100%",
        marginTop: "-7px",
        border: "7px solid transparent",
        borderLeftColor: "#a8e188",
      }
    } 
    : {
      "&::after": {
        content: '""',
        position: "absolute",
        bottom: "15px",
        right: "100%",
        marginTop: "-7px",
        border: "7px solid transparent",
        borderRightColor: "#88c9e1",
      }
    };

  return (
    <Grid2
      container
      width={"100%"}
      sx={{
        display: "flex",
        justifyContent: props.type === 1 ? "flex-end" : "flex-start",
        columnGap: 1.5,
        alignItems: 'end',
      }}
    >
      {props.type === 2 && (<Grid2 sx={userBoxStyle}>{props.name[0]}</Grid2>)}
      <Grid2
        sx={{
          maxWidth: '90%',
          padding: 1,
          color: "#000",
          backgroundColor: props.type === 1 ? "#a8e188" : "#88c9e1",
          borderRadius: 2,
          wordWrap: "break-word",
          wordBreak: "break-word",
          overflowWrap: "break-word",
          textAlign: "left",
          whiteSpace: 'pre-line',
          position: 'relative',
          ...arrow
        }}
      >
        {props.text}
      </Grid2>
      {props.type === 1 && (<Grid2 sx={userBoxStyle}>{props.name[0]}</Grid2>)}
    </Grid2>
  );
}

export default ChatText;
