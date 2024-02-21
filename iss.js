const request = require('request');

const getIP = 'https://api.ipify.org?format=json';
const fetchMyIP = (callbackIP) => {
  request(getIP, function(error, response, body) {
    if (error) {
      callbackIP(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const errorMsg = "Invalid HTTP response";
      callbackIP(Error(errorMsg), null);
      return;
    }
    const data = JSON.parse(body);
    callbackIP(null, data.ip);
    return;
  });
};

module.exports = { fetchMyIP };