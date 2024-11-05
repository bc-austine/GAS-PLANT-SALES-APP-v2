// src/Components/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

// This component will protect routes by checking if the user is authenticated
const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();  // Access user from context

  // If the user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return element; // Render the protected page if the user is authenticated
};

export default ProtectedRoute;
