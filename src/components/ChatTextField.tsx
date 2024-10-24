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
  borderRadius: "20px 0 0 20px",
  fontSize: 50,
  "& .MuiOutlinedInput-root": {
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
    <Grid2 container size={12}>
      <Grid2 size={11.5}>
        <TextField
          multiline
          value={text}
          maxRows={3}
          rows={3}
          sx={textFieldStyle}
          hiddenLabel
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </Grid2>
      <Grid2 size={0.5}>
        <Button
          onClick={handleSend}
          variant="contained"
          sx={{
            height: "100%",
            width: "100%",
            borderRadius: "0 20px 20px 0",
            "&:focus": {
              outline: "none",
              border: "none",
            },
          }}
        >
          {<SendIcon />}
        </Button>
      </Grid2>
    </Grid2>
  );
}

export default ChatTextField;
