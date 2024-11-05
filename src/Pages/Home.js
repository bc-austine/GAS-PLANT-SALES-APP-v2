// src/Pages/Home.js

import React from 'react';
import { Nav, DefaultButton } from '@fluentui/react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import styled from 'styled-components';
import Dashboard from './Dashboard'; // Import the Dashboard component
import SalesPage from './SalesPage'; // Import the SalesPage component
import StocksPage from './StocksPage'; // Import the StocksPage component
import PricesPage from './PricesPage'; // Import the PricesPage component
import ProductsPage from './ProductsPage'; // Import the ProductsPage component
import DispensersPage from './DispensersPage'; // Import the DispensersPage component
import UsersPage from './UsersPage'; // Import the UsersPage component
import ProtectedRoute from '../Components/ProtectedRoute'; // Import the ProtectedRoute component

const HomeWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #f4f4f4;
  padding: 20px;
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: #fff;
`;

const Header = styled.h1`
  margin-top: 0;
`;

const Home = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();  // Access user from context

  const menuItems = [
    { key: 'dashboard', text: 'Dashboard', link: '/home/dashboard' },
    { key: 'sales', text: 'Sales', link: '/home/sales' },
    { key: 'stocks', text: 'Stocks', link: '/home/stocks' },
    { key: 'prices', text: 'Prices', link: '/home/prices' },
    { key: 'products', text: 'Products', link: '/home/products' },
    { key: 'dispensers', text: 'Dispensers', link: '/home/dispensers' },
    { key: 'users', text: 'Users', link: '/home/users' },
  ];

  const handleLogout = () => {
    logout();  
    navigate('/login');  
  };

  return (
    <HomeWrapper>
      <Sidebar>
        <Header>App Menu</Header>
        <p>Welcome, {user.username} ({user.role})</p> {/* Display username and role */}
        <Nav
          selectedKey={window.location.pathname}
          groups={[
            {
              links: menuItems.map((item) => ({
                key: item.key,
                name: item.text,
                url: item.link,
                onClick: (ev) => {
                  ev.preventDefault();
                  navigate(item.link); // Navigate to the selected page
                },
              })),
            },
          ]}
        />
        <DefaultButton onClick={handleLogout}>Logout</DefaultButton>
      </Sidebar>
      <Content>
        <Routes>
          {/* Protect routes with ProtectedRoute */}
          <Route path="dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="sales" element={<ProtectedRoute element={<SalesPage />} />} />
          <Route path="stocks" element={<ProtectedRoute element={<StocksPage />} />} />
          <Route path="prices" element={<ProtectedRoute element={<PricesPage />} />} />
          <Route path="products" element={<ProtectedRoute element={<ProductsPage />} />} />
          <Route path="dispensers" element={<ProtectedRoute element={<DispensersPage />} />} />
          <Route path="users" element={<ProtectedRoute element={<UsersPage />} />} />
        </Routes>
      </Content>
    </HomeWrapper>
  );
};

export default Home;
