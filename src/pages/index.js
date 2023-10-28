import React, { useState, useEffect } from 'react';


export default function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const addMessage = (role, message) => {
    const newMessage = { role, message };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const simulateBotResponse = async (userMessage) => {
    // setTimeout(() => {
    //   const botResponse = `Bot response to: ${userMessage}`;
    //   addMessage('bot', botResponse);
    // }, 100);
    console.log("user message: " + userMessage)
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer 1lKjIkzPneTDcPCMyYf0d2ehJvfGAKbqgj3x96Ed' // This is your trial API key
      },
      body: JSON.stringify({
          message: userMessage,
          model: 'command',
          stream: true,
          chat_history: messages,
          prompt_truncation: 'auto',
          connectors: [{"id":"web-search"}],
          citation_quality: 'accurate',
          documents: [],
          temperature: 0.3
        })
      }
      console.log(options.body)
      const res = await fetch('https://api.cohere.ai/v1/chat', options)
      const content = await res.json()
      console.log(content)
    }

    


  const handleUserInput = async () => {
    const userMessage = inputText.trim();
    if (userMessage) {
      addMessage('user', userMessage);
      setInputText('');
      await simulateBotResponse(userMessage);
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
          className={`chat-bubble ${message.role === 'user' ? 'user' : 'bot'}`}
        >
          {message.message}
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
