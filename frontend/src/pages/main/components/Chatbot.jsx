import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Loader } from 'lucide-react';

const ChatbotContainer = ({ children, isOpen, onClose }) => (
  <div className={`fixed bottom-5 right-5 w-96 bg-white shadow-lg rounded-lg flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'h-[40vw]' : 'h-0'}`} style={{ width: '30vw', zIndex:'50'}}>
    {isOpen && children}
  </div>
);

const ChatbotHeader = ({ title, onClose }) => (
  <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
    <span className="text-lg font-semibold">{title}</span>
    <button onClick={onClose} className="text-white hover:text-gray-200">
      <X size={24} />
    </button>
  </div>
);

const ChatbotMessages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex-1 p-3 overflow-y-auto">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-2 ${
            message.sender === 'user' ? 'text-right' : 'text-left'
          }`}
        >
          <span
            className={`inline-block p-2 rounded-lg ${
              message.sender === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-black'
            }`}
          >
            {message.text}
          </span>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

const ChatbotInput = ({ input, setInput, sendMessage, isLoading }) => (
  <div className="flex p-3 border-t border-gray-200">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
      className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Type a message..."
      disabled={isLoading}
    />
    <button
      onClick={sendMessage}
      className={`px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={isLoading}
    >
      {isLoading ? <Loader className="animate-spin" size={24} /> : 'Send'}
    </button>
  </div>
);

const StarterQuestions = ({ onSelect }) => {
  const questions = [
    "How can I start investing?",
    "What's the best way to save money?",
    "How do I create a budget?"
  ];

  return (
    <div className="p-3 border-t border-gray-200">
      <p className="text-sm text-gray-600 mb-2">Get started with these questions:</p>
      {questions.map((question, index) => (
        <button
          key={index}
          onClick={() => onSelect(question)}
          className="w-full text-left p-2 mb-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
        >
          {question}
        </button>
      ))}
    </div>
  );
};

const ChatbotIcon = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-5 right-5 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
  >
    <MessageCircle size={24} />
  </button>
);

const Alert = ({ title, description }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <strong className="font-bold">{title}</strong>
    <span className="block sm:inline"> {description}</span>
  </div>
);

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    // Simulate getting user name from somewhere
    setUserName('John');
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ text: `Hey ${userName}, welcome to MoneyOverflow! How can I assist you today?`, sender: 'bot' }]);
    }
  }, [isOpen, userName]);

  const sendMessage = async (text = input) => {
    if (text.trim() === '') return;
    
    const newMessage = { text, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `You are a concise and helpful AI assistant on MoneyOverflow, a platform dedicated to financial literacy and investment education.
        
        A user asks: "${text}"
        
        Reply with clear and accurate advice related to personal finance, investing, saving, or budgeting. If the question is off-topic, gently steer the conversation back to finance-related subjects.
        
        Keep the response under 6 lines and avoid any formatting (like bold, italics, or emojis).Reply in such a manner that can be directly passed to chatbot as reply.`
                  }
                ]
              }
            ]
          }),
        });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const botReply = data.candidates[0].content.parts[0].text;
      
      setMessages(prevMessages => [
        ...prevMessages,
        { text: botReply, sender: 'bot' }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setError(`Failed to get response from the chatbot: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && <ChatbotIcon onClick={() => setIsOpen(true)} />}
      <ChatbotContainer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ChatbotHeader title="MoneyOverflow AI" onClose={() => setIsOpen(false)} />
        <ChatbotMessages messages={messages} />
        {messages.length === 1 && <StarterQuestions onSelect={sendMessage} />}
        <ChatbotInput input={input} setInput={setInput} sendMessage={() => sendMessage()} isLoading={isLoading} />
        {error && (
          <Alert 
            title="Error" 
            description={error}
          />
        )}
      </ChatbotContainer>
    </>
  );
};

export default Chatbot;
