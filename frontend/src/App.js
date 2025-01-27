import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Categorii from './components/Categorii';
import Produse from './components/Produse';
import Clienti from './components/Clienti';
import Vanzari from './components/Vanzari';
import Home from './components/Home';

function App() {
  const location = useLocation();
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/categorii':
        return 'Categorii';
      case '/produse':
        return 'Produse';
      case '/clienti':
        return 'Clienți';
      case '/vanzari':
        return 'Vânzări';
      default:
        return 'Home';
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {getPageTitle()}
          </Typography>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categorii" element={<Categorii />} />
        <Route path="/produse" element={<Produse />} />
        <Route path="/clienti" element={<Clienti />} />
        <Route path="/vanzari" element={<Vanzari />} />
      </Routes>
    </>
  );
}

export default function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}
