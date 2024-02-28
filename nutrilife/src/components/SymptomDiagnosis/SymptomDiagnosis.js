import React, { useState, useEffect } from "react";
import axios from "axios";

const SymptomDiagnosis = () => {
  const [diagnosis, setDiagnosis] = useState([]);
  const [language, setLanguage] = useState('en-gb');
  const [symptoms, setsymptoms] = useState('');
  const [year_of_birth, setyear_of_birth] = useState('');
  const [gender, setgender] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch symptoms when the component mounts
    fetchDiagnosis();
  }, []);

  const fetchDiagnosis = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/diagnosis', {
        params: {
          language: language,
          symptoms: symptoms,
          year_of_birth: year_of_birth,
          gender: gender,
        },
      });
      setDiagnosis(response.data);
    } catch (error) {
      console.error('Error fetching symptoms:', error.message);
    }
    setLoading(false);
  };

  const handleDiagnosis = async () => {
    //event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/diagnosis', {
        params: {
          language: language,
          symptoms: symptoms,
          year_of_birth: year_of_birth,
          gender: gender,
        },
      });
      setDiagnosis(response.data);
    } catch (error) {
      console.error('Error searching symptoms:', error.message);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Health App - Symptom Diagnosis</h1>
        <label className="block mb-2">
          Language:
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en-gb">English</option>
            { /* Add other language options as needed */ }
          </select>
        </label>
        <input
          type="text"
          placeholder="symptom-ID..."
          value={symptoms}
          onChange={(e) => setsymptoms(e.target.value)}
        />
        <input
          type="text"
          placeholder="1990, 2000, ..."
          value={year_of_birth}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/\D/, '');
            setyear_of_birth(numericValue);
          }}
        />
        <input
          type="text"
          placeholder="male, female, ..."
          value={gender}
          onChange={(e) => setgender(e.target.value)}
        />
        <button 
          onClick={handleDiagnosis}
          className="btn btn-primary rounded-pill"
          disabled={loading}
          >
            {loading ? "Loading..." : "Get Diagnosed"} 
        </button>
        <div>
          {diagnosis.map((item, index) => (
            <div key={index}>
              <p>{`Issue ID: ${item.Issue.ID}`}</p>
              <p>{`Issue Name: ${item.Issue.Name}`}</p>
              <p>{`Issue Accuracy: ${item.Issue.Accuracy}`}</p>
              <p>{`Issue ICD: ${item.Issue.Icd}`}</p>
              <p>{`Issue ICD Name: ${item.Issue.IcdName}`}</p>
              <p>{`Issue Professional Name: ${item.Issue.ProfName}`}</p>
              <p>{`Issue Ranking: ${item.Issue.Ranking}`}</p>
        
              {/* Specialisations */}
              {item.Specialisation.map((specialisation) => (
                <div key={specialisation.ID}>
                  <p>{`Specialisation ID: ${specialisation.ID}`}</p>
                  <p>{`Specialisation Name: ${specialisation.Name}`}</p>
                  <p>{`Specialisation Specialist ID: ${specialisation.SpecialistID}`}</p>
                </div>
              ))}
              
              <hr /> {/* Add a horizontal line for better separation */}
            </div>
          ))}
      </div>
      
    </div>
  );
}

export default SymptomDiagnosis;