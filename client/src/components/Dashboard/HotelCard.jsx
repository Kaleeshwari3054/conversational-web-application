import { Card, Button, Badge } from 'react-bootstrap';
import { FaStar, FaDollarSign } from 'react-icons/fa';

const HotelCard = ({ hotel, onBookNow }) => {
  return (
    <Card className="h-100 shadow-sm hotel-card">
      <Card.Img 
        variant="top" 
        src={hotel.image} 
        // alt={hotel.name} 
        className="hotel-image"
      />
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title>{hotel.name}</Card.Title>
          <div className="star-rating">
            {[...Array(hotel.rating)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
        </div>
        <Card.Text>{hotel.description}</Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="hotel-price">
            <FaDollarSign />{hotel.price} <small className="text-muted">/ night</small>
          </span>
          <Button 
            variant="primary" 
            className="btn-booking"
            onClick={onBookNow}
          >
            Book Now
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default HotelCard;


// import HotelCard from './HotelCard';
// import hotels from '../../data/hotelData'
// import { Container, Row, Col } from 'react-bootstrap';

// const HotelList = () => {
//   const handleBookNow = (hotel) => {
//     alert(`Booking hotel: ${hotel.name}`);
//   };

//   return (
//     <Container className="mt-4">
//       <Row>
//         {hotels.map(hotel => (
//           <Col key={hotel.id} sm={12} md={6} lg={4} className="mb-4">
//             <HotelCard 
//               hotel={hotel} 
//               onBookNow={() => handleBookNow(hotel)} 
//             />
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default HotelList;
