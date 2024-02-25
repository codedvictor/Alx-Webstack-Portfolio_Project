const axios = require('axios');
const crypto = require('crypto');

async function getAuthToken(apiUsername, apiPassword, authServiceUrl) {
  const hashedCredentials = generateHMACMD5(apiPassword, authServiceUrl);

  try {
    const response = await axios.post(authServiceUrl, null, {
      headers: {
        Authorization: `Bearer ${apiUsername}:${hashedCredentials}`,
      },
    });

    return response.data.Token;
  } catch (error) {
    throw new Error(`Authentication failed: ${error.response ? error.response.data : error.message}`);
  }
}

function generateHMACMD5(secretKey, data) {
  const hmac = crypto.createHmac('md5', secretKey);
  hmac.update(data);
  return hmac.digest('base64');
}

module.exports = { getAuthToken };