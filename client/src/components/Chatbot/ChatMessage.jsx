import { Button, Card, Row, Col } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

const ChatMessage = ({ message, onOptionSelect, onHotelSelect, onContinue }) => {
  const { sender, text, options, hotels, confirmation, data, action } = message;
  
  // Format for displaying user data (if provided)
  const renderUserData = () => {
    if (!data) return null;
    
    return (
      <div className="user-data mt-2">
        {Object.entries(data).map(([key, value]) => (
          <p key={key} className="mb-1"><strong>{key}:</strong> {value}</p>
        ))}
      </div>
    );
  };
  
  // Render options buttons if provided
  const renderOptions = () => {
    if (!options || !options.length) return null;
    
    return (
      <div className="message-options">
        {options.map((option, idx) => (
          <Button 
            key={idx}
            variant="outline-primary" 
            size="sm" 
            onClick={() => onOptionSelect(option)}
            className="option-button"
          >
            {option.text}
          </Button>
        ))}
      </div>
    );
  };
  
  // Render hotel options if provided
  const renderHotels = () => {
    if (!hotels || !hotels.length) return null;
    
    return (
      <div className="options-grid mt-3">
        {hotels.map(hotel => (
          <Card key={hotel.id} className="option-card">
            <Card.Img 
              variant="top" 
              src={hotel.image} 
              alt={hotel.name}
              style={{ height: '120px', objectFit: 'cover' }}
            />
            <Card.Body className="p-3">
              <Card.Title className="fs-6">{hotel.name}</Card.Title>
              <div className="star-rating mb-2">
                {[...Array(hotel.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onHotelSelect(hotel)}
              >
                Book
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  };

  // Render confirmation display
  const renderConfirmation = () => {
    if (!confirmation) return null;
    
    return (
      <div className="bg-success-subtle p-3 mt-2 rounded">
        <p className="mb-0 fw-bold">Booking Confirmed!</p>
      </div>
    );
  };
  
  return (
    <div className={`message ${sender === 'user' ? 'user-message' : 'bot-message'}`}>
      {text}
      
      {renderUserData()}
      {renderOptions()}
      {renderHotels()}
      {renderConfirmation()}
      
      {/* Continue options for after booking */}
      {options && options.some(option => option.value === 'continue' || option.value === 'end') && (
        <div className="message-options">
          {options.map((option, idx) => (
            <Button 
              key={idx}
              variant="outline-primary" 
              size="sm" 
              onClick={() => onContinue(option)}
              className="option-button"
            >
              {option.text}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;