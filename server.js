// server.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getAuthToken } = require('./auth'); // Adjust the path accordingly

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const healthServiceBaseUrl = 'https://sandbox-healthservice.priaid.ch';
const authServiceUrl = 'https://sandbox-authservice.priaid.ch/login';
const language = 'en-gb';

let authToken = '';

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (!authToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Middleware to include the authentication token in requests
app.use(async (req, res, next) => {
  try {
    if (!authToken) {
      authToken = await getAuthToken('dynamixvictor@gmail.com', 'q2Y9WgFp7r4K3Hdy8', authServiceUrl);
    }

    req.headers.authorization = `Bearer ${authToken}`;
    next();
  } catch (error) {
    console.error(`Authentication error:\n${error.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Endpoint to fetch symptoms
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR5bmFtaXh2aWN0b3JAZ21haWwuY29tIiwicm9sZSI6IlVzZXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxMzUzOCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyNC0wMi0xNSIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNzA4NzIzODA2LCJuYmYiOjE3MDg3MTY2MDZ9.ygvl9F6sRM7tzw9WMiAKVOK7lEAFaG4AYWy3ATPoL_w";

app.get('/symptoms', isAuthenticated, async (req, res) => {
  const { language, format } = req.query;

  try {
    const response = await axios.get(`${healthServiceBaseUrl}/symptoms`, {
      params: {
        token: token,
        language: language || 'en-gb',
        format,
      },
    });
  
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      res.status(400).json({ error: 'Symptoms are in an invalid format!' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// Endpoint to fetch issues
app.get('/issues', isAuthenticated, async (req, res) => {
  const { language, format } = req.query;

  try {
    const response = await axios.get(`${healthServiceBaseUrl}/issues`, {
      params: {
        token: token,
        language: language || 'en-gb',
        format,
      },
    });

    res.json(response.data);
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
const symptomsArray = [10];
const age = 1990;
const sex = "male";
app.get('/diagnosis', isAuthenticated, async (req, res) => {
  const { language, format } = req.query;
  try {
    const response = await axios.get(`${healthServiceBaseUrl}/diagnosis`, {
      params: {
        token: token,
        symptoms: JSON.stringify(symptomsArray),
        gender: sex,
        year_of_birth: age,
        language: language || 'en-gb',
        format,
      },
    });

    res.json(response.data);
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

// Endpoint to fetch all body locations
app.get('/body/locations', isAuthenticated, async (req, res) => {
  const { language, format } = req.query;

  try {
    const response = await axios.get(`${healthServiceBaseUrl}/body/locations`, {
      params: {
        token: token,
        language: language || 'en-gb',
        format,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch body sublocations for a given body location
const locationId = 16;
app.get('/body/locations/:locationId', isAuthenticated, async (req, res) => {
  const { language, format } = req.query;
  // const { locationId } = req.params;

  try {
    const response = await axios.get(`${healthServiceBaseUrl}/body/locations/${locationId}`, {
      params: {
        token: token,
        location_id: locationId,
        language: language || 'en-gb',
        format,
      },
    });

    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 204) {
      res.status(204).json({ error: 'No content found' });
    } else if (error.request) {
    // The request was made but no response was received
      console.error('No response received from the server');
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// Endpoint to fetch symptoms in a body sublocation
const selectorStatus = "man";
app.get('/symptoms/:locationId/:selectorStatus', isAuthenticated, async (req, res) => {
  const { language, format } = req.query;
  // const { locationId, selectorStatus } = req.params;

  try {
    const response = await axios.get(`${healthServiceBaseUrl}/symptoms/${locationId}/${selectorStatus}`, {
      params: {
        token: token,
        locationId: locationId,
        selectorStatus: selectorStatus,
        language: language || 'en-gb',
        format,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch information about a health issue
const issueId = 113;
app.get('/issues/:issueId/info', isAuthenticated, async (req, res) => {
  const { language, format } = req.query;
  // const { issueId } = req.params;

  try {
    const response = await axios.get(`${healthServiceBaseUrl}/issues/${issueId}/info`, {
      params: {
        issue_id: issueId,
        token: token,
        language: language || 'en-gb',
        format,
      },
    });

    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'Issue not found' });
    } else if (error.request) {
    // The request was made but no response was received
      console.error('No response received from the server');
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// Endpoint to get proposed symptoms based on selected symptoms
app.get('/symptoms/proposed', isAuthenticated, async (req, res) => {
  const { language, format } = req.query;

  try {
    const response = await axios.get(`${healthServiceBaseUrl}/symptoms/proposed`, {
      params: {
        token: token,
        symptoms: JSON.stringify(symptomsArray),
        gender: sex,
        year_of_birth: age,
        language: language || 'en-gb',
        format,
      },
    });

    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      res.status(400).json({ error: 'Invalid request parameters' });
    } else if (error.request) {
    // The request was made but no response was received
      console.error('No response received from the server');
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// Endpoint to get red flag text based on selected symptom
const symptom_Id = 44;
app.get('/redflag', isAuthenticated, async (req, res) => {
  const { language, format } = req.query;

  try {
    const response = await axios.get(`${healthServiceBaseUrl}/redflag`, {
      params: {
        token: token,
        symptomId: symptom_Id,
        language: language || 'en-gb',
        format,
      },
    });

    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      res.status(400).json({ error: 'Invalid request parameters' });
    } else if (error.request) {
    // The request was made but no response was received
      console.error('No response received from the server');
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// Endpoint to get list of specialisations for calculated diseases
app.get('/diagnosis/specialisations', isAuthenticated, async (req, res) => {
  const { language, format } = req.query;

  try {
    const response = await axios.get(`${healthServiceBaseUrl}/diagnosis/specialisations`, {
      params: {
        token: token,
        symptoms: JSON.stringify(symptomsArray),
        gender: sex,
        year_of_birth: age,
        language: language || "en-gb",
        format,
      },
    });

    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      res.status(400).json({ error: 'Invalid request parameters' });
    } else if (error.request) {
    // The request was made but no response was received
      console.error('No response received from the server');
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// Endpoint to get all specialisations
app.get('/specialisations', isAuthenticated, async (req, res) => {
  const { language, format } = req.query;

  try {
    const response = await axios.get(`${healthServiceBaseUrl}/specialisations`, {
      params: {
        token: token,
        language: language || "en-gb",
        format,
      },
    });

    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      res.status(400).json({ error: 'Invalid request parameters' });
    } else if (error.request) {
    // The request was made but no response was received
      console.error('No response received from the server');
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// // Your other routes go here...
// // app.post('/login', async (req, res) => {
// //   try {
// //     authToken = await getAuthToken(apiUsername, apiPassword, authServiceUrl);
// //     res.json({ success: true });
// //   } catch (error) {
// //     res.status(401).json({ error: error.message });
// //   }
// // });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
