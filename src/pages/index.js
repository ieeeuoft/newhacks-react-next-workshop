import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [disableInput , setDisableInput] = useState(false);
  const [dark , setDark] = useState(false);
  
  const addMessage = (role, message) => {
    const newMessage = { role, message };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const simulateBotResponse = async (userMessage) => {
    setDisableInput(true);
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
      console.log(options.body)
      try{
      const res = await fetch('https://api.cohere.ai/v1/chat', options)
      let content = await res.json()
      
      console.log(content.text)
      addMessage ('Chatbot', content.text);

      } catch (err) {
        console.error(err)
      }

      setDisableInput(false);
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

  

  useEffect(() => {
    const hi = async () => {
      await simulateBotResponse("hi")
    }
    hi()
  }, [])
  return (
  <>
    <NavBar dark={dark} />
    <div className= {dark ? "chat-container dark" : "chat-container"} id="chat-container">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`chat-bubble ${message.role === 'user' ? 'user' : 'bot'}`}
        >
          {message.message}
        </div>
      ))}
    </div>
    <div className= { `input-container ${ dark && 'dark'}`}>
        <button onClick={()=>setDark(!dark)}> {dark ? "enable light" : "enable dark"}</button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder= { disableInput ? "Loading bot response.." : "Type a message..."} 
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleUserInput();
            }
          }}
          disabled={disableInput}
        />
        <button onClick={handleUserInput} disabled={disableInput} >Send</button>
      </div>
  </>
  );
}

