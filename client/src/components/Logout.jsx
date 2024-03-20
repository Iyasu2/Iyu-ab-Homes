import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('token');

        // Navigate to the login page
        navigate('/login');
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default Logout;