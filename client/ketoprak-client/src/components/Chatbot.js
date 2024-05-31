"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import React from 'react'

export default function Chatbot()  {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, user: true }]);
      setInput('');
      setTimeout(() => {
        setMessages([...messages, { text: input, user: true }, { text: "This is a bot response", user: false }]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-grow p-4 overflow-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`my-2 p-2 rounded-lg
           ${msg.user ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex p-4 border-t border-gray-200">
        <input
          type="text"
          className="flex-grow p-2 border border-gray-300 rounded-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
          onClick={handleSend}
        >
          Send
        </Button>
      </div>
    </div>
  );
};


