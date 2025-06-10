import React from "react";

function ChatMessage({ chat }) {
  const isBot = chat.role === "model";
  
  return (
    <div className={`message ${isBot ? 'bot-message' : 'user-message'} ${chat.isError ? "error" : ""}`}>
        {isBot && <div className="bot-icon"></div>}
        <p className="message-text">{chat.text}</p>
    </div>
  );
};

export default ChatMessage;
