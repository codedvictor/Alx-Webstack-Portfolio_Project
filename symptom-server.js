// app-server.js

const express = require('express');
const axios = require('axios');
const CryptoJS = require('crypto-js');

const app = express();
const port = 3001; // Choose any available port

app.get('/', (req, res) => {
  res.send('Welcome to the Nutrilife App Platform');
});

app.get('/getSymptoms', async (req, res) => {
  const uri = "https://authservice.priaid.ch/login";
  const secret_key = "Pa97EzAm3s6GFw8i2";

  const computedHash = CryptoJS.HmacMD5(uri, secret_key);
  const computedHashString = computedHash.toString(CryptoJS.enc.Base64);

  // Include the computed hash in the Authorization header
  const headers = {
    'Authorization': `Bearer${computedHashString}`,
    'Content-Type': 'application/json', // Adjust content type as needed
  };

// Example API request using Axios
//axios.post(uri, null, { headers })
  //.then(response => {
    //console.log('API Response:', response.data);
  //})
  //.catch(error => {
    //console.error('Error making API request:', error);
  //});

  const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR5bmFtaXh2aWN0b3JAZ21haWwuY29tIiwicm9sZSI6IlVzZXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxMDkxNiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjEwOSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiIxMDAiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJCYXNpYyIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGFuZ3VhZ2UiOiJlbi1nYiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvZXhwaXJhdGlvbiI6IjIwOTktMTItMzEiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXBzdGFydCI6IjIwMjQtMDItMTUiLCJpc3MiOiJodHRwczovL2F1dGhzZXJ2aWNlLnByaWFpZC5jaCIsImF1ZCI6Imh0dHBzOi8vaGVhbHRoc2VydmljZS5wcmlhaWQuY2giLCJleHAiOjE3MDg0MzQyMTMsIm5iZiI6MTcwODQyNzAxM30.VFE_JQR49EO04RxQrZMJrm-x1iSJlzrl9RTQdb82Jec";
  const lang = "en-gb";

  //get symptoms
  const symptomUrl = "https://healthservice.priaid.ch/symptoms";
  
  try {
    const response = await axios.get(symptomUrl, {
      params: {
        token: token,
        language: lang,
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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
