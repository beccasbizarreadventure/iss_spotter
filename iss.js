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



const fetchCoordsByIP = (ip, callbackGeo) => {
  let coordSet = {};
  const coords = `http://ipwho.is/${ip}`;
  request(coords, function(error, response, body) {
    if (error) {
      callbackGeo(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const errorMsg = "Invalid HTTP response";
      callbackGeo(Error(errorMsg), null);
      return;
    }
    const data = JSON.parse(body);
    if (data["message"] === "Invalid IP address") {
      callbackGeo(Error(`${ip} is an invalid IP address`), null);
      return;
    }
    coordSet.latitude = data.latitude;
    coordSet.longitude = data.longitude;
    callbackGeo(null, coordSet);
    return;
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };