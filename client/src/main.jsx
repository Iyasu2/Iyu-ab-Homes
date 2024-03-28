import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './context/AuthContext';
import { PropertiesContextProvider } from './context/PropertyContext'; // Import PropertiesContextProvider
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer /> {/* Place the ToastContainer here */}
    <AuthContextProvider>
      <PropertiesContextProvider> {/* Wrap App with PropertiesContextProvider */}
        <App />
      </PropertiesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
