import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const BookingContext = createContext();

export function useBooking() {
  return useContext(BookingContext);
}

export function BookingProvider({ children }) {
  const { currentUser } = useAuth();

  const [hotels] = useState([
    {
      id: "1",
      name: "Hotel Alabama",
      rating: 4,
      price: 120,
      image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
      description: "Experience luxury and comfort in the heart of Alabama.",
    },
    {
      id: "2",
      name: "Hotel Arizona",
      rating: 5,
      price: 180,
      image: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg",
      description: "A premium desert oasis with stunning views and amenities.",
    },
    {
      id: "3",
      name: "Hotel California",
      rating: 4,
      price: 150,
      image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
      description:
        "Enjoy the vibrant atmosphere and beautiful beaches of California.",
    },
    {
      id: "4",
      name: "Grand Plaza",
      rating: 5,
      price: 200,
      image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg",
      description: "Luxury at its finest with spectacular city views.",
    },
    {
      id: "5",
      name: "Ocean View Resort",
      rating: 4,
      price: 160,
      image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
      description: "Beautiful oceanfront property with direct beach access.",
    },
    {
      id: "6",
      name: "Mountain Retreat",
      rating: 3,
      price: 110,
      image: "https://mountainretreatkodai.in/wp-content/uploads/2023/03/mountain-retreat-kodai-01.jpg",
      description: "Peaceful getaway nestled in the mountains.",
    },
  ]);

  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (currentUser && currentUser._id) {
      fetchReservations(currentUser._id);
    } else {
      setReservations([]);
    }
  }, [currentUser]);

  const fetchReservations = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/reservations/user/${userId}`);
      setReservations(res.data);
    } catch (err) {
      console.error("Error fetching reservations:", err);
    }
  };

  // 🔧 Accept full booking data from ChatContext
  const createReservation = async (reservationData) => {
    if (!currentUser || !currentUser._id) return;

    const newReservation = {
      ...reservationData,
      userId: currentUser._id,
      created: new Date().toISOString(),
    };

    try {
      const res = await axios.post("http://localhost:5000/api/reservations", newReservation);
      setReservations((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.error("Error creating reservation:", err);
    }
  };

  const cancelReservation = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reservations/${id}`);
      setReservations((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Error cancelling reservation:", err);
    }
  };

  const getReservation = (id) => reservations.find((res) => res._id === id);

  const getAllReservations = () => reservations;

  const value = {
    hotels,
    reservations,
    createReservation,
    getReservation,
    getAllReservations,
    cancelReservation,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}
