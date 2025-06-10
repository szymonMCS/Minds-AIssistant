import React, { useState, useRef, useEffect } from "react";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import { startInfo } from "../startInfo";

function Chatbot({ note, onClose }) {
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const chatBodyRef = useRef(null);

    const createInitialPrompt = (noteContent) => {
        const fullPrompt = `${startInfo}\n\nOto notatka użytkownika, której dotyczy rozmowa:\n---\n${noteContent}\n---`;
        return [{ role: "user", text: fullPrompt, hideInChat: true }];
    };

    const generateBotResponse = async (history) => {
        setIsLoading(true);
        const apiHistory = history
            .map(({ role, text }) => ({ role, parts: [{ text }] }));

        console.log("initial API History for chat: ",apiHistory);
            
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: apiHistory })
        };

        try {
            const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
            const data = await response.json();
            if (!response.ok) throw new Error(data.error.message || "Something went wrong!");

            const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
            setChatHistory(prev => [...prev.filter(m => (m.text !== "Myślę...") && (m.text !== "Analizuję Twoją notatkę...")), { role: "model", text: apiResponseText }]);
        } catch (error) {
            setChatHistory(prev => [...prev.filter(m => m.text !== "Myślę..."), { role: "model", text: `Błąd: ${error.message}`, isError: true }]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const initialPrompt = createInitialPrompt(note.content);
        const analyzingMessage = { role: "model", text: "Analizuję Twoją notatkę..." };
        const fullInitialHistory = [...initialPrompt, analyzingMessage];
        setChatHistory(fullInitialHistory);
        generateBotResponse(initialPrompt);

    }, [note]);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
        }
    }, [chatHistory]);

    return (
        <div className="chatbot-container">
            <div className="chat-header">
                <h2>Minds AIssistant</h2>
                <button onClick={onClose}>&times;</button>
            </div>
            <div ref={chatBodyRef} className="chat-body">
                {chatHistory.map((chat, index) => (
                    !chat.hideInChat && <ChatMessage key={index} chat={chat} />
                ))}
            </div>
            <div className="chat-footer">
                <ChatForm
                    chatHistory={chatHistory}
                    setChatHistory={setChatHistory}
                    generateBotResponse={generateBotResponse}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default Chatbot;
