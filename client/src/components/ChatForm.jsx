import React, { useState } from "react";
import SendIcon from '@mui/icons-material/Send';

function ChatForm({ chatHistory, setChatHistory, generateBotResponse, isLoading }) {
  const [message, setMessage] = useState("");
  
  function handleChange(event) {
    setMessage(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if(!message.trim() || isLoading) return;

    const newHistory = [...chatHistory, 
      { role: "user", text: message },
      { role: "model", text: "Myślę..." }
    ];
    setChatHistory(newHistory);
    setMessage("");

    generateBotResponse(newHistory.filter(m => m.text !== "Myślę..."));
  }

  return (
    <form className="chat-form" onSubmit={handleFormSubmit}>
      <input 
        type="text" 
        placeholder="Napisz wiadomość..." 
        className="message-input" 
        name="message"
        required
        onChange={handleChange}
        value={message}
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading || !message.trim()}>
        <SendIcon />
      </button>
    </form>
  );
};

export default ChatForm;
