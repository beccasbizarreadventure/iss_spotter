// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

const {nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});

//fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
//});


//fetchCoordsByIP('8.8.4.4', (error, data) => {
// console.log("Error: ", error);
// console.log("Data: ", data);
//});

// fetchISSFlyOverTimes({ latitude: 37.3860517, longitude: -122.0838511 }, (error, data) => {
//   console.log("Error: ", error);
//   console.log("Data: ", data);
// });