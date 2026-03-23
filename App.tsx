import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Hero from './components/Hero';
import About from './components/About';
import Session from './components/Session';
import Session1 from './components/Session1';
import Session2 from './components/Session2';
import Session3 from './components/Session3';
import ManagerCopilot from './components/ManagerCopilot';
import { SteeringWheelPage } from './components/steeringwheel/SteeringWheelPage';
import Resources from './components/Resources';
import ThirtyDays from './components/thirtydays/ThirtyDays';

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
        <Route path="/session1" element={<Session1 />} />
        <Route path="/session2" element={<Session2 />} />
        <Route path="/session3" element={<Session3 />} />
        <Route path="/session4" element={<Session />} />
        <Route path="/managercopilot" element={<ManagerCopilot />} />
        <Route path="/steeringwheel" element={<SteeringWheelPage />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/30days" element={<ThirtyDays />} />
      </Routes>
      <Analytics />
    </div>
  );
};

export default App;
