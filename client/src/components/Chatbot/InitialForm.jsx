import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const InitialForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [validated, setValidated] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity()) {
      onSubmit({ name, email });
    } else {
      e.stopPropagation();
    }
    
    setValidated(true);
  };
  
  return (
    <div className="p-3 bg-light rounded mt-3">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name *</Form.Label>
          <Form.Control
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide your name.
          </Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>
        
        <div className="d-flex justify-content-end">
          <Button variant="primary" type="submit">
            START
          </Button>
        </div>
        
        <p className="text-muted mt-2 small">
          We will not store the fulfilled information. You can fake the data.
        </p>
      </Form>
    </div>
  );
};

export default InitialForm;