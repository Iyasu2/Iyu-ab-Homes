import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toastify
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer /> {/* Place ToastContainer at the top level */}
  </React.StrictMode>
);
