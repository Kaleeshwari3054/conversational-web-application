// import { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Load user from localStorage on initial render
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setCurrentUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);

//   // For demonstration purposes, this is a mock login function
//   // In a real application, this would call an API endpoint
//   const login = (email, password) => {
//     // Mock authentication
//     const user = {
//       id: '1',
//       name: email.split('@')[0],
//       email,
//       // In a real app, never store passwords in state
//     };
    
//     // Store user in localStorage for persistence
//     localStorage.setItem('user', JSON.stringify(user));
//     setCurrentUser(user);
//     return Promise.resolve(user);
//   };

//   const register = (name, email, password) => {
//     // Mock registration
//     const user = {
//       id: Date.now().toString(),
//       name,
//       email,
//       // In a real app, never store passwords in state
//     };
    
//     // Store user in localStorage for persistence
//     localStorage.setItem('user', JSON.stringify(user));
//     setCurrentUser(user);
//     return Promise.resolve(user);
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     setCurrentUser(null);
//     return Promise.resolve();
//   };

//   const value = {
//     currentUser,
//     login,
//     register,
//     logout,
//     loading
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }






import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = async (name, email, password) => {
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      localStorage.setItem('user', JSON.stringify(data.user || { name, email }));
      setCurrentUser(data.user || { name, email });
      return data.user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('user', JSON.stringify(data.user));
      setCurrentUser(data.user);
      return data.user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    return Promise.resolve();
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
