import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home/Home';
import SymptomChecker from './components/SymptomChecker/SymptomChecker';

function App() {
  return (
    
      <div className="App">
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
        </Routes>
        
      </div>
  
  );
}

export default App;
