import React, { useState } from 'react';
import { TextField, PrimaryButton, Dropdown } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import styled from 'styled-components';

const LoginWrapper = styled.div`
  padding: 20px;
  max-width: 400px;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const LoginTitle = styled.h2`
  text-align: center;
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const roleOptions = [
    { key: 'admin', text: 'Admin' },
    { key: 'supervisor', text: 'Supervisor' },
    { key: 'salesOfficer', text: 'Sales Officer' },
  ];

  const handleLogin = () => {
    if (username && role) {
      login(username, role);  // Login with username and role
      navigate('/home/dashboard');  // Redirect to the dashboard page
    } else {
      alert('Please enter both username and select a role.');
    }
  };

  return (
    <LoginWrapper>
      <LoginTitle>Login</LoginTitle>
      <TextField
        label="Username"
        value={username}
        onChange={(e, newValue) => setUsername(newValue)}
        required
        style={{ marginBottom: '10px' }}
      />
      <Dropdown
        label="Role"
        selectedKey={role}
        onChange={(e, option) => setRole(option.key)}
        options={roleOptions}
        required
        style={{ marginBottom: '20px' }}
      />
      <PrimaryButton onClick={handleLogin}>Login</PrimaryButton>
    </LoginWrapper>
  );
};

export default Login;
