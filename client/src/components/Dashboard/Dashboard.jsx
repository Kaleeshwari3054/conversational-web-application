import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../../contexts/BookingContext";
import { useChat } from "../../contexts/ChatContext";
import {
  FaCalendarAlt,
  FaUser,
  FaHotel,
  FaStar,
  FaInfoCircle,
} from "react-icons/fa";
import HotelCard from "./HotelCard";

const Dashboard = () => {
  const { hotels, reservations, cancelReservation } = useBooking();
  const { toggleChat, resetChat } = useChat();
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/reservations/${id}`);
  };

  const handleStartBooking = () => {
    resetChat();
    toggleChat();
  };

  const formatDate = (dateStr) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateStr));
  };

  return (
    <Container className="dashboard-container">
      <section>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="section-title">Your Reservations</h2>
          <Button variant="primary" onClick={handleStartBooking}>
            <FaCalendarAlt className="me-2" /> Book a Room
          </Button>
        </div>

        {reservations.length === 0 ? (
          <Card className="text-center p-5 mb-5">
            <Card.Body>
              <FaHotel
                className="mb-3"
                style={{ fontSize: "3rem", color: "#6c757d" }}
              />
              <Card.Title>No Reservations Yet</Card.Title>
              <Card.Text>
                You do not have any hotel reservations. Start by booking a room!
              </Card.Text>
              <Button variant="primary" onClick={handleStartBooking}>
                Book Now
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <Row>
            {[...reservations]
              .sort((a, b) => new Date(b.created) - new Date(a.created))
              .map((reservation) => (
                <Col md={6} lg={4} key={reservation._id} className="mb-4">
                  <Card className="h-100 shadow-sm hotel-card reservation-card">
                    <Card.Img
                      variant="top"
                      src={
                        reservation.hotel?.image ||
                        "https://source.unsplash.com/600x400/?hotel"
                      }
                      alt={reservation.hotel?.name || "Hotel"}
                      className="hotel-image"
                    />
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <Card.Title className="text-truncate">
                          {reservation.hotel?.name || "Unknown Hotel"}
                        </Card.Title>
                        <div className="star-rating text-warning">
                          {[...Array(reservation.hotel?.rating || 0)].map(
                            (_, i) => (
                              <FaStar key={i} />
                            )
                          )}
                        </div>
                      </div>
                      <Card.Text className="text-muted mb-3">
                        <small>Booked on {formatDate(reservation.created)}</small>
                      </Card.Text>
                      <div className="mb-3">
                        <p className="mb-1">
                          <FaCalendarAlt className="me-2" />
                          <strong>Date:</strong> {reservation.date}
                        </p>
                        <p className="mb-1">
                          <FaUser className="me-2" />
                          <strong>Guests:</strong> {reservation.guests}
                        </p>
                      </div>
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-between bg-white">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleViewDetails(reservation._id)}
                      >
                        <FaInfoCircle className="me-1" /> Details
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to cancel this reservation?"
                            )
                          ) {
                            cancelReservation(reservation._id);
                          }
                        }}
                      >
                        Cancel
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
          </Row>
        )}
      </section>

      <section className="mt-5">
        <h2 className="section-title">Available Hotels</h2>
        <Row>
          {hotels.map((hotel) => (
            <Col md={6} lg={4} key={hotel.id} className="mb-4">
              <HotelCard hotel={hotel} onBookNow={handleStartBooking} />
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
};

export default Dashboard;
