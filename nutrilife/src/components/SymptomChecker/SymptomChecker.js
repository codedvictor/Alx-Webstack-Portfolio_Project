import React, { useState, useEffect } from "react";
import axios from "axios";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [language, setLanguage] = useState('en-gb');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch symptoms when the component mounts
    fetchSymptoms();
  }, []);

  const fetchSymptoms = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/symptoms', {
        params: {
          language: language,
          searchTerm: searchTerm,
          // Add other parameters as needed
        },
      });
      setSymptoms(response.data);
    } catch (error) {
      console.error('Error fetching symptoms:', error.message);
    }
    setLoading(false);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/symptoms', {
        params: {
          language: language,
          searchTerm: searchTerm,
          // Add other parameters as needed
        },
      });
      setSymptoms(response.data);
    } catch (error) {
      console.error('Error searching symptoms:', error.message);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Health App - Symptom Checker</h1>
        <label className="block mb-2">
          Language:
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en-gb">English</option>
            { /* Add other language options as needed */ }
          </select>
        </label>
        <input
          type="text"
          placeholder="fever, headache, ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          onClick={handleSearch}
          className="btn btn-primary rounded-pill"
          disabled={loading}
          >
            {loading ? "Loading..." : "Check Symptoms"} 
        </button>
        <div>
          {symptoms.map((symptom) => (
            <p key={symptom.Id}> {`ID: ${symptom.ID} - Name: ${symptom.Name}`}</p>
          ))}
      </div>
    </div>
  );
}

export default SymptomChecker;