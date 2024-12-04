// src/components/ChatbotModal.js
import React, { useState } from 'react';
import axios from 'axios';
import './styles_chat.css';

const ChatbotModal = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '안녕하세요! 무엇을 도와드릴까요?' },
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: inputText }];
    setMessages(newMessages);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        query: inputText,
      });

      setMessages([
        ...newMessages,
        { sender: 'bot', text: response.data.response },
      ]);
    } catch (error) {
      console.error('API 요청 에러:', error);
      setMessages([
        ...newMessages,
        { sender: 'bot', text: '에러가 발생했습니다. 다시 시도해주세요.' },
      ]);
    }

    setInputText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chatbot-modal-overlay" onClick={onClose}>
      <div className="chatbot-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="chatbot-close-button" onClick={onClose}>
          &times;
        </button>
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chatbot-message ${
                msg.sender === 'user' ? 'user-message' : 'bot-message'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chatbot-input-container">
          <input
            type="text"
            className="chatbot-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="메시지를 입력하세요..."
          />
          <button className="chatbot-send-button" onClick={sendMessage}>
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;
