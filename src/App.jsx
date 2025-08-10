import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './auth/Register';
import Login from './auth/Login';

const App = () => {
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          if (
            latitude >= 12.8 && latitude <= 13.2 &&
            longitude >= 77.4 && longitude <= 77.8
          ) {
            setAllowed(true);
          } else {
            setAllowed(false);
          }
        },
        () => setAllowed(false)
      );
    } else {
      setAllowed(false);
    }
  }, []);

  const CenteredScreen = ({ text, subtext, emoji }) => (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      backgroundColor: '#f8f9fa',
      fontFamily: 'sans-serif',
      padding: '20px'
    }}>
      <div style={{ fontSize: '4rem' }}>{emoji}</div>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>{text}</h1>
      {subtext && <p style={{ fontSize: '1rem', color: '#6c757d' }}>{subtext}</p>}
    </div>
  );

  if (allowed === null) {
    return <CenteredScreen emoji="📍" text="Checking location..." subtext="Please allow location access to continue" />;
  }

  if (!allowed) {
    return <CenteredScreen emoji="🚫" text="Not available for your location" subtext="This service is currently available only in Bangalore" />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
