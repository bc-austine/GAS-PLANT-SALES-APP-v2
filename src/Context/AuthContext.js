// src/Context/AuthContext.js

import React, { createContext, useContext, useState } from 'react';

// Create context for authentication
const AuthContext = createContext();

// Create a provider for the context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // `user` is initially null (not authenticated)

  const login = (userData) => {
    setUser(userData); // Set user data on successful login
  };

  const logout = () => {
    setUser(null); // Set user to null on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
