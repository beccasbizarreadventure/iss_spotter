const request = require('request-promise-native');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function (body) {
  const IP = JSON.parse(body).ip;
  return request(`http://ipwho.is/${IP}`);
};

const fetchISSFlyOverTimes = function (body) {
  const lat = JSON.parse(body).latitude;
  const long = JSON.parse(body).longitude;
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${lat}&lon=${long}`);
};

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
  //returns IP from fecthMyIP 
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { response } = JSON.parse(data);
    return response;
  })
}
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };