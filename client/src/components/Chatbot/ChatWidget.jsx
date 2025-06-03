import { useState, useEffect, useRef } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { useChat } from '../../contexts/ChatContext';
import ChatMessage from './ChatMessage';
import InitialForm from './InitialForm';
import BookingForm from './BookingForm';

const ChatWidget = () => {
  const { 
    messages, 
    isTyping, 
    chatStep,
    isChatOpen,
    toggleChat,
    addUserMessage, 
    handleInitialSubmit,
    handleOptionSelect,
    selectHotel,
    completeBooking,
    handleContinue
  } = useChat();
  
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addUserMessage(input);
      setInput('');
    }
  };

  if (!isChatOpen) {
    return (
      <div className="chat-widget">
        <div className="chat-toggle" onClick={toggleChat}>
          <FaComments size={24} />
        </div>
      </div>
    );
  }

  return (
    <div className="chat-widget">
      <div className="chat-window">
        <div className="chat-header">
          <h5 className="m-0">Botonic Assistant</h5>
          <Button variant="link" className="text-white p-0" onClick={toggleChat}>
            <FaTimes />
          </Button>
        </div>
        
        <div className="chat-body">
          {messages.map((message) => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              onOptionSelect={handleOptionSelect}
              onHotelSelect={selectHotel}
              onContinue={handleContinue}
            />
          ))}
          
          {isTyping && (
            <div className="bot-message message">
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          )}

          {chatStep === 'initial' && messages.some(m => m.showForm && m.formType === 'initial') && (
            <InitialForm onSubmit={handleInitialSubmit} />
          )}
          
          {chatStep === 'booking_details' && messages.some(m => m.showForm && m.formType === 'booking_details') && (
            <BookingForm onSubmit={completeBooking} />
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="chat-input">
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={chatStep === 'initial' || chatStep === 'booking_details'}
              />
              <Button 
                
                variant="primary" 
                type="submit" 
                disabled={!input.trim() || chatStep === 'initial' || chatStep === 'booking_details'}
              >
                <FaPaperPlane />
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;