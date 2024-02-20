// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [symptoms, setSymptoms] = useState([]);

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getSymptoms');
        setSymptoms(response.data);
      } catch (error) {
        console.error('Error fetching symptoms:', error);
      }
    };

    fetchSymptoms();
  }, []);

  return (
    <div>
      <h1>Nutrilife Frontend</h1>
      <h2>Symptoms:</h2>
      <ul>
        {symptoms.map((symptom, index) => (
          <li key={index}>{symptom.Name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
