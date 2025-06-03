import { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaUserPlus } from 'react-icons/fa';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      return setError('Please fill in all fields');
    }
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    try {
      setError('');
      setLoading(true);
      await register(name, email, password);
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to create an account');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card className="shadow auth-container">
        <Card.Body>
          <h2 className="text-center mb-4 auth-title">
            <FaUserPlus className="me-2" />
            Register
          </h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          
            <Form.Group id="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            
            <Form.Group id="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            
            <Form.Group id="password-confirm" className="mb-4">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control 
                type="password" 
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            
            <Button 
              className="w-100 mb-3" 
              type="submit" 
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </Form>
          
          <div className="text-center mt-3">
            <p>
              Already have an account? <Link to="/login">Log In</Link>
            </p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;