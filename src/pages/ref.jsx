import React, { useState, useEffect, useRef } from 'react';

export default function Ref() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const chatContainerRef = useRef();

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
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-messages" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-bubble ${message.from === 'user' ? 'user' : 'bot'}`}
          >
            {message.msg}
          </div>
        ))}
      </div>
      <div className="chat-input">
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
