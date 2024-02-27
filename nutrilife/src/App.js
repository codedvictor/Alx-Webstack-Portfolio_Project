import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home/Home';
import SymptomChecker from './components/SymptomChecker/SymptomChecker';
import SymptomDiagnosis from './components/SymptomDiagnosis/SymptomDiagnosis';

function App() {
  return (
    
      <div className="App">
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/symptom-diagnosis" element={<SymptomDiagnosis />} />
        </Routes>
        
      </div>
  
  );
}

export default App;
