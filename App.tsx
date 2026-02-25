import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Hero from './components/Hero';
import About from './components/About';
import Session from './components/Session';
import { SteeringWheelPage } from './components/steeringwheel/SteeringWheelPage';

const App: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-rose-200 selection:text-rose-900">
      <Routes>
        <Route path="/" element={
          <main>
            <div id="home">
              <Hero />
            </div>
          </main>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/session4" element={<Session />} />
        <Route path="/steeringwheel" element={<SteeringWheelPage />} />
      </Routes>
      <Analytics />
    </div>
  );
};

export default App;
