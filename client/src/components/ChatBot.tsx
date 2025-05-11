import React, { useState } from "react";

interface Message {
  role: string;
  content: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const sendMessage = async () => {
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput(""); // Rensa inputfältet

    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Fel från servern:", errorText);
        return;
      }

      const data = await response.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (err) {
      console.error("Något gick fel:", err);
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Skriv ett meddelande..."
      />
      <button onClick={sendMessage}>Skicka</button>
    </div>
  );
};

export default ChatBot;

