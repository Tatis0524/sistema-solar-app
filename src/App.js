// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import SolarSystemExplorer from './components/SolarSystemExplorer';
import QuizSection from './components/QuizGame';
import PuzzleSection from './components/PuzzleGame';
import DayNightSimulation from './components/DayNightSimulator';
import PlanetaDetalle from './components/PlanetaDetalle';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exploracion" element={<SolarSystemExplorer />} />
        <Route path="/planeta/:nombre" element={<PlanetaDetalle />} />
        <Route path="/quiz" element={<QuizSection />} />
        <Route path="/puzzle" element={<PuzzleSection />} />
        <Route path="/simulacion" element={<DayNightSimulation />} />
      </Routes>
    </Router>
  );
}

export default App;
