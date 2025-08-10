import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.jsx';
import { PlacesProvider } from './context/PlaceContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PlacesProvider>
      <App />

    </PlacesProvider>
  </StrictMode>
);
