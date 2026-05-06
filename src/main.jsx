import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './globals.css';
import LandingPage from './pages/LandingPage';
import DentistListing from './pages/DentistListing';
import DentistProfile from './pages/DentistProfile';
import JoinAsPartner from './pages/JoinAsPartner';
import ProListing from './pages/ProListing';
import ProProfile from './pages/ProProfile';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogListing from './pages/BlogListing';
import BlogDetail from './pages/BlogDetail';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogListing />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/dentists" element={<DentistListing />} />
        <Route path="/dentists/:id" element={<DentistProfile />} />
        <Route path="/join" element={<JoinAsPartner />} />
        <Route path="/:industry/:id" element={<ProProfile />} />
        <Route path="/:industry" element={<ProListing />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
