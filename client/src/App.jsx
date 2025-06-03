// import { useState, useEffect } from 'react';
// import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
// import { useAuth } from './contexts/AuthContext';
// import NavbarComponent from './components/Navigation/NavbarComponent';
// import Dashboard from './components/Dashboard/Dashboard';
// import Login from './components/Auth/Login';
// import Register from './components/Auth/Register';
// import ChatWidget from './components/Chatbot/ChatWidget';
// import ReservationDetails from './components/Reservation/ReservationDetails';
// import './App.css';

// function App() {
//   const { currentUser } = useAuth();

//   const ProtectedRoute = ({ children }) => {
//     if (!currentUser) {
//       return <Navigate to="/login" />;
//     }
//     return children;
//   };

//   return (
//     <div className="app-container">
//       <NavbarComponent />
      
//       <div className="content-container">
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/dashboard" element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           } />
//           <Route path="/reservations/:id" element={
//             <ProtectedRoute>
//               <ReservationDetails />
//             </ProtectedRoute>
//           } />
//           <Route path="/" element={<Navigate to={currentUser ? "/dashboard" : "/login"} />} />
//         </Routes>
//       </div>
      
//       <ChatWidget />
//     </div>
//   );
// }

// export default App;

import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import NavbarComponent from './components/Navigation/NavbarComponent';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ChatWidget from './components/Chatbot/ChatWidget';
import ReservationDetails from './components/Reservation/ReservationDetails';
import './App.css';

function App() {
  const { currentUser } = useAuth();

  const ProtectedRoute = ({children}) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className="app-container">
      <NavbarComponent />

      <div className="content-container">
        <Routes>
          <Route path="/" element={<Navigate to={currentUser ? '/dashboard' : '/login'} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reservations/:id"
            element={
              <ProtectedRoute>
                <ReservationDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      <ChatWidget />
    </div>
  );
}

export default App;
