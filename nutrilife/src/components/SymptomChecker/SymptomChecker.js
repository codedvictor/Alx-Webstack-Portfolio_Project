import React, { useState } from "react";
import axios from "axios";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSymptomChange = (event) => {
    setSymptoms(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("YOUR_API_ENDPOINT", {
        symptoms: symptoms,
      });
      setDiseases(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Health App - Symptom Checker</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block mb-2">Enter Symptoms:</label>
        <input
          type="text"
          value={symptoms}
          onChange={handleSymptomChange}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
          placeholder="e.g., fever, headache, cough"
          required
        />
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Loading..." : "Check Symptoms"}
        </button>
      </form>
      {diseases.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Suspected Diseases:</h2>
          <ul className="list-disc list-inside">
            {diseases.map((disease, index) => (
              <li key={index}>{disease}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;
