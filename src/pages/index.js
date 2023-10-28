import React, { useState, useEffect } from 'react';


export default function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const addMessage = (from, msg) => {
    const newMessage = { from, msg };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const simulateBotResponse = (userMessage) => {
    setTimeout(() => {
      const botResponse = `Bot response to: ${userMessage}`;
      addMessage('bot', botResponse);
    }, 100);
  };

  const handleUserInput = () => {
    const userMessage = inputText.trim();
    if (userMessage) {
      addMessage('user', userMessage);
      setInputText('');
      simulateBotResponse(userMessage);
    }
  };

  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight; // bruh scroll to bottom lets go
  }, [messages]);

  return (
    <div className="chat-container" id="chat-container">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`chat-bubble ${message.from === 'user' ? 'user' : 'bot'}`}
        >
          {message.msg}
        </div>
      ))}
      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleUserInput();
            }
          }}
        />
        <button onClick={handleUserInput}>Send</button>
      </div>
    </div>
  );
}
