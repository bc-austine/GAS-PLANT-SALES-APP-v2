// src/Pages/Dashboard.js

import React from 'react';
import styled from 'styled-components';

const DashboardWrapper = styled.div`
  padding: 20px;
`;

const DashboardTitle = styled.h2`
  color: #333;
`;

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <DashboardTitle>Dashboard</DashboardTitle>
      <p>Welcome to the Dashboard! This is where you can view summary information and manage your app.</p>
      {/* Add any additional dashboard content here */}
    </DashboardWrapper>
  );
};

export default Dashboard;
