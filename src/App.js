// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} /> {/* Public route */}
          <Route path="/login" element={<Login />} /> {/* Public route */}
          <Route path="/home/*" element={<Home />} /> {/* Protected route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
