import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline } from '@mui/material';
import AuthProvider from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom'; // Використовуйте точне ім'я "BrowserRouter"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {' '}
      {/* Переконайтеся, що BrowserRouter обертає App */}
      <AuthProvider>
        <CssBaseline />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
