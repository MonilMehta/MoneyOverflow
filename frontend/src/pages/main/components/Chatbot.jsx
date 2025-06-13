import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Loader } from 'lucide-react';

const ChatbotContainer = ({ children, isOpen, onClose }) => (
  <div className={`fixed bottom-5 right-5 bg-white shadow-2xl rounded-[24px] flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'h-[40vw]' : 'h-0'}`} style={{ width: '30vw', zIndex:'9999', fontFamily: 'Arial, sans-serif'}}>
    {/* Background Pattern */}
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-[24px] opacity-5">
      <div 
        className="w-full h-full"
        style={{
          backgroundImage: 'linear-gradient(45deg, #ff5722 25%, transparent 25%), linear-gradient(-45deg, #ff5722 25%, transparent 25%)',
          backgroundSize: '10px 10px',
          backgroundPosition: '0 0, 0 5px'
        }}
      />
    </div>
    {isOpen && children}
  </div>
);

const ChatbotHeader = ({ title, onClose }) => (
  <div className="bg-[#ff5722] text-white p-6 flex justify-between items-center relative z-10">
    <h3 className="text-2xl font-black uppercase tracking-wide" style={{ fontFamily: 'Arial, sans-serif' }}>
      {title}
    </h3>
    <button 
      onClick={onClose} 
      className="text-white hover:text-gray-200 transition-colors bg-transparent border-2 border-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-white hover:text-[#ff5722] transition-all duration-300"
    >
      <X size={20} />
    </button>
    
    {/* Decorative Elements */}
    <div className="absolute top-4 right-16 opacity-30">
      <div className="w-6 h-6 border-2 border-white rounded-full"></div>
    </div>
  </div>
);

const ChatbotMessages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex-1 p-6 overflow-y-auto relative z-10" style={{ fontFamily: 'Arial, sans-serif' }}>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-4 ${
            message.sender === 'user' ? 'text-right' : 'text-left'
          }`}
        >
          <div
            className={`inline-block p-4 rounded-xl max-w-[80%] font-medium text-base ${
              message.sender === 'user'
                ? 'bg-[#ff5722] text-white'
                : 'bg-gray-100 text-black border-2 border-gray-300'
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

const ChatbotInput = ({ input, setInput, sendMessage, isLoading }) => (
  <div className="p-6 border-t-2 border-[#ff5722] relative z-10" style={{ fontFamily: 'Arial, sans-serif' }}>
    <div className="flex space-x-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
        className="flex-1 p-4 border-2 border-gray-300 rounded-xl text-lg font-medium focus:border-[#ff5722] focus:outline-none transition-colors"
        placeholder="Ask me anything about finance..."
        disabled={isLoading}
      />
      <button
        onClick={sendMessage}
        className={`bg-[#ff5722] text-white px-6 py-4 rounded-xl text-base font-black uppercase tracking-wide hover:bg-[#e64a19] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? <Loader className="animate-spin" size={20} /> : 'SEND →'}
      </button>
    </div>
  </div>
);

const StarterQuestions = ({ onSelect }) => {
  const questions = [
    "How can I start investing?",
    "What's the best way to save money?",
    "How do I create a budget?"
  ];

  return (
    <div className="p-6 border-t-2 border-[#ff5722] relative z-10" style={{ fontFamily: 'Arial, sans-serif' }}>
      <p className="text-lg font-black text-[#000000] mb-4 uppercase tracking-wide">
        Popular Questions
      </p>
      <div className="space-y-3">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onSelect(question)}
            className="w-full text-left p-4 bg-gray-100 rounded-xl hover:bg-[#ff5722] hover:text-white transition-all duration-300 font-medium text-base border-2 border-transparent hover:border-[#ff5722] hover:-translate-y-1 hover:shadow-lg"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

const ChatbotIcon = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-5 right-5 p-6 bg-[#ff5722] text-white rounded-full shadow-2xl hover:bg-[#e64a19] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl "
    style={{ 
      fontFamily: 'Arial, sans-serif', 
      zIndex: '9999',
      textDecoration: 'none',
      borderBottom: 'none',
      outline: 'none'
    }}
  >
    <MessageCircle size={28} />
  </button>
);

const Alert = ({ title, description }) => (
  <div className="m-6 bg-red-100 border-2 border-red-400 text-red-700 px-6 py-4 rounded-xl relative font-medium" role="alert" style={{ fontFamily: 'Arial, sans-serif' }}>
    <strong className="font-black uppercase tracking-wide">{title}</strong>
    <span className="block mt-2">{description}</span>
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