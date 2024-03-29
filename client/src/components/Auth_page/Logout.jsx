import React from 'react';
import { useLogout } from '../../hooks/useLogout';

const Logout = () => {
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
    // You can optionally redirect the user to the login page after logout
    window.location.href = '/login';
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;