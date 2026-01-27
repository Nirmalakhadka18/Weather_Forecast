import React, { useEffect } from 'react';
import Home from './pages/Home';
import './index.css';

const App = () => {
  useEffect(() => {
    // Ensure proper viewport scaling on mobile
    const viewport = document.querySelector("meta[name=viewport]");
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
  }, []);

  return (
    <div className="App min-h-screen overflow-x-hidden">
      <Home />
    </div>
  );
};

export default App;