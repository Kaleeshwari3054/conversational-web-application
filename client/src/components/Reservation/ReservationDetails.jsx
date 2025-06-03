import { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooking } from '../../contexts/BookingContext';
import { FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaHotel, FaStar, FaArrowLeft } from 'react-icons/fa';

const ReservationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getReservation, cancelReservation } = useBooking();
  const [reservation, setReservation] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const res = getReservation(id);
    if (res) {
      setReservation(res);
    } else {
      setError('Reservation not found');
    }
  }, [id, getReservation]);

  const handleCancel = () => {
    cancelReservation(id);
    navigate('/dashboard');
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="outline-primary" onClick={handleBack}>
          <FaArrowLeft className="me-2" /> Back to Dashboard
        </Button>
      </Container>
    );
  }

  if (!reservation) {
    return (
      <Container className="mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Button variant="outline-primary" className="mb-4" onClick={handleBack}>
        <FaArrowLeft className="me-2" /> Back to Dashboard
      </Button>
      
      <Row>
        <Col lg={8} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h3 className="mb-0">Reservation Details</h3>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <div className="mb-4">
                    <h5>Guest Information</h5>
                    <p className="mb-2">
                      <FaUser className="me-2 text-primary" />
                      <strong>Name:</strong> {reservation.name}
                    </p>
                    <p className="mb-2">
                      <FaEnvelope className="me-2 text-primary" />
                      <strong>Email:</strong> {reservation.email}
                    </p>
                    <p className="mb-2">
                      <FaPhone className="me-2 text-primary" />
                      <strong>Phone:</strong> {reservation.phone}
                    </p>
                  </div>
                  
                  <div>
                    <h5>Booking Information</h5>
                    <p className="mb-2">
                      <FaCalendarAlt className="me-2 text-primary" />
                      <strong>Date:</strong> {reservation.date}
                    </p>
                    <p className="mb-2">
                      <FaUser className="me-2 text-primary" />
                      <strong>Guests:</strong> {reservation.guests}
                    </p>
                    <p className="mb-2">
                      <strong>Booking ID:</strong> <code>{reservation.id.substring(0, 8)}</code>
                    </p>
                  </div>
                </Col>
                
                <Col md={6}>
                  <div className="mb-4">
                    <h5>Hotel Information</h5>
                    <p className="mb-2">
                      <FaHotel className="me-2 text-primary" />
                      <strong>Name:</strong> {reservation.hotel.name}
                    </p>
                    <p className="mb-2">
                      <strong>Rating:</strong> 
                      <span className="ms-2 star-rating">
                        {[...Array(reservation.hotel.rating)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </span>
                    </p>
                    <p className="mb-2">
                      <strong>Price:</strong> ${reservation.hotel.price}/night
                    </p>
                  </div>
                  
                  <Card.Img 
                    src={reservation.hotel.image} 
                    alt={reservation.hotel.name} 
                    style={{ borderRadius: '8px' }}
                  />
                </Col>
              </Row>
              
              <div className="mt-4 d-flex justify-content-end">
                <Button 
                  variant="danger" 
                  onClick={handleCancel}
                >
                  Cancel Reservation
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="shadow-sm booking-summary">
            <Card.Body>
              <h4 className="mb-3">Booking Summary</h4>
              <div className="d-flex justify-content-between mb-2">
                <span>Room Rate:</span>
                <span>${reservation.hotel.price}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Taxes & Fees:</span>
                <span>${Math.round(reservation.hotel.price * 0.12)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span>${Math.round(reservation.hotel.price * 1.12)}</span>
              </div>
              
              <div className="mt-4">
                <h5>Policies</h5>
                <p className="small text-muted mb-1">
                  • Free cancellation up to 24 hours before check-in
                </p>
                <p className="small text-muted mb-1">
                  • Check-in time: 3:00 PM
                </p>
                <p className="small text-muted mb-0">
                  • Check-out time: 11:00 AM
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ReservationDetails;