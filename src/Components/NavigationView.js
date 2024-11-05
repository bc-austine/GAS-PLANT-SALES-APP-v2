import React from 'react';
import { Nav } from '@fluentui/react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const StyledNav = styled(Nav)`
    width: 250px;
    height: 100vh;
    background-color: #f3f2f1; // Adjust color as needed
`;

const NavigationView = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    const navLinkGroups = [
        {
            links: [
                { key: 'dashboard', name: 'Dashboard', url: '/dashboard' },
                { key: 'sales', name: 'Sales', url: '/sales' },
                { key: 'stocks', name: 'Stocks', url: '/stocks' },
                { key: 'prices', name: 'Prices', url: '/prices' },
                { key: 'products', name: 'Products', url: '/products' },
                { key: 'dispensers', name: 'Dispensers', url: '/dispensers' },
                { key: 'users', name: 'Users', url: '/users' },
            ],
        },
    ];

    return (
        <StyledNav
            groups={navLinkGroups}
            selectedKey={location.pathname.replace('/', '') || 'dashboard'}
            onLinkClick={(_, item) => {
                if (item) {
                    navigate(item.url);
                }
            }}
        >
            {user ? (
                <div>
                    <div>Hello, {user.name}</div>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <button onClick={() => navigate('/')}>Login</button>
            )}
        </StyledNav>
    );
};

export default NavigationView;
