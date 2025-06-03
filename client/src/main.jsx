import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import { BookingProvider } from './contexts/BookingContext';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);