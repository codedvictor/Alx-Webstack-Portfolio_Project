const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const healthServiceBaseUrl = 'https://healthservice.priaid.ch';

const authToken = "";
// Middleware to check if the user is authenticated

const isAuthenticated = (req, res, next) => {
  if (!authToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // Attach the authorization token to the request object
  req.user = {
    authToken,
  }

  next();
};

// Endpoint to fetch symptoms

app.get('/symptoms', isAuthenticated, async (req, res) => {
  const { language, format, searchTerm } = req.query;

  try {
  
    const allSymptoms = await axios.get(`${healthServiceBaseUrl}/symptoms`, {
      params: {
        token: req.user.authToken,
        language: language || 'en-gb',
        searchTerm,
        format,
      },
    });

    let filteredSymptoms = allSymptoms.data;

    if (searchTerm) {
      filteredSymptoms = filteredSymptoms.filter(symptom =>
        symptom.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    res.json(filteredSymptoms);
  } catch (error) {
    if (error.response) {
    // The request was made and the server responded with a status code
      console.error('Server responded with status code:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
    // The request was made but no response was received
      console.error('No response received from the server');
    } else {
    // Something happened in setting up the request that triggered an Error
      console.error('Error setting up the request:', error.message);
    }
  }
});

// Endpoint to fetch diagnosis
app.get('/diagnosis', isAuthenticated, async (req, res) => {
  const { language, format, symptoms, year_of_birth, gender } = req.query;
  let symId;
  try {
    symId = symptoms ? [symptoms].flat() : [10];
  } catch (error) {
    return res.status(400).json({ error: 'symptoms is not a valid JSON string!' });
  }
  
  try {
    const response = await axios.get(`${healthServiceBaseUrl}/diagnosis`, {
      params: {
        token: req.user.authToken,
        symptoms: JSON.stringify(symId),
        gender: gender || 'male',
        year_of_birth: parseInt(year_of_birth, 10),
        language: language || 'en-gb',
        format,
      },
    });
    
    const filteredDiagnosis = response.data;
    res.json(filteredDiagnosis);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      res.status(400).json({ error: 'Symptoms, gender, or year_of_birth are missing or invalid!' });
    } else if (error.request) {
    // The request was made but no response was received
      console.error('No response received from the server');
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
