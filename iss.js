const request = require('request');


const fetchMyIP = (callbackIP) => {
  const getIP = 'https://api.ipify.org?format=json';
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

const fetchISSFlyOverTimes = (coords, callbackFly) => {
  const lat = coords.latitude;
  const long = coords.longitude;
  const locationToCheck = `https://iss-flyover.herokuapp.com/json/?lat=${lat}&lon=${long}`;
  request(locationToCheck, function(error, response, body) {
    if (error) {
      callbackFly(error, null);
      return;
    }
    const data = JSON.parse(body);
    callbackFly(null, data.response);
    return;
  });
};

// waterfall of call backs feeding the relevant data returned by one to the other as a parameter:

const nextISSTimesForMyLocation = function(callbackNextTime) {
  fetchMyIP((error, IP) => {
    if (error) {
      callbackNextTime(error, null);
      return;
    }
    fetchCoordsByIP(IP, (error, coords) => {
      if (error) {
        callbackNextTime(error, null);
        return;
      }
      fetchISSFlyOverTimes(coords, (error, passTimes) => {
        if (error) {
          callbackNextTime(error, null);
          return;
        }
        callbackNextTime(null, passTimes);
        return;
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };
// modules.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };