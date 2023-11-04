import Link from 'next/link';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [messages, setMessages] = useState([]);

  // State variable to keep input text
  const [inputText, setInputText] = useState('');
  
  // TODO: make a state variable to keep track of dark or light mode

  const addMessage = (role, message) => {
    const newMessage = { role, message };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };
  
  const simulateBotResponse = async (userMessage) => {
    // API Options
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: process.env.NEXT_PUBLIC_API_KEY // This is your trial API key
      },
      body: JSON.stringify({
        message: userMessage,
        model: 'command-light',
        chat_history: messages,
        prompt_truncation: 'auto',
        connectors: [{"id":"web-search"}],
        citation_quality: 'accurate',
        documents: [],
        temperature: 0.3
      })
    }

    try {
      // API link: https://api.cohere.ai/v1/chat
      // TODO: Make a request to the API with the options above

      // TODO: Add your response to the chat using the addMessage function

    } catch (err) {
      console.error(err)
    }
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

  // TODO: Make an alert every time the user switches between light and dark mode

  
  useEffect(() => {
    // TODO : add a welcome message by sending "hi" to the bot when the page loads

  }, [])
  


  return (
  <>
    {/* Navbar */}
    <div className="navbar">
      <Link href={"https:/ieee.utoronto.ca"}>
        <img className='logo' src="/logo.png"/>
      </Link>
      <Link href={"/"}>
        <button className="promo">Home</button>
      </Link>
      {/* TODO: Make the promo page */}
      <Link href={"/promo"}>
        <button className="promo">Promo</button>
      </Link>
    </div>

    {/* Chat */}
    <div 
      className="chat-container"
      id="chat-container"
    >
      {messages.map((message, index) => (
        <div
          key={index}
          className={`chat-bubble ${message.role === 'user' ? 'user' : 'bot'}`}
        >
          {message.message}
        </div>
      ))}
    </div>

    {/* Input */}
    <div className="input-container">
      {/* Light and Dark Mode Button */}
      <button 
        // TODO: handle user switching between light and dark mode using onClick

      >
        Dark Mode
      </button>
      <input
        type="text"
        value={inputText}
        // TODO: handle user input using onChange

        placeholder="Type a message..." 
        // TODO: handle a user pressing enter to send a message

      />
      <button onClick={handleUserInput}>Send</button>
    </div>
  </>
  );
}

