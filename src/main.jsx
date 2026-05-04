import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './globals.css';
import LandingPage from './pages/LandingPage';
import DentistListing from './pages/DentistListing';
import DentistProfile from './pages/DentistProfile';
import JoinAsPartner from './pages/JoinAsPartner';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dentists" element={<DentistListing />} />
        <Route path="/dentists/:id" element={<DentistProfile />} />
        <Route path="/join" element={<JoinAsPartner />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
