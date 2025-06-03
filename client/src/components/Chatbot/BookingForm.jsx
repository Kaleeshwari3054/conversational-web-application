import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const BookingForm = ({ onSubmit }) => {
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('');
  const [date, setDate] = useState('');
  const [validated, setValidated] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity()) {
      onSubmit({ phone, guests, date });
    } else {
      e.stopPropagation();
    }
    
    setValidated(true);
  };
  
  return (
    <div className="p-3 bg-light rounded mt-3">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone *</Form.Label>
          <Form.Control
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide your phone number.
          </Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="guests">
          <Form.Label>Guests *</Form.Label>
          <Form.Control
            type="number"
            min="1"
            required
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide the number of guests.
          </Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="date">
          <Form.Label>Date *</Form.Label>
          <Form.Control
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please select a date.
          </Form.Control.Feedback>
        </Form.Group>
        
        <div className="d-flex justify-content-end">
          <Button variant="primary" type="submit">
            COMPLETE
          </Button>
        </div>
        
        <p className="text-muted mt-2 small">
          We will not store the fulfilled information. You can fake the data.
        </p>
      </Form>
    </div>
  );
};

export default BookingForm;