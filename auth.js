const CryptoJS = require('crypto-js');

const uri = "https://authservice.priaid.ch/login";
const secret_key = "Pa97EzAm3s6GFw8i2";

const computedHash = CryptoJS.HmacMD5(uri, secret_key);
const computedHashString = computedHash.toString(CryptoJS.enc.Base64);

console.log("HMAC-MD5 hash: ", computedHashString);

