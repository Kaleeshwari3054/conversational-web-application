import { createContext, useContext, useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "./AuthContext";
import { useBooking } from "./BookingContext";
import '../styles/chatcontext.css'

const ChatContext = createContext();

export function useChat() {
  return useContext(ChatContext);
}

export function ChatProvider({ children }) {
  const { currentUser } = useAuth();
  const { createReservation, hotels } = useBooking();
  const [messages, setMessages] = useState([]);
  const [chatStep, setChatStep] = useState("initial");
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "",
    date: "",
    hotel: null,
  });

  const timeoutRef = useRef(null);

  // Reset chat when user changes
  useEffect(() => {
    if (currentUser) {
      resetChat();
    }
  }, [currentUser]);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const resetChat = () => {
    setMessages([]);
    setChatStep("initial");
    setBookingData({
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      phone: "",
      guests: "",
      date: "",
      hotel: null,
    });

    // Add welcome message
    addBotMessage({
      text: "Welcome to Botonic Booking Platform! First of all, I would need your name and email.",
      showForm: true,
      formType: "initial",
    });
  };

  const addMessage = (message) => {
    setMessages((prev) => [
      ...prev,
      { id: uuidv4(), timestamp: new Date(), ...message },
    ]);
  };

  const addUserMessage = (text, data = null) => {
    addMessage({ sender: "user", text, data });
  };

  const addBotMessage = (message) => {
    setIsTyping(true);

    // Clear any existing timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Add typing delay for realism
    timeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      addMessage({ sender: "bot", ...message });
    }, 1000);
  };

  const handleInitialSubmit = (data) => {
    setBookingData((prev) => ({ ...prev, ...data }));
    addUserMessage(`My name is ${data.name} and my email is ${data.email}`);

    setChatStep("options");
    addBotMessage({
      text: `Hi ${data.name}, I'm your virtual assistant of Botonic Booking Platform. I will help you manage your hotel reservations and much more.`,
    });

    setTimeout(() => {
      addBotMessage({
        text: "Select an option:",
        options: [
          { text: "Book a hotel", value: "book" ,},
          { text: "Check your reservations", value: "check" },
        ],
        classname: "highlight-text",
      });
    }, 1500);
  };

  const handleOptionSelect = (option) => {
    addUserMessage(option.text);

    if (option.value === "book") {
      setChatStep("select_hotel");
      addBotMessage({
        text: "Select a hotel among these options:",
        hotels: hotels,
      });
    } else if (option.value === "check") {
      setChatStep("view_reservations");
      addBotMessage({
        text: "You can see your reservations in the dashboard section.",
        action: "view_reservations",
      });
    }
  };

  // const selectHotel = (hotel) => {
  //   setBookingData(prev => ({ ...prev, hotel }));
  //   addUserMessage(`I would like to book ${hotel.name}`);

  //   setChatStep('booking_details');
  //   addBotMessage({
  //     text: `${bookingData.name}, you have selected ${hotel.name}. To confirm the reservation, we would need some more information.`,
  //     showForm: true,
  //     formType: 'booking_details'
  //   });
  // };
  const selectHotel = (hotel) => {
    const userName = bookingData.name || currentUser?.name || "Guest"; // safer fallback
    setBookingData((prev) => ({ ...prev, hotel }));
    addUserMessage(`I would like to book ${hotel.name}`);

    setChatStep("booking_details");
    addBotMessage({
      text: `${userName}, you have selected ${hotel.name}. To confirm the reservation, we would need some more information.`,
      showForm: true,
      formType: "booking_details",
    });
  };

  const completeBooking = (data) => {
    const updatedBookingData = { ...bookingData, ...data };
    setBookingData(updatedBookingData);

    addUserMessage("Here are my booking details", {
      phone: data.phone,
      guests: data.guests,
      date: data.date,
    });

    // Create the reservation in our system
    createReservation({
      ...updatedBookingData,
      id: uuidv4(),
      created: new Date(),
    });

    setChatStep("booking_confirmed");
    addBotMessage({
      text: `Reservation completed:\nName: ${updatedBookingData.name}\nEmail: ${updatedBookingData.email}\nPhone: ${updatedBookingData.phone}\nGuests: ${updatedBookingData.guests}\nDate: ${updatedBookingData.date}`,
      confirmation: true,
    });

    setTimeout(() => {
      addBotMessage({
        text: "If you want to see your reservation, click on the menu on the top left corner and select 'Your Reservations'.",
      });
    }, 1500);

    setTimeout(() => {
      addBotMessage({
        text: "Is there anything else I can help you with?",
        options: [
          { text: "Yes", value: "continue" },
          { text: "No", value: "end" },
        ],
      });
    }, 3000);
  };

  const handleContinue = (option) => {
    addUserMessage(option.text);

    if (option.value === "continue") {
      setChatStep("options");
      addBotMessage({
        text: "What would you like to do next?",
        options: [
          { text: "Book another hotel", value: "book" },
          { text: "Check your reservations", value: "check" },
          { text: "End conversation", value: "end" },
        ],
      });
    } else if (option.value === "end") {
      addBotMessage({
        text: "Thank you for using Botonic Booking Platform. Have a great day!",
      });
      setChatStep("ended");
    }
  };

  const value = {
    messages,
    isTyping,
    chatStep,
    bookingData,
    isChatOpen,
    toggleChat,
    addUserMessage,
    addBotMessage,
    handleInitialSubmit,
    handleOptionSelect,
    selectHotel,
    completeBooking,
    handleContinue,
    resetChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
