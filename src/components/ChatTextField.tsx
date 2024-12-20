import { Button, Grid2, SxProps, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

interface TextFieldProps {
  name: string;
  onSend: (text: string, name: string) => void;
}

const textFieldStyle: SxProps = {
  backgroundColor: "#ececec",
  width: "100%",
  borderRadius: 80,
  fontSize: 50,
  "& .MuiOutlinedInput-root": {
    paddingLeft: 3,
    fontSize: 20,
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
  },
};

function ChatTextField(props: TextFieldProps) {
  const [text, setText] = useState<string>("");

  const handleSend = () => {
    if (text.trim() === "") return;
    props.onSend(text.replace(/\n/g, "\n"), props.name);
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (text.trim() === "") return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Grid2 container size={12} display={'flex'} flexDirection={'row'} position={'relative'}>
        <TextField
          multiline
          value={text}
          maxRows={3}
          rows={1}
          sx={textFieldStyle}
          hiddenLabel
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          onClick={handleSend}
          variant="contained"
          sx={{
            position: 'absolute',
            right: -10,
            top: 0,
            height: "100%",
            width: "10px",
            borderRadius: "50%",
            "&:focus": {
              outline: "none",
              border: "none",
            },
          }}
        >
          {<SendIcon />}
        </Button>
    </Grid2>
  );
}

export default ChatTextField;
