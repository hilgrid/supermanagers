import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Session from './components/Session';
import Session1 from './components/Session1';
import Session2 from './components/Session2';
import Session3 from './components/Session3';
import ManagerCopilot from './components/ManagerCopilot';
import { SteeringWheelPage } from './components/steeringwheel/SteeringWheelPage';
import Resources from './components/Resources';
import Supermanager from './components/Supermanager';
import ThinkingPartner from './components/ThinkingPartner';
import DecidingWhatToBuild from './components/DecidingWhatToBuild';
import PromptLibrary from './components/PromptLibrary';
import BuildEvaluator from './components/BuildEvaluator';
import BuildCoach from './components/BuildCoach';
import PasswordGate from './components/PasswordGate';

const App: React.FC = () => {
  return (
    <PasswordGate>
    <div className="min-h-screen selection:bg-rose-200 selection:text-rose-900">
      <Routes>
        <Route path="/" element={<Supermanager />} />
        <Route path="/session1" element={<Session1 />} />
        <Route path="/session2" element={<Session2 />} />
        <Route path="/session3" element={<Session3 />} />
        <Route path="/session4" element={<Session />} />
        <Route path="/managercopilot" element={<ManagerCopilot />} />
        <Route path="/steeringwheel" element={<SteeringWheelPage />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/thinking-partner" element={<ThinkingPartner />} />
        <Route path="/deciding-what-to-build" element={<DecidingWhatToBuild />} />
        <Route path="/prompt-library" element={<PromptLibrary />} />
        <Route path="/build-evaluator" element={<BuildEvaluator />} />
        <Route path="/build-coach" element={<BuildCoach />} />
      </Routes>
      <Analytics />
    </div>
    </PasswordGate>
  );
};

export default App;
