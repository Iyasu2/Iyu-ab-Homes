import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { PropertiesContextProvider } from './context/PropertyContext'; // Import PropertiesContextProvider
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PropertiesContextProvider> {/* Wrap App with PropertiesContextProvider */}
        <App />
      </PropertiesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
