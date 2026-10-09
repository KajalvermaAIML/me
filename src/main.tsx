import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import LoginPage from './LoginPage';
import VaultPage from './VaultPage';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Splash / landing */}
        <Route path="/" element={<App />} />

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Vault (protected) */}
        <Route path="/vault" element={<VaultPage />} />

        {/* Catch-all → splash */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
